import { Player } from './models/player';

const PLAYERS = Object.freeze('PLAYERS');

export function fetchPlayers(): Player[] {
  let players: Player[] = JSON.parse(localStorage.getItem(PLAYERS) || '[]');
  return players;
}

export function updateScore(player: Player, score: number): Player[] {
  let players: Player[] = fetchPlayers();

  let sessionPlayer = players.find((p) => p.name === player.name);
  sessionPlayer!.score = score;

  localStorage.setItem(PLAYERS, JSON.stringify(players));

  return players;
}
