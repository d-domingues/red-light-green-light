import { expect, fixture } from '@open-wc/testing';
import { Router } from '@vaadin/router';
import { html } from 'lit';
import '../src/views/game-view.js';
import { GameView } from '../src/views/game-view.js';

describe('Game View', () => {
  let el: GameView;

  beforeEach(async () => {
    const outlet = await fixture(html`<div></div>`);
    const router = new Router(outlet);
    await router.setRoutes([{ path: '/', component: 'game-view' }]);
    await router.ready;
    el = outlet.querySelector('game-view');
  });

  it('should be rendered', () => {
    expect(el.tagName).to.match(/game-view/i);
    expect(el.renderRoot.children).to.have.lengthOf(2);
  });

  it('should fetch correct player data', () => {
    // player data: { name: 'Mr. Foo Bar', topScore: 100, score: 10 }

    expect(el.player.name).to.be.equal('Mr. Foo Bar');
    expect(el.player.score).to.be.equal(10);
    expect(el.player.topScore).to.be.equal(100);
  });
});
