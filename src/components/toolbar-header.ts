import { Router } from '@vaadin/router';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('toolbar-header')
export class ToolbarHeader extends LitElement {
  static styles = css`
    header {
      height: 46px;
      background: #242424;
    }

    #player-welcome {
      font-size: 22px;
      line-height: 46px;
      margin: 20px;
    }

    #exit-btn {
      height: 26px;
      float: right;
      padding: 6px;
      margin: 4px 12px;
    }
  `;

  @property() text = '';

  render() {
    return html`
      <header>
        <span id="player-welcome"> ${this.text} </span>
        <img id="exit-btn" src="/exit.svg" @click=${() => Router.go('home')} />
      </header>
    `;
  }
}
