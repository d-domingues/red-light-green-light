import { css } from 'lit';

export const gameViewStyles = css`
  main {
    position: relative;
    height: calc(100vh - 46px);
  }

  main > * {
    position: absolute;
  }

  game-canvas {
    height: inherit;
  }

  h3 {
    left: 20px;
    color: black;
  }

  glowing-light {
    top: 5%;
    right: 10%;
  }

  step-buttons {
    bottom: 10px;
    left: 50%;
    transform: translate(-51%);
  }
`;
