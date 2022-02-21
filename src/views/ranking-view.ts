import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';
import '../components/toolbar-header.js';
import { getRankings } from '../storage.js';

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

  render() {
    return until(
      getRankings().then(
        (players) => html`
          <toolbar-header text="Ranking"></toolbar-header>
          <table>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
            ${players.map(
              ({ name, topScore }) => html`
                <tr>
                  <td>${name}</td>
                  <td>${topScore}</td>
                </tr>
              `
            )}
          </table>
        `
      ),
      'Loading...'
    );
  }
}
