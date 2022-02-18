import { HowlOptions } from 'howler';
import { Player } from '../src/models/player.js';

export function setSessionPlayerName(name: string) {
  sessionStorage.setItem('MAKE_IT_DELICIOUS', `Delicious ${name}`);
}

export function fetchPlayers(): Player[] {
  return [];
}

export function fetchPlayer(name: string): Player {
  return { name, topScore: 100, score: 10 };
}

export function submitPlayer(player: Player) {}

export class Howl {
  constructor(options: HowlOptions) {}

  play(spriteOrId?: string | number) {}
  stop(id?: number) {}
}

export const Howler = {};
