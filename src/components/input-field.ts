import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('input-field')
export class InputField extends LitElement {
  static styles = css`
    .container {
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
      background: black;
    }

    input {
      font-size: 1rem;
      outline: none;
      border: 1px solid gray;
      border-radius: 5px;
      padding: 1rem 0.7rem;
      color: gray;
      transition: 0.1s ease-out;
      background: black;
    }

    input:focus {
      border-color: #6200ee;
    }

    .invalid input:focus {
      border-color: #d50000;
    }

    input:focus + label {
      color: #6200ee;
      top: 0;
      transform: translateY(-50%) scale(0.9);
    }

    .invalid input:focus + label {
      color: #d50000;
    }

    input:not(:placeholder-shown) + label {
      top: 0;
      transform: translateY(-50%) scale(0.9);
    }
  `;

  @property() label = '';
  @property() pattern!: RegExp;
  @state() invalid = false;
  @query('input') input!: HTMLInputElement;

  onkeyup = (e: KeyboardEvent) => {
    this.invalid = this.pattern && !this.pattern.test(this.value);

    if (e.key === 'Enter') {
      this.dispatchEvent(new CustomEvent('enterPress', { detail: this.value }));
    }
  };

  set value(value) {
    this.input.value = value;
    this.invalid = this.pattern && !this.pattern.test(this.value);
  }

  get value() {
    return this.input.value;
  }

  render() {
    const classes = { container: true, invalid: this.invalid };

    return html`
      <div class=${classMap(classes)}>
        <input placeholder=" " type="text" />
        <label>${this.label}</label>
      </div>
    `;
  }
}
