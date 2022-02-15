import { css } from 'lit';

export const homeViewStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    max-width: min(300px, 100vw - 40px);
    margin: 30vh auto;
    align-items: center;
  }

  button {
    position: relative;
    background-color: #4b52d6;
    border: none;
    font-size: 20px;
    color: #ffffff;
    padding: 10px;
    width: 150px;
    text-align: center;
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    margin: 20px;
  }

  button:after {
    content: '';
    background: #f1f1f1;
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -20px !important;
    margin-top: -120%;
    opacity: 0;
    transition: all 0.8s;
  }

  button:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s;
  }
`;
