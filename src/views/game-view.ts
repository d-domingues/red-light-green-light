import { Router, RouterLocation } from '@vaadin/router';
import { Howl } from 'howler';
import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { BehaviorSubject, fromEvent, map, pluck, scan, Subscription, switchMap, timer, withLatestFrom } from 'rxjs';
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
  @state() isGreen = false;
  @state() player!: Player;

  location: RouterLocation = router.location;
  audio = new Howl({ src: ['/red-light-green-light-song.mp3'], html5: true });
  interval$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  subscription!: Subscription;

  // avoids useless code to run
  disconnectedCallback() {
    this.audio.stop();
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

    const canPlay$ = this.interval$.pipe(
      switchMap((time) => timer(time).pipe()),
      map(() => {
        this.isGreen = !this.isGreen;
        const next = this.isGreen ? Math.max(10000 - this.player.score, 2000) + Math.floor(Math.random() * 3001 - 1500) : 3000;
        this.isGreen && this.audio.rate(4500 / next);
        this.audio[this.isGreen ? 'play' : 'stop']();
        this.interval$.next(next);
        return this.isGreen;
      })
    );

    const step$ = fromEvent<CustomEvent>(this.stepButtons, 'step').pipe(pluck('detail'));

    this.subscription = step$
      .pipe(
        withLatestFrom(canPlay$),
        scan((player, [step, canPlay]) => {
          if (!canPlay) {
            player.score = 0;
            ToastUi.present('Your score has been reseted ☠️', 'I');
            return player;
          }

          if (step === 'forward') {
            player.score++;

            if (player.score > player.topScore) {
              player.topScore = player.score;
            }
            cal;

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
  }

  render() {
    return html`
      <toolbar-header text=${'Hi ' + this.player?.name}></toolbar-header>
      <main>
        <h3>High Score: ${this.player?.topScore}</h3>
        <glowing-light color=${this.isGreen ? 'green' : 'red'}></glowing-light>
        <h3>Score: ${this.player?.score}</h3>
        <step-buttons></step-buttons>
      </main>
    `;
  }
}
