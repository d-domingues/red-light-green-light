import { Player } from '../src/models/player.js';

export function fetchPlayers(): Player[] {
  return [];
}

export function fetchPlayer(name: string): Player {
  return { name, topScore: 100, score: 10 };
}

export function submitPlayer(player: Player) {}

export async function getRankings() {
  return [];
}
