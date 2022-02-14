import { Router } from '@vaadin/router';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { homeViewStyles } from './home-view.styles.js';

@customElement('home-view')
export class HomeView extends LitElement {
  static styles = homeViewStyles;

  @property() router!: Router;

  onSubmitPlayer() {
    // name validations
    // redirect to game view

    Router.go('game');
  }

  render() {
    return html`
      <h3 id="label-create-player">Create a new Player</h3>
      <input id="player-name" />
      <button @click=${this.onSubmitPlayer}>JOIN</button>
    `;
  }
}
