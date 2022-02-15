import { expect, fixture, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import { InputField } from '../src/components/input-field.js';
import '../src/views/home-view.js';
import { HomeView } from '../src/views/home-view.js';

describe('Home View', () => {
  let el: HomeView;

  beforeEach(async () => {
    el = await fixture(html`<home-view></home-view>`);
  });

  it('2 buttons rendered', () => {
    const btns = el.renderRoot.querySelectorAll('button');
    expect(btns).to.be.have.length(2);
  });

  it('h3 tag has text', () => {
    const h3: HTMLHeadingElement = el.renderRoot.querySelector('#label-create-player');
    expect(h3.textContent).to.be.equal('Create a new Player');
  });

  describe('Input validations', () => {
    let input: InputField;

    beforeEach(() => {
      input = el.inputField;
    });

    it('Word "sushi" is not invalid', () => {
      input.value = 'sushi';
      expect(input.invalid).to.false;
    });

    it('Word "$u$hi" is invalid', () => {
      input.value = '$u$hi';
      expect(input.invalid).to.true;
    });

    it('enterPress Event emmits the current value', async () => {
      setTimeout(() => {
        input.value = 'banana';
        input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
      });

      const { detail } = await oneEvent(input, 'enterPress');

      expect(detail).to.be.equal('banana');
    });
  });
});
