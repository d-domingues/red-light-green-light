import { css } from 'lit';

export const glowingLightStyles = css`
  :host {
    --diameter: 100px;
    --glow-w: 6px;
  }

  #light {
    position: relative;
    width: var(--diameter);
    height: var(--diameter);
    border-radius: 50%;
    background: red;
  }

  #light.active {
    animation: glow 2s linear infinite;
    background: linear-gradient(45deg, transparent, transparent 40%, #e5f403);
  }

  #light:before {
    content: '';
    position: absolute;
    top: var(--glow-w);
    left: var(--glow-w);
    right: var(--glow-w);
    bottom: var(--glow-w);
    border-radius: 50%;
    z-index: 1;
    background: radial-gradient(#2d7e2d, #19bd19);
  }

  /*   #light:before.active {
  } */

  #light:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, transparent 40%, #e5f403);
    border-radius: 50%;
    z-index: 1;
    filter: blur(30px);
  }

  @keyframes glow {
    100% {
      transform: rotate(360deg);
    }
  }
`;
