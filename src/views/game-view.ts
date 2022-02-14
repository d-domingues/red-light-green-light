import '../components/glowing-light.js';
import '../components/step-buttons.js';

import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('game-view')
export class GameView extends LitElement {
  static styles = css`
    :host {
      color: white;
    }
  `;

  @state() private active = false;
  @state() private score = 0;

  private to: NodeJS.Timeout | null = null;

  constructor() {
    super();
    this.start();
  }

  start() {
    this.active = true;
    const timer = Math.max(10000 - this.score * 100, 2000) + Math.floor(Math.random() * 3001 - 1500);
    this.to = setTimeout(() => {
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
    this.to && clearTimeout(this.to);
  }

  render() {
    return html`
      <h3>High Score</h3>
      <glowing-light ?active=${this.active}></glowing-light>
      <h3>Score: ${this.score}</h3>
      <step-buttons @step=${this.onStep}></step-buttons>
    `;
  }
}
