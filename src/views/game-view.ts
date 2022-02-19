import { Router, RouterLocation } from '@vaadin/router';
import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { fromEvent, mapTo, merge, pluck, scan, Subscription, withLatestFrom } from 'rxjs';
import '../components/glowing-light.js';
import '../components/step-buttons.js';
import { StepButtons } from '../components/step-buttons.js';
import '../components/toolbar-header.js';
import { router } from '../main.js';
import { fetchPlayer, submitPlayer } from '../storage.js';
import { ToastUi } from './../components/toast-ui';
import { Player } from './../models/player';
import { gameViewStyles } from './game-view.styles.js';

@customElement('game-view')
export class GameView extends LitElement {
  static styles = gameViewStyles;

  @query('step-buttons') stepButtons!: StepButtons;
  @state() player!: Player;

  location: RouterLocation = router.location;
  audio = new Audio('/red-light-green-light-song.mp3');

  toId!: NodeJS.Timeout;
  subscription!: Subscription;

  // avoids useless code to run
  disconnectedCallback() {
    this.audio.pause();
    clearTimeout(this.toId);
    this.subscription?.unsubscribe();
  }

  firstUpdated() {
    if (!this.stepButtons) {
      ToastUi.present('Unexpected error', 'E');
      Router.go('home');
      return;
    }

    const playerName = this.location?.params.playerName as string;

    if (!playerName) {
      ToastUi.present('No player has joined', 'E');
      Router.go('home');
      return;
    }

    this.player = fetchPlayer(playerName);

    const stepAction$ = fromEvent<CustomEvent>(this.stepButtons, 'step').pipe(pluck('detail'));
    const canPlay$ = merge(fromEvent(this.audio, 'play').pipe(mapTo(true)), fromEvent(this.audio, 'ended').pipe(mapTo(false)));

    this.subscription = stepAction$
      .pipe(
        withLatestFrom(canPlay$),
        scan((player, [step, canPlay]) => {
          if (!canPlay) {
            ToastUi.present('Your score has been reseted ☠️', 'I');
            navigator.vibrate(500);
            player.score = 0;
            return player;
          }

          if (step === 'forward') {
            player.score++;

            if (player.score > player.topScore) {
              player.topScore = player.score;
            }

            return player;
          }

          if (player.score > 0) {
            player.score--;
          }

          return player;
        }, this.player)
      )
      .subscribe((player) => {
        this.player = { ...player };
        submitPlayer(this.player);
      });

    this.audio.onended = () => {
      this.toId = setTimeout(() => this.play(), 3000);
      this.requestUpdate();
    };

    this.play();
  }

  play() {
    const period = Math.max(10000 - this.player.score * 100, 2000) + Math.floor(Math.random() * 3001 - 1500);
    this.audio.playbackRate = 4500 / period;
    this.audio.play();
    this.requestUpdate();
  }

  render() {
    return html`
      <toolbar-header text=${'Hi ' + this.player?.name}></toolbar-header>
      <main>
        <h3>High Score: ${this.player?.topScore}</h3>
        <glowing-light color=${this.audio.ended ? 'red' : 'green'}></glowing-light>
        <h3>Score: ${this.player?.score}</h3>
        <step-buttons></step-buttons>
      </main>
    `;
  }
}
