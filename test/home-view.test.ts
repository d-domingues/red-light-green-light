import { elementUpdated, expect, fixture, oneEvent } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { html } from 'lit';
import { stub } from 'sinon';
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

  describe('Join Button action', () => {
    let joinBtn: HTMLButtonElement;

    beforeEach(async () => {
      joinBtn = el.shadowRoot.querySelector('#join-btn');
    });

    it('calls onJoin when a button is clicked', async () => {
      const onJoin = stub(el, 'onJoin');

      el.requestUpdate();
      await elementUpdated(el);

      const { x, y } = joinBtn.getBoundingClientRect();
      await sendMouse({ type: 'click', position: [Math.floor(x + 1), Math.floor(y + 1)] });

      expect(onJoin).to.have.been.calledOnce;
    });
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

    it('emmits the current value on Enter keyup', async () => {
      setTimeout(() => {
        input.value = 'borscht';
        input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
      });

      const { detail } = await oneEvent(input, 'enterPress');

      expect(detail).to.be.equal('borscht');
    });

    it('calls onJoin on Enter keyup', async () => {
      const onJoin = stub(el, 'onJoin');

      el.requestUpdate();
      await elementUpdated(el);
      input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

      expect(onJoin).to.have.been.calledOnce;
    });

    it('natively types into an input', async () => {
      const keys = 'abc123';

      input.focus();

      await sendKeys({
        type: keys,
      });

      expect(input.value).to.equal(keys);
    });
  });
});
