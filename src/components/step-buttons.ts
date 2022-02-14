import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { glowingLightStyles } from './glowing-light.styles.js';

export type Foot = null | 'L' | 'R';

@customElement('step-buttons')
export class StepButtons extends LitElement {
  static styles = glowingLightStyles;

  private previewsFoot: Foot = null;

  onStep(foot: Foot) {
    const detail = foot !== this.previewsFoot ? 'forward' : 'backward';
    this.previewsFoot = foot;

    this.dispatchEvent(new CustomEvent('step', { detail }));
  }

  render() {
    return html`
      <button @click=${() => this.onStep('L')}>Left</button>
      <button @click=${() => this.onStep('R')}>Right</button>
    `;
  }
}
