import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import '../src/components/glowing-light.js';
import { GlowingLight } from './../src/components/glowing-light';

describe('Glowing Light', () => {
  let el: GlowingLight;

  beforeEach(async () => {
    el = await fixture(html`<glowing-light color="green"></glowing-light>`);
  });

  it('has class .green', () => {
    const light = el.renderRoot.querySelector('#light');
    expect(light).to.have.class('green');
  });
});
