import { Player } from './models/player.js';

const PLAYERS = Object.freeze('PLAYERS');
const SESSION_PLAYER_NAME = Object.freeze('SESSION_PLAYER_NAME');

export function fetchPlayers(): Player[] {
  let players: Player[] = JSON.parse(localStorage.getItem(PLAYERS) ?? '[]');
  return players;
}

export function fetchPlayer(name: string): Player {
  return fetchPlayers().find((p) => p.name === name) ?? { name, topScore: 0, score: 0 };
}

export function submitPlayer(player: Player) {
  let players: Player[] = fetchPlayers();
  const idx = players.findIndex((p) => p.name === player.name);

  if (idx >= 0) {
    players[idx] = player;
  } else {
    players.push(player);
  }

  localStorage.setItem(PLAYERS, JSON.stringify(players));
}

export function setSessionPlayerName(name: string) {
  sessionStorage.setItem(SESSION_PLAYER_NAME, name);
}

export function getSessionPlayerName() {
  return sessionStorage.getItem(SESSION_PLAYER_NAME);
}

export function fetchSessionPlayer(): Promise<Player> {
  return new Promise((res, rej) => {
    const playerName = getSessionPlayerName();
    playerName ? res(fetchPlayer(playerName)) : rej();
  });
}
