import { Router } from '@vaadin/router';
import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '../components/input-field.js';
import { InputField } from '../components/input-field.js';
import { ToastUi } from './../components/toast-ui';
import { homeViewStyles } from './home-view.styles.js';

@customElement('home-view')
export class HomeView extends LitElement {
  static styles = homeViewStyles;

  @query('input-field') inputField!: InputField;

  pattern = /^[A-Ña-ñ0-9]{0,10}$/;

  onJoin() {
    if (this.inputField.invalid) {
      ToastUi.present('Inser a valid player name', 'W');
      return;
    }

    // redirect to game view
    const name = this.inputField.value;
    Router.go(`game/${name}`);
  }

  render() {
    return html`
      <h3 id="label-create-player">Create a new Player</h3>
      <input-field label="Name" .pattern=${this.pattern} @enterPress=${this.onJoin}></input-field>
      <button id="join-btn" @click=${this.onJoin}>JOIN</button>
      <button id="ranking-btn" @click=${() => Router.go('ranking')}>Ranking</button>
    `;
  }
}
