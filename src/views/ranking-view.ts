import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../components/toolbar-header.js';
import { Player } from '../models/player.js';
import { fetchPlayers } from '../storage.js';

@customElement('ranking-view')
export class RankingView extends LitElement {
  static styles = css`
    table,
    td,
    th {
      border: 2px solid white;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      max-width: min(300px, 100vw - 40px);
      margin: 40px auto 0;
    }
  `;

  players: Player[] = fetchPlayers();

  render() {
    return html`
      <toolbar-header text="Ranking"></toolbar-header>
      <table>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
        ${this.players
          .sort((a, b) => b.topScore - a.topScore)
          .map(
            ({ name, topScore }) => html`
              <tr>
                <td>${name}</td>
                <td>${topScore}</td>
              </tr>
            `
          )}
      </table>
    `;
  }
}
