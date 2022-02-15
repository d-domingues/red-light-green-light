import { css } from 'lit';

export const glowingLightStyles = css`
  :host {
    --diameter: 100px;
  }

  #light {
    width: var(--diameter);
    height: var(--diameter);
    border-radius: 50%;
    background: rgb(183 28 28);
    box-shadow: rgb(177 0 0) 0px 0px 12px 12px;
  }

  #light.active {
    background: rgb(30 225 32);
    box-shadow: rgb(38 203 40) 0 0 12px 12px;
    animation: glow 1s infinite alternate;
  }

  @keyframes glow {
    to {
      box-shadow: rgb(38 203 40) 0 0 12px 4px;
    }
  }
`;
