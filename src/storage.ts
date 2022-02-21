import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { Player } from './models/player.js';

const PLAYERS = Object.freeze('PLAYERS');

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

  setPlayerDoc(player);
}

export async function getRankings() {
  const rankingsCol = collection(getFirestore(), 'rankings');
  const snapshot = await getDocs(rankingsCol);
  return snapshot.docs.map((doc) => doc.data());
}

export async function setPlayerDoc(player: Player) {
  await setDoc(doc(getFirestore(), 'rankings', player.name), player);
}
