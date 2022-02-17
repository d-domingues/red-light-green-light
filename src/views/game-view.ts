import '../components/glowing-light.js';
import '../components/step-buttons.js';
import '../components/toolbar-header.js';

import { PreventAndRedirectCommands, Router, RouterLocation } from '@vaadin/router';
import { Howl } from 'howler';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { BehaviorSubject, fromEvent, pluck, scan, Subscription, tap, withLatestFrom } from 'rxjs';

import { fetchSessionPlayer, submitPlayer } from '../storage.js';
import { ToastUi } from './../components/toast-ui';
import { Player } from './../models/player';
import { gameViewStyles } from './game-view.styles.js';

@customElement('game-view')
export class GameView extends LitElement {
  static styles = gameViewStyles;

  player!: Player;
  audio = new Howl({ rate: 0.9, src: ['red-light-green-light-song.mp3'], loop: true });
  toId!: NodeJS.Timeout;

  lightSubject = new BehaviorSubject<'red' | 'green'>('red');
  subscription!: Subscription;

  async onBeforeEnter(loc: RouterLocation, cmds: PreventAndRedirectCommands) {
    try {
      loc;
      this.player = await fetchSessionPlayer();
      this.setLight('green');
    } catch (error) {
      ToastUi.present('No player has joined', 'E');
      return cmds.prevent();
    }

    return true;
  }

  // avoids useless code to run
  disconnectedCallback() {
    this.audio.stop();
    clearTimeout(this.toId);
    this.subscription?.unsubscribe();
  }

  init(el?: Element) {
    if (!el) {
      ToastUi.present('Unexpected error', 'E');
      Router.go('home');
      return;
    }

    const step$ = fromEvent<CustomEvent>(el, 'step').pipe(pluck('detail'));

    const light$ = this.lightSubject.pipe(
      tap((light) => {
        this.audio[light === 'green' ? 'play' : 'stop']();
        this.requestUpdate();
      })
    );

    this.subscription = step$
      .pipe(
        withLatestFrom(light$),
        scan((player, [step, color]) => {
          if (color === 'red') {
            player.score = 0;
            ToastUi.present('Your score has been reseted ☠️', 'I');
            return player;
          }

          if (step === 'forward') {
            player.score++;

            if (player.score > player.topScore) {
              player.topScore = player.score;
            }

            return player;
          }

          if (player.score > 0) {
            player.score--;
          }

          return player;
        }, this.player)
      )
      .subscribe((player) => {
        this.player = player;
        submitPlayer(this.player);
        this.requestUpdate();
      });
  }

  setLight(color: 'red' | 'green') {
    this.lightSubject.next(color);

    if (color === 'red') {
      this.toId = setTimeout(() => this.setLight('green'), 3000);
    } else {
      const timer = Math.max(10000 - this.player.score * 100, 2000) + Math.floor(Math.random() * 3001 - 1500);
      this.toId = setTimeout(() => this.setLight('red'), timer);
    }
  }

  render() {
    const { name, topScore, score } = this.player;

    return html`
      <toolbar-header text=${'Hi ' + name}></toolbar-header>
      <main>
        <h3>High Score: ${topScore}</h3>
        <glowing-light color=${this.lightSubject.value}></glowing-light>
        <h3>Score: ${score}</h3>
        <step-buttons ${ref(this.init)}></step-buttons>
      </main>
    `;
  }
}
