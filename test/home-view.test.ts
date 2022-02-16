import { expect, fixture, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { InputField } from '../src/components/input-field.js';
import '../src/views/home-view.js';
import { HomeView } from '../src/views/home-view.js';

describe('Home View', () => {
  let el: HomeView;

  beforeEach(async () => {
    el = await fixture(html`<home-view></home-view>`);
  });

  it('should have 2 buttons rendered', () => {
    const btns = el.renderRoot.querySelectorAll('button');
    expect(btns).to.be.have.length(2);
  });

  it('should have h3 tag text "Create a new Player"', () => {
    const h3: HTMLHeadingElement = el.renderRoot.querySelector('#label-create-player');
    expect(h3.textContent).to.be.equal('Create a new Player');
  });

  describe('Input validations', () => {
    let input: InputField;

    beforeEach(() => {
      input = el.inputField;
    });

    it('should "sushi" not be invalid', () => {
      input.value = 'sushi';
      expect(input.invalid).to.false;
    });

    it('should "$u$hi" be invalid', () => {
      input.value = '$u$hi';
      expect(input.invalid).to.true;
    });

    it('enterPress Event emmits the current value', async () => {
      setTimeout(() => {
        input.value = 'borscht';
        input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
      });

      const { detail } = await oneEvent(input, 'enterPress');

      expect(detail).to.be.equal('borscht');
    });

    it('should Read and Wright sessionStorage', async () => {
      input.value = 'samosa';
      el.onJoin();
      const item = sessionStorage.getItem('MAKE_IT_DELICIOUS');

      const onJoin = sinon.spy(el, 'onJoin');
      expect(item).to.be.be.equal('Delicious samosa');
      expect(onJoin).to.have.been.called;
    });
  });
});
