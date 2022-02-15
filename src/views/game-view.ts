import { Router } from '@vaadin/router';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { fromEvent, pluck, tap } from 'rxjs';
import '../components/glowing-light.js';
import '../components/step-buttons.js';
import { fetchSessionPlayer, submitPlayer } from '../storage.js';
import { ToastUi } from './../components/toast-ui';
import { Player } from './../models/player';
import { gameViewStyles } from './game-view.styles.js';

@customElement('game-view')
export class GameView extends LitElement {
  static styles = gameViewStyles;

  @state() private color: 'red' | 'green' = 'red';

  private toId!: NodeJS.Timeout;
  private player!: Player;

  constructor() {
    super();
    fetchSessionPlayer().then(
      (p) => {
        this.player = p;
        this.start();
      },
      () => {
        ToastUi.present('No player has joined', 'E');
        Router.go('home');
      }
    );
  }

  start() {
    this.color = 'green';
    const timer = Math.max(10000 - this.player.score * 100, 2000) + Math.floor(Math.random() * 3001 - 1500);
    this.toId = setTimeout(() => {
      this.color = 'red';
      setTimeout(() => this.start(), 3000);
    }, timer);
  }

  // avoids useless code to run
  disconnectedCallback() {
    clearTimeout(this.toId);
  }

  init(el?: Element) {
    if (!el) {
      return;
    }

    fromEvent(el, 'step')
      .pipe(
        pluck('detail'),
        tap((step) => {
          if (this.color === 'red') {
            this.player.score = 0;
            ToastUi.present('Your score has been reseted ☠️', 'I');
            return;
          }

          if (step === 'forward') {
            this.player.score++;

            if (this.player.score > this.player.topScore) {
              this.player.topScore = this.player.score;
            }

            return;
          }

          if (this.player.score > 0) {
            this.player.score--;
          }
        }),
        tap(() => {
          submitPlayer(this.player);
          this.requestUpdate();
        })
      )
      // no need to unsubscribe to a stream that is ONLY triggered by user interactions
      .subscribe();
  }

  render() {
    const { name, topScore, score } = this.player;

    return html`
      <header>
        <span id="player-welcome"> Hi ${name} </span>
        <img id="exit-btn" src="exit.svg" @click=${() => Router.go('home')} />
      </header>
      <main>
        <h3>High Score: ${topScore}</h3>
        <glowing-light color=${this.color}></glowing-light>
        <h3>Score: ${score}</h3>
        <step-buttons ${ref(this.init)}></step-buttons>
      </main>
    `;
  }
}
