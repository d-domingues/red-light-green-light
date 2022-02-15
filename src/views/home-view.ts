import { Router } from '@vaadin/router';
import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '../components/input-field.js';
import { InputField } from '../components/input-field.js';
import { setSessionPlayerName } from '../storage.js';
import { ToastUi } from './../components/toast-ui';
import { homeViewStyles } from './home-view.styles.js';

@customElement('home-view')
export class HomeView extends LitElement {
  static styles = homeViewStyles;

  @property() router!: Router;
  @query('input-field') inputField!: InputField;

  onSubmitPlayer() {
    // name validations
    const name = this.inputField.value;
    const isValid = /^[A-Ña-ñ0-9]+$/.test(name);

    if (!isValid) {
      ToastUi.present('Inser a valid player name', 'W');
      return;
    }

    // redirect to game view
    setSessionPlayerName(name);
    Router.go('game');
  }

  render() {
    return html`
      <h3 id="label-create-player">Create a new Player</h3>
      <input-field label="Name" @enterPress=${this.onSubmitPlayer}></input-field>
      <button id="join-btn" @click=${this.onSubmitPlayer}>JOIN</button>
    `;
  }
}
