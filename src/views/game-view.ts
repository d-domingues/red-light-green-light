import '../components/glowing-light.js';
import '../components/step-buttons.js';

import { Router } from '@vaadin/router';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { fetchSessionPlayer } from '../storage.js';
import { ToastUi } from './../components/toast-ui';
import { Player } from './../models/player';
import { gameViewStyles } from './game-view.styles.js';

@customElement('game-view')
export class GameView extends LitElement {
  static styles = gameViewStyles;

  @state() private active = false;
  @state() private score = 0;

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
    this.active = true;
    const timer = Math.max(10000 - this.score * 100, 2000) + Math.floor(Math.random() * 3001 - 1500);
    this.toId = setTimeout(() => {
      this.active = false;
      setTimeout(() => this.start(), 3000);
    }, timer);
  }

  onStep({ detail }: { detail: 'forward' | 'backward' }) {
    if (!this.active) {
      this.score = 0;
      return;
    }

    if (detail === 'forward') {
      this.score++;
      return;
    }

    if (this.score > 0) {
      this.score--;
    }
  }

  // avoids useless code to run
  disconnectedCallback() {
    clearTimeout(this.toId);
  }

  render() {
    const { name, score } = this.player;

    return html`
      <header>
        <span> Hello Player: ${name} </span>
        <img id="exit-btn" src="exit.svg" @click=${() => Router.go('home')} />
      </header>
      <main>
        <h3>High Score: ${score}</h3>

        <glowing-light ?active=${this.active}></glowing-light>
        <h3>Score: ${this.score}</h3>
        <step-buttons @step=${this.onStep}></step-buttons>
      </main>
    `;
  }
}
