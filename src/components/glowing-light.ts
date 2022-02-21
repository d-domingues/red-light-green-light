import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { glowingLightStyles } from './glowing-light.styles.js';

@customElement('glowing-light')
export class GlowingLight extends LitElement {
  static styles = glowingLightStyles;

  @property() color: 'red' | 'green' = 'red';

  render() {
    return html`<div id="light" class=${this.color}></div>`;
  }
}
