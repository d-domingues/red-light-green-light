import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DirectiveResult } from 'lit/directive.js';
import { styleMap } from 'lit/directives/style-map.js';

import { useAsyncTemplates } from '../directives/async-template.factory.js';
import { toastUiStyles } from './toast-ui.styles.js';

const tmplFactory = (text: string, type: 'S' | 'E' | 'I' | 'W' = 'S', duration = 3000) => {
  const onAnimatEnd = (event: AnimationEvent) => {
    if (event.animationName === 'fade-out') {
      (event.target as HTMLOutputElement).remove();
    }
  };

  let background = 'darkslategray';
  if (type === 'S') background = '#4e7646';
  else if (type === 'E') background = '#a70a0a';
  else if (type === 'W') background = '#c3f31f';
  else if (type === 'I') background = '#661eff';

  const styles: any = { background, '--duration': duration, color: type !== 'W' ? 'white' : 'black' };

  return html`<output style=${styleMap(styles)} @animationend=${onAnimatEnd}>${text}</output>`;
};

@customElement('toast-ui')
export class ToastUi extends LitElement {
  static styles = toastUiStyles;

  asyncTemplates: DirectiveResult;
  nextTemplate: Function;

  constructor() {
    super();
    [this.asyncTemplates, this.nextTemplate] = useAsyncTemplates(tmplFactory);
  }

  render() {
    return this.asyncTemplates;
  }

  // static function that instanciates and memoizes a ToastUi component at the DOM
  static present = (() => {
    let cachedToastUi: ToastUi;

    return (text: string, type: 'S' | 'E' | 'I' | 'W' = 'S', duration = 3000): Promise<ToastUi> =>
      new Promise((res) => {
        if (!cachedToastUi) {
          cachedToastUi = document.createElement('toast-ui');
          cachedToastUi.firstUpdated = () => res(ToastUi.present(text, type, duration));
          document.firstElementChild?.insertBefore(cachedToastUi, document.body);
        } else {
          cachedToastUi.nextTemplate(text, type, duration);
          res(cachedToastUi);
        }
      });
  })();
}

declare global {
  interface HTMLElementTagNameMap {
    'toast-ui': ToastUi;
  }
}
