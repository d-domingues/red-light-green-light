import { css } from 'lit';

export const homeViewStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    max-width: min(500px, 100vw - 40px);
    margin: 30vh auto;
    align-items: center;
  }

  h3#label-create-player {
    color: white;
  }

  input#player-name {
    width: 100%;
  }
`;
