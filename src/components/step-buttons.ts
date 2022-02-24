import { css, html, LitElement } from 'lit';
import { customElement, queryAll } from 'lit/decorators.js';
import { ToastUi } from './toast-ui';

export type Foot = null | 'L' | 'R';

@customElement('step-buttons')
export class StepButtons extends LitElement {
  static styles = css`
    .foot {
      margin: 14px;
      width: 20vw;
      max-width: 80px;
    }

    .foot:focus {
      transform: scale(0.95);
    }
  `;

  @queryAll('.foot') feet!: NodeListOf<HTMLImageElement>;

  private previewsFoot: Foot = null;

  constructor() {
    super();

    // A hacky way of guessing if the platform is a laptop assuming that the standard laptop has a landscape
    // orientation and a min width of 900px and min height of 700px, to allow the usage of keyboard to play
    if (window.innerWidth > window.innerHeight && window.innerWidth >= 900 && window.innerHeight >= 700) {
      window.addEventListener('keyup', this.arrowAction);
      ToastUi.present('User keyboard arrows ⬅️ & ➡️', 'I');
    }
  }

  disconnectedCallback() {
    window.removeEventListener('keyup', this.arrowAction);
  }

  arrowAction = ({ key }: { key: string }) => {
    if (key === 'ArrowLeft') this.onStep('L');
    if (key === 'ArrowRight') this.onStep('R');
  };

  onStep(foot: Foot) {
    const detail = foot !== this.previewsFoot ? 'forward' : 'backward';
    this.previewsFoot = foot;
    this.dispatchEvent(new CustomEvent('step', { detail }));
    this.feet.item(foot === 'L' ? 0 : 1).focus();
  }

  render() {
    return html`
      <img class="foot" tabindex="0" src="/left-foot.svg" @click=${() => this.onStep('L')} />
      <img class="foot" tabindex="1" src="/right-foot.svg" @click=${() => this.onStep('R')} />
    `;
  }
}
