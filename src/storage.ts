import { Player } from './models/player.js';

const PLAYERS = Object.freeze('PLAYERS');
const SESSION_PLAYER_NAME = Object.freeze('SESSION_PLAYER_NAME');

export function fetchPlayers(): Player[] {
  let players: Player[] = JSON.parse(localStorage.getItem(PLAYERS) ?? '[]');
  return players;
}

export function fetchPlayer(name: string): Player {
  return fetchPlayers().find((p) => p.name === name) ?? { name, score: 0 };
}

export function fetchSessionPlayer(): Promise<Player> {
  return new Promise((res, rej) => {
    const playerName = getSessionPlayerName();
    playerName ? res(fetchPlayer(playerName)) : rej();
  });
}

export function updateScore(player: Player, score: number): Player[] {
  let players: Player[] = fetchPlayers();

  let sessionPlayer = players.find((p) => p.name === player.name);
  sessionPlayer!.score = score;

  localStorage.setItem(PLAYERS, JSON.stringify(players));

  return players;
}

export function setSessionPlayerName(name: string) {
  sessionStorage.setItem(SESSION_PLAYER_NAME, name);
}

export function getSessionPlayerName() {
  return sessionStorage.getItem(SESSION_PLAYER_NAME);
}
