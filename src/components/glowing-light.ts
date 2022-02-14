import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { glowingLightStyles } from './glowing-light.styles.js';

@customElement('glowing-light')
export class GlowingLight extends LitElement {
  static styles = glowingLightStyles;

  @property({ type: Boolean }) active = false;

  render() {
    return html`<div id="light" class=${this.active ? 'active' : ''}></div>`;
  }
}
