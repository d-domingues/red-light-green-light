import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

export type Foot = null | 'L' | 'R';

@customElement('step-buttons')
export class StepButtons extends LitElement {
  static styles = css`
    .foot {
      margin: 10px;
      width: 20vw;
      max-width: 120px;
    }
  `;

  private previewsFoot: Foot = null;

  onStep(foot: Foot) {
    const detail = foot !== this.previewsFoot ? 'forward' : 'backward';
    this.previewsFoot = foot;
    this.dispatchEvent(new CustomEvent('step', { detail }));
  }

  render() {
    return html`
      <img class="foot" src="left-foot.svg" @click=${() => this.onStep('L')} />
      <img class="foot" src="right-foot.svg" @click=${() => this.onStep('R')} />
    `;
  }
}
