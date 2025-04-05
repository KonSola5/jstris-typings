/// <reference types="./index.d.ts" />

/*
 * Every class declared here is done so via an IIFE and thus not monkey patchable.
 *
 * Only accessible via instances.
 */

declare namespace JstrisBots {
  type BotTypes = "CC" | "MM" | "frey" | "del";

  interface ConfiguratorOptions {
    target: HTMLElement;
    props: {
      bots: BotConfig[];
      botTypes: BotDefinition[];
      // onSubmitData: this.onConfigSubmit.bind(this),
    };
  }

  interface BotConfig {
    /** Bot's ID. */
    id: number;
    /**
     * Type of a bot:
     * - **CC**: ColdClear,
     * - **MM**: MisaMino,
     * - **frey**: Freybot,
     * - **del**: Dellacherie
     */
    type: "CC" | "MM" | "frey" | "del";
    /**
     * How is the bot speed defined.
     * - **PPS**: Constant pieces per second.
     * - **TB**: Turn based.
     */
    speed: "PPS" | "TB";
    /** Bot's name. */
    name: string;
    /** Bot's PPS if specified. */
    pps?: number;
  }

  interface BotDefinition {
    /** Bot type. */
    id: BotTypes;
    /** Bot's default name. */
    name: string;
    /** Entrypoint: Relative URL to a JS file that handles the bot. */
    ep: string;
  }

  interface RoundResults {
    p: Bot | Human;
    t: number;
    data: Jstris.GameData;
  }

  interface PostScoreResponse {
    error: number | null;
    id: string;
    game: number;
    url: string;
    rev: boolean;
    score: {
      p1: number;
      p2: number;
      u1: string | null;
      u2: string | null;
    };
  }

  interface ReplayData {
    id: string | null;
    replay: string;
  }

  interface BotGameConfig {
    seed: string;
    conf: Jstris.Ruleset;
    linesAttack: Jstris.AttackTable;
    comboAttack: Jstris.ComboTable;
    ts: number;
  }
}
/**
 * Class handling bots.
 *
 * Exposed to the `window` global object.
 */
declare class Bots {
  constructor(game: Game);
  botPlayers: { [index: number]: BotPlayer };
  bots: Bot[];
  room: Room;
  configurator: Configurator;
  human: Human;
  ui: UI;
  mode: number;
  readonly BOT_CONFIG_KEY: "bot-conf2";
  readonly BOT_TYPES: JstrisBots.BotDefinition[];

  start(): void;
  openConfigurator(): void;
  cleanup(): void;
  stopAll(): void;
  onConfigSubmit(config: JstrisBots.BotConfig[]): void;
  newGame(): void;
  newGameStart(): void;
  onPlayerTopout(): void;
  attackFromPlayerToBot(attack: number, comboAttack: number): void;
  attackFromBotToPlayer(bot: Bot, attack: number, comboAttack: number): void;
  onHardDrop(): void;
  onPracticeModeCompleted(): void;
  spawnBotPlayer(bot: Bot): void;
  onReset(): void;
}

declare class Room {
  private constructor(game: Game, bots: Bots);
  g: Game;
  bots: Bots;
  players: (Bot | Human)[];
  live: (Bot | Human)[];
  gameInitTime: number | null;
  gameStartTime: number | null;
  gameSeed: string | null;
  saveResults: boolean;
  displayResults: boolean;
  permaAllowSubmit: boolean;

  initGameRound(isHumanPlaying?: boolean): void;
  updateResetBtn(): void;
  allowReset(): boolean;
  canBeStartedWithoutHuman(): boolean;
  gameRunning(): boolean;
  onGameBegin(): void;
  isStillPlaying(player: Bot | Human): boolean;
  playerDead(player: Bot | Human): void;
  roundFinalize(): void;
  playerWinner(player: Bot | Human): void;
  timeFormat(timeSec: number, precision?: number): string;
  roundResults(): void;
  allowSubmit(results: JstrisBots.RoundResults[]): boolean;
  submitRound(results: JstrisBots.RoundResults[]): void;
  replayUpload(
    postScore: JstrisBots.PostScoreResponse,
    replayData: JstrisBots.ReplayData[],
    resultDiv: HTMLDivElement
  ): void;
  renderErrCode(errorCode: number, errorDiv: HTMLDivElement): void;
  processAttack(player: Bot | Human, attack: number, comboAttack: number): void;
}

declare class Human {}

declare class Bot {
  constructor(bots: Bots, config: JstrisBots.BotConfig);
  readonly IS_BOT: true;
  p: Bots;
  conf: JstrisBots.BotConfig;
  player: BotPlayer;
  g: GameCore;
  botType: JstrisBots.BotDefinition;
  timer: number | null;
  play: boolean;
  data: Data;
  recordReplay: boolean;
  moveDelayMs: number | null;

  setBotPlayer(botPlayer: BotPlayer);
  getEntrypoint(): string;
  onPlayersHardDrop(): void;
  stopTimers(): void;
  onGameOver(): void;
  onPracticeModeCompleted(): void;
  onPlayerRoundPlacement(place: number): void;
  timestamp(): number;
  initNewGame(config: JstrisBots.BotGameConfig): void;
  receiveAttack(attack: number, comboAttack: number): void;
  onBotMove(shouldMove: boolean): void;
  getRoundTime(): number;
  // getGamedata()
}

declare class BotPlayer {}

declare class Data {}

declare type Configurator = unknown; // Not even attempting to type this class - it uses many polyfills.

declare class UI {}
