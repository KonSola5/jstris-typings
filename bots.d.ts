/// <reference types="./index.d.ts" />

/*
 * Every class declared here is done so via an IIFE and thus not monkey patchable unless speficied otherwise.
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

  type BotCommands = "start" | "stop" | "suggest" | "new_piece" | "rules" | "play";

  type Orientations = "north" | "south" | "east" | "west";

  type Pieces = "Z" | "L" | "O" | "S" | "I" | "J" | "T" | "G";

  type SpinTypes = "none" | "mini" | "full";

  interface BotMessage {
    start: {
      hold: string;
      queue: string[];
      combo: number;
      back_to_back: boolean;
      board: string[][];
    };
    stop: undefined;
    suggest: undefined;
    new_piece: {
      piece: string;
    };
    rules: undefined;
    play: {
      move: Move;
    };
  }

  interface Move {
    location: Location;
    spin: SpinTypes;
  }

  interface Location {
    orientation: Orientations;
    type: Pieces;
    x: number;
    y: number;
  }
}

declare const States = {
  NO_INFO: 0,
  INITIALIZING: 1,
  STOPPED: 2,
  READY: 3,
  SENDING_MOVE: 4,
} as const;

declare type States = typeof States;

/**
 * Class handling bots.
 *
 * Exposed to the `window` global object.
 */
declare class Bots {
  constructor(game: Game);
  p: Game;
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

class Room {
  constructor(game: Game, bots: Bots);
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

class Human {
  constructor(game: GameCore)
  readonly IS_BOT: false;
  g: GameCore;
  data: Data;

  receiveAttack(attack: number, comboAttack: number): void;
  onPlayerRoundPlacement(place: number): void;
  getRoundTime(): number;
  getGamedata(): JstrisBots.GameData;
  getName(): string
  getAccId(): null;
  stopTimers(): void;
}

class Bot {
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
  getGamedata(): JstrisBots.GameData
}

class BotPlayer {
  constructor(bots: Bots, cid: number, view: SlotView, bot: Bot);
  cid: number;
  bot: Bot;
  p: Bots;
  v: SlotView;
  g: BotGame;
  // g.p = this;
  // g.Live.sendAttack = this.sendAttack.bind(this);
  // v.g = this.g;
  // g.v = n;
  worker: Worker;
  run_id: number;
  readonly ORIENTATION: Readonly<{
    north: 0,
    east: 1,
    south: 2,
    west: 3,
  }>;
  suggests: number;
  suggestions: number;
  ignoreUntil: number | null;
  readonly BLOCK_COLOR: Readonly<{
    1: "Z",
    2: "L",
    3: "O",
    4: "S",
    5: "I",
    6: "J",
    7: "T",
    8: "G",
  }>;
  fullName: string | null;
  state: States[keyof States];
  internalFailure: boolean;
  stateChange: number;
  tbpResetBoardRequired: boolean;

  init(): void;
  onError(this: BotPlayer, error: Error): void;
  getBlockDataFromBlock<TBlock extends Block>(piece: TBlock): Jstris.BlockSets[TBlock["set"]]["blocks"][TBlock["id"]];
  sendAttack(attack: number, comboAttack: number, unusedParameter?: unknown): void;
  getStringQueue(unusedParameter?: unknown): string[];
  onMessage(this: BotPlayer, event: MessageEvent): void;
  startCommand(): void;
  send<TCommand extends JstrisBots.BotCommands>(command: TCommand, options: JstrisBots.BotMessage[TCommand]): void;
  gameStart(config: JstrisBots.BotGameConfig): void;
  forceStopBot(): void;
  stopBot(): void;
  botGameOver(): void;
  move(): void;
  resetWithUpdatedBoard(): void;
  rowToBinary(row: Jstris.MatrixRow): number;
  saveReplayStep(): void;
  playMove(move: JstrisBots.Move): boolean;
}

class BotGame extends GameCore {
  constructor();
  p: BotPlayer;
  queue: Block[];
  Replay: Replay;
  Scoring: Scoring;
  ghostPiece: { pos: { x: number; y: number } };
  incomingGarbage: [garbageInSegment: number, timestamp: number][];
  redBar: number;
  solidHeight: number;
  GameStats: { get: () => { set: () => void } };
  SFXset: NullSFXset;
  VSEenabled: boolean;
  Live: {
    noFourWide: boolean;
    liveMode: number;
    sendAttack: (this: BotPlayer, attack: number, comboAttack: number, unusedParameter: unknown) => void;
  };
  ISGAME: boolean;

  refillQueue(): void;
  redraw(): void;
  getNextBlock(): void;
  /** Empty function. */
  savePlacementTime(): void;
  isPmode(isLive: boolean): boolean; // For some reason jezevecgame declares this method twice.
  addGarbageFromQueue(timestamp: number): void;
  addGarbageFromQueueImmediate(timestamp: number): void;
  /** Empty function. */
  checkAutoRepeat(): void;
  /** Empty function. */
  playSound(): void;
  GameOver(): void;
  restart(): void;
  cheeseModeStart(): void;
  practiceModeCompleted(): void;
  /** Empty function. */
  setLrem(linesRemaining: number): void;
}
class Data {}
type Configurator = unknown; // Not even attempting to type this class - it uses many polyfills.
class UI {}
