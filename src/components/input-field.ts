import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('input-field')
export class InputField extends LitElement {
  static styles = css`
    .material-textfield {
      position: relative;
    }

    label {
      position: absolute;
      font-size: 1rem;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: white;
      color: gray;
      padding: 0 0.3rem;
      margin: 0 0.5rem;
      transition: 0.1s ease-out;
      transform-origin: left top;
      pointer-events: none;
    }
    input {
      font-size: 1rem;
      outline: none;
      border: 1px solid gray;
      border-radius: 5px;
      padding: 1rem 0.7rem;
      color: gray;
      transition: 0.1s ease-out;
    }
    input:focus {
      border-color: #6200ee;
    }
    input:focus + label {
      color: #6200ee;
      top: 0;
      transform: translateY(-50%) scale(0.9);
    }
    input:not(:placeholder-shown) + label {
      top: 0;
      transform: translateY(-50%) scale(0.9);
    }
  `;

  @property() label = '';
  @query('input') input!: HTMLInputElement;

  onkeyup = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.dispatchEvent(new Event('enterPress'));
    }
  };

  set value(value) {
    this.input.value = value;
  }

  get value() {
    return this.input.value;
  }

  render() {
    return html`
      <div class="material-textfield">
        <input placeholder=" " type="text" />
        <label>${this.label}</label>
      </div>
    `;
  }
}
