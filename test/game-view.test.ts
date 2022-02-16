import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import '../src/views/game-view.js';
import { GameView } from '../src/views/game-view.js';

describe('Game View', () => {
  let el: GameView;

  beforeEach(async () => {
    el = await fixture(html`<game-view></game-view>`);
  });

  it('2 buttons rendered', () => {
    const btns = el.renderRoot.querySelectorAll('button');
    expect(btns).to.be.have.length(2);
  });

  it('h3 tag has text', () => {
    const h3: HTMLHeadingElement = el.renderRoot.querySelector('#label-create-player');
    expect(h3.textContent).to.be.equal('Create a new Player');
  });

  describe('Input validations', () => {});
});
