declare class SlotView {}

declare class WebGLView {}

declare class Ctx2DView {}

declare class GameSlots {}

declare class SoundQueue {}

declare class LineClearAnimator {}

declare class RulesetManager {}

declare class Settings {}

declare class GameCaption {}

declare class Live {}

declare class Replay {}

declare class MapManager {}

declare class ModeManager {}

declare class StatsManager {}

declare class Mobile {}

declare class SFXsets {}

declare class VSFXsets {}

declare class Game extends GameCore {
  constructor();
  canvas: HTMLCanvasElement;
  holdCanvas: HTMLCanvasElement;
  queueCanvas: HTMLCanvasElement;
  v: WebGLView | Ctx2DView;
  bgCanvas: HTMLCanvasElement;
  bgctx: CanvasRenderingContext2D;
  GS: GameSlots;
  roomCapacity: number;
  connectStatusElement: HTMLDivElement;
  rInfoBox: HTMLDivElement;
  practiceMenu: HTMLDivElement;
  practiceMenuBig: HTMLDivElement;
  teamInfo: HTMLDivElement;
  sprintInfo: HTMLDivElement;
  botMenu: HTMLDivElement;
  lrem: HTMLDivElement;
  fpsElement: HTMLDivElement;
  block_size: number;
  debug: boolean;
  SEenabled: boolean;
  VSEenabled: boolean;
  SEStartEnabled: boolean;
  SEFaultEnabled: boolean;
  SErotate: boolean;
  tex: HTMLImageElement;
  tex2: HTMLImageElement;
  drawScale: number;
  skinId: number;
  ghostTex: HTMLImageElement | null;
  ghostSkinId: number;
  ghostSkins: { id: number; name: string; data: string; w: number }[];
  SFXset: { id: number; name: string; data: () => void } | null;
  VSFXset: { id: number; name: string; data: () => void } | null;
  play: boolean;
  gameEnded: boolean;
  hdAbort: boolean;
  lastSeen: number | null;
  isTabFocused: boolean;
  pmode: number;
  livePmode: number;
  selectedPmode: number;
  sprintMode: number;
  sprintModeToRun: number;
  readonly sprintModes: {
    1: 40;
    2: 20;
    3: 100;
    4: 1000;
  };
  readonly cheeseModes: {
    1: 10;
    2: 18;
    3: 100;
    100: 1000000;
  };
  readonly ultraModes: {
    1: 120;
  };
  cheeseLevel: number | undefined;
  maxCheeseHeight: number;
  minCheeseHeight: number;
  lastHolePos: number | null;
  starting: boolean;
  activeBlock: Block;
  ghostPiece: {
    pos: {
      x: number;
      y: number;
    };
  };
  timer: number;
  lastSnapshot: number;
  clock: number;
  frames: number;
  baseGravity: number;
  currentGravity: [timeToDrop: number, extraSpaces: number];
  softDrop: boolean;
  softDropId: number;
  holdPressed: boolean;
  hardDropPressed: boolean;
  lastDAS: number;
  firstDAS: boolean;
  DASdebug: boolean;
  ARRtime: number;
  pressedDir: {
    "-1": number | boolean;
    1: number | boolean;
  };
  ARRon: {
    "-1": boolean;
    1: boolean;
  };
  DASto: {
    "-1": number | null;
    1: number | null;
  };
  /**
   * Specifies the method of evaluating DAS:
   *
   * 0. Based on FPS
   * 1. Based on time.
   */
  DASmethod: number; // Why isn't this a boolean?
  lockDelayActive: number;
  lockDelayActivated: number | undefined;
  lastAction: number;
  lastGeneration: number;
  /**
   * Specifies, for how long the piece can stay on ground without locking.
   */
  lockDelay: number;
  /**
   * Specifies, for how long the piece can stay on ground while moving left/right without locking.
   */
  maxLockDelayWithoutLock: number;
  /**
   * Specifies, for how long the piece can be active.
   */
  maxWithoutLock: number;
  holdUsedAlready: boolean;
  temporaryBlockSet: number | null;
  redBar: number;
  incomingGarbage: [garbageInSegment: number, timestamp: number][];
  solidHeight: number;
  solidToAdd: number;
  solidInterval: number | null;
  solidProfiles: [[0, 3], [0, 3, 2.8, 2.6, 2.4, 2.2, 2, 1.8, 1.6, 1.4, 1.2, 1, 31, 1, 1, 1, 1, 1, 1, 1], null, null];
  garbageCols: number[];
  blockInHold: Block | null;
  focusState: number; // jezevec, why isn't this a boolean?
  statsEnabled: boolean;
  statsMode: number;
  placedBlocks: number;
  lastPlacements: number[];
  finesse: number;
  used180: number;
  totalFinesse: number;
  totalKeyPresses: number;
  place: number | null;
  redrawBlocked: boolean;
  linesAttackDef: [
    zero: number,
    single: number,
    double: number,
    triple: number,
    jstris: number,
    TSD: number,
    TST: number,
    TSS: number,
    MTSS: number,
    PC: number,
    B2B: number
  ];
  linesAttack: [
    zero: number,
    single: number,
    double: number,
    triple: number,
    jstris: number,
    TSD: number,
    TST: number,
    TSS: number,
    MTSS: number,
    PC: number,
    B2B: number
  ];
  cheeseHeight: number;
  ghostEnabled: boolean;
  // getPPS: this.getCumulativePPS;
  comboAttackDef: [
    combo0: number,
    combo1: number,
    combo2: number,
    combo3: number,
    combo4: number,
    combo5: number,
    combo6: number,
    combo7: number,
    combo8: number,
    combo9: number,
    combo10: number,
    combo11: number,
    combo12plus: number
  ];
  comboAttack: [
    combo0: number,
    combo1: number,
    combo2: number,
    combo3: number,
    combo4: number,
    combo5: number,
    combo6: number,
    combo7: number,
    combo8: number,
    combo9: number,
    combo10: number,
    combo11: number,
    combo12plus: number
  ];
  comboCounter: number;
  fourWideFlag: boolean;
  PCdata: {
    blocks: number;
    lines: number;
  };
  linesRemaining: number;
  inactiveGamesCount: number;
  xbuffMask: number;
  replayPartsSent: number;
  transmitMode: number;
  fragmentCounter: number;
  liveSnapRate: number;
  snapRate: number;
  soundQ: SoundQueue;
  /**
   * A generator function that generates pseudo-random values between 0 and 1.
   */
  RNG: () => number;
  /**
   * A generator function that generates pseudo-random values between 0 and 1.
   */
  blockRNG: () => number;
  /**
   * Last 6 digits of a base-36 encoded RNG value.
   */
  blockSeed: string;
  bigTriggered: boolean;
  bigChance: number;
  interval: number | null;
  animator: LineClearAnimator | null;
  RulesetManager: RulesetManager;
  conf: [object, object];
  /**
   * Refers to `this.conf[0]`.
   */
  R: GameSettings;
  Settings: Settings;
  Caption: GameCaption;
  Live: Live;
  Replay: Replay;
  Scoring: Scoring;
  MapManager: MapManager;
  ModeManager: ModeManager;
  GameStats: StatsManager;
  Mobile: Mobile;
  Bots: object[];

  rollBigSpawn(): void;
  loadGhostSkin(url: string, size: number): void;
  changeSkin(skinIndex: number): void;
  initSFX(): void;
  changeSFX(sfx: SFXsets | VSFXsets): void;
  loadSounds(sfx: SFXsets | VSFXsets): void;
  drawGrid(mode: number): void;
  isPmode(doInvert: boolean): number;
  // ? A parameter is not known.
  startPractice(
    mode: number,
    unknownParameter: boolean,
    extraParameters: {
      callback: () => void | null;
      isLivePmode: boolean;
      mapId: number;
      mapForOpponents: boolean;
    }
  ): void;
  readyGo(): void;
  startReadyGo(): void;
  // ? Parameters not known.
  getPlace(unknownParameter1: boolean, unknownParameter2: boolean): number;
  getPlaceColor(place: number): string;
  start(): void;
  restart(): void;
  setFocusState(newFocusState: number): void; // Again, why isn't this a boolean?
  /**
   * Fires whenever a key is pressed.
   * @param input The keyboard event sent to the function.
   */
  keyInput2(input: KeyboardEvent): void;
  /**
   * Fires whenever a key is released.
   * @param input The keyboard event sent to the function.
   */
  keyInput3(input: KeyboardEvent): void;
  /**
   * Handles direction cancelling.
   * @param direction The new direction to move the piece: `-1` to move left, `1` to move right.
   * @param timestamp `-1` if DAS should trigger instantly, `false` otherwise.
   */
  // ? Not really sure about `timestamp`.
  directionCancel(direction: number, timestamp: number | boolean): void;
  evalDeferredDAS(direction: number, timestamp: number): void;
  setDASto(direction: number, shouldActivate: boolean, DAStimer: number | null): void;
  redrawMatrix(): void;
  hasGhost(): number;
  getDAS(): number;
  getARR(): number;
  drawGhostAndCurrent(): void;
  redraw(): void;
  redrawAll(): void;
  /**
   * Updates the Live opponent boards.
   * @param slot The slot to update.
   * @param matrix The 20x10 matrix to draw.
   * @param redBar The height of red bar (pending garbage).
   */
  updateLiveMatrix(slot: number, matrix: number[][], redBar: number): void;
  /**
   * Plays specified sound or sounds.
   * @param soundOrSounds Sound or sounds to play.
   * @param type `1` for regular sounds, `2` for voice samples.
   */
  playSound(soundOrSounds: string | string[], type: number): void;
  /**
   * Moves the active piece.
   * @param direction The direction to move the piece.
   * @param isARR Whether the movement is due to ARR or not.
   * @param timestamp The timestamp of the movement.
   * @returns Whether the piece could move or not.
   */
  moveCurrentBlock(direction: number, isARR: boolean, timestamp: number): boolean;
  beforeHardDrop(timestamp: number): void;
  hardDrop(timestamp: number): void;
  isSoftDropFasterThanGravity(): boolean;
  softDropSet(isSoftDropping: boolean, timestamp: number): void;
  GameOver(): void;
  generatePracticeQueue(seed: string): void;
  getAdjustedLiveSeed(seed: string): string;
  isBannedStartSequence(queue: Block[], unknownParameter: boolean): boolean;
  refillQueue(): void;
  getNextBlock(timestamp?: number): void;
  playCurrentPieceSound(): void;
  practiceModeCompleted(timestamp?: number): void;
  frame(): void;
  run(): void;
  onMove(replayAction: ReplayAction): void;
  // ? A parameter is not known.
  checkAutoRepeat(timestamp: number, unknownParameter: boolean): boolean;
  autoRepeat(direction: number, pressTimestamp: number, currentTimestamp: number): boolean;
  plotForDASDebug(timestamp: number): void;
  activateDAS(direction: number, timestamp: number): boolean;
  update(timeDelta_ms: number, timestamp: number): void;
  getCumulativePPS(): number;
  updateTextBar(): void;
  sendRepFragment(): void;
  sendSnapshot(): void;
  garbageQueue(linesReceived: number): void;
  addIntoGarbageQueue(garbageToAdd: number): void;
  /**
   * Adds garbage asynchronously (even if a piece is in play).
   * @param garbageToAdd The amount of garbage lines to add.
   * @returns Selected garbage hole column (number between 0 and 9)
   */
  addAsyncGarbage(garbageToAdd: number): number;
  addAsyncGarbageFromTheQueue(): void;
  cancelSolid(): void;
  solidStartRaising(): void;
  toggleStats(statsMode: number): void;
  cheeseModeStart(): void;
  setLrem(linesRemaining: number): void;
  applyGravityLvl(gravityLevel: number): void;
  setLockDelay(lockDelayArray: [lockDelay: number, maxLockDelayWithoutLock: number, maxWithoutLock: number]): void;
  pageTitle(title: string): void;
  browserTabFocusChange(focusState: number): void;
  sprintInfoLineContent(mode: number): void;
  evalPCmodeEnd(): void;
  savePlacementTime(): void;
  getCurrentPPS(): number;
  isHardDropAllowed(): boolean;
  setSpeedLimit(PPSlimit: number): void;
  setupGameLinks(): void;
}

type Randomizer = Bag | Classic | OneBlock | C2Sim | Repeated | BsBlock | BigBlockRand | ConstBlock;

type GameSettings = {
  clearDelay: number;
  rnd: number;
  showPreviews: number;
  holdEnabled: boolean;
  baseBlockSet: number;
  gravityLvl: number;
  lockDelay: [lockDelay: number, maxLockDelayWithoutLock: number, maxWithoutLock: number];
  mess: number;
  gapW: number;
  gInv: boolean;
  gDelay: number;
  gblock: number;
  tsdOnly: boolean;
  allSpin: number;
  speedLimit: number;
  scoreMult: number;
  ghost: number;
  DAS: number;
  ARR: number;
  clearLines: boolean;
  sfx: boolean;
  vsfx: boolean;
  solidAttack: boolean;
  ext: number;
  sgProfile: number[];
};

declare class GameCore {
  constructor(isGame: boolean);
  ISGAME: boolean;
  // If only jezevec known about object inheritance using classes instead of prototype chaining...
  randomizer: Randomizer | null;
  /**
   * A 20 x 10 array specifying blocks in the visible area of the playfield.
   */
  matrix: number[][];
  /**
   * A 1 x 10 array specifying blocks in the hidden row.
   */
  deadline: number[];
  blockSets: object[];
  readonly softDropSpeeds: [
    {
      id: 0;
      time: 0.05;
      steps: 0;
    },
    {
      id: 1;
      time: 0.008;
      steps: 0;
    },
    {
      id: 2;
      time: 0;
      steps: 1;
    },
    {
      id: 3;
      time: 0;
      steps: 2;
    },
    {
      id: 4;
      time: 0;
      steps: 20;
    }
  ];
  readonly blockIds: {
    Z: 6;
    L: 3;
    O: 1;
    S: 5;
    I: 0;
    J: 4;
    T: 2;
  };
  queue: Block[];
  queueLength: number;
  gamedata: {
    lines: number;
    singles: number;
    doubles: number;
    triples: number;
    tetrises: number;
    maxCombo: number;
    linesSent: number;
    linesReceived: number;
    PCs: number;
    lastPC: number;
    TSD: number;
    TSD20: number;
    B2B: number;
    attack: number;
    score: number;
    holds: number;
    garbageCleared: number;
    wasted: number;
    tpieces: number;
    tspins: number;
  };
  skins: {
    id: number;
    name: string;
    data: string;
  }[];
  customSkinPath: string | null;
  temporaryBlockSet: number | null;
  blockInHold: Block | null;
  spinPossible: boolean;
  spinMiniPossible: boolean;
  tspinMiniPossible: boolean;
  isBack2Back: boolean;
  wasBack2Back: boolean;
  isInvisibleSkin: boolean;
  monochromeSkin: boolean;
  readonly cids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  readonly coffset: [0, 2, 3, 4, 5, 6, 7, 8, 1, 0];
  readonly colors: [
    "black",
    "#D70F37",
    "#E35B02",
    "#E39F02",
    "#59B101",
    "#0F9BD7",
    "#2141C6",
    "#AF298A",
    "#999999",
    "#6A6A6A",
    "black",
    "white"
  ];
  readonly colorsV3: [number, number, number][];
  readonly NullCol: [
    "black",
    "#E4203E",
    "#E47E30",
    "#E3CF3C",
    "#1DE03D",
    "#00C9DF",
    "#0042DC",
    "#9E2CDC",
    "#999999",
    "#585858",
    "black",
    "white"
  ];
  readonly multipleNames: ["Single", "Double", "Triple", "Quadruple", "Multiple"];
  excludedBlocksAS: string[];
  Items: Items;
  R: GameSettings;
  DEF: GameSettings;

  randomizerFactory(randomizerID: number, pre_seed: string): Randomizer;
  initRandomizer(randomizerID: number): void;
  getRandomizerBlock(randomizer?: Randomizer): Block;
  generateLiveQueue(): void;
  getBlockFromQueue(): Block;
  checkIntersection(x: number, y: number, pieceState: number): boolean;
  setCurrentPieceToDefaultPos(): boolean;
  centerColumnCheck(x: number, y: number): boolean;
  rotateCurrentBlock(stateChange: number): void;
  addSolidGarbage(): void;
  gravityStep(step: number, timestamp: number): boolean;
  holdBlock(): void;
  moveBlockToTheWall(direction: number): number;
  updateGhostPiece(forceUpdate?: boolean): void;
  checkTSpin(pieceID: number): void;
  checkAllSpinImmobile(): void;
  checkAllSpin(pieceID: number): number | void;
  checkLineClears(timestamp?: number): void;
  countGarbageHeight(heightLimit?: number): number;
  is4W(rowCheckedFor4W: number): boolean;
  placeBlock(x: number, y: number, timestamp: number): void;
  getQueuePreview(randomizer: Randomizer): Block[];
  generateQueue(): void;
  addGarbageFromQueue(timestamp: number): void;
  addGarbage(amountOfLines: number): number;
  addToGarbageQueue(garbageToAdd: number): void;
  getAPM(): number;
  getKPP(): number;
  getVS(): number;
  getWasted(): number;
  score(scoring: Scoring);
}

/**
 * Defines a playable piece.
 */
declare class Block {
  constructor(id: number);
  /**
   * The piece ID in a given piece set.
   */
  id: number;
  /**
   * The piece set used by the piece:
   *
   * 0. Standard
   * 1. Big, moves 2 spaces left/right at a time
   * 2. Big, moves 1 space left/right at a time (Big+ in-game)
   * 3. Arika Rotation System
   * 4. Pentominoes
   * 5. M123
   * 6. All-29
   * 7. Cultris II Rotation System
   * 8. O-spin Rotation System
   */
  set: number;
  /**
   * The position of the top-left block of the bounding box of the piece.
   */
  pos: {
    x: number;
    y: number;
  };
  /**
   * The rotation state of the piece.
   * ```
   * State 0 | State 1 | State 2 | State 3 |
   *   []    |   []    |         |   []    |
   * [][][]  |   [][]  | [][][]  | [][]    |
   *         |   []    |   []    |   []    |
   * ```
   */
  rot: number;
  /**
   * Specifies an item that piece contains.
   * Items are used rarely during April Fools.
   */
  item: number;
}

declare class ReplayAction {
  constructor(action: number, timestamp: number);
  /**
   * Specifies an action.
   */
  a: number;
  /**
   * Specifies a timestamp.
   */
  t: number;
  /**
   * Specifies extra data.
   */
  d: number | number[];
}

declare class Bag {}

declare class Classic {}

declare class OneBlock {}

declare class C2Sim {}

declare class Repeated {}

declare class BsBlock {}

declare class BigBlockRand {}

declare class ConstBlock {}

declare class Items {}

declare class Scoring {
  readonly A: {
    SOFT_DROP: 0;
    HARD_DROP: 1;
    CLEAR1: 2;
    CLEAR2: 3;
    CLEAR3: 4;
    CLEAR4: 5;
    TSPIN_MINI: 6;
    TSPIN: 7;
    TSPIN_MINI_SINGLE: 8;
    TSPIN_SINGLE: 9;
    TSPIN_DOUBLE: 10;
    TSPIN_TRIPLE: 11;
    PERFECT_CLEAR: 12;
    COMBO: 13;
    CLEAR5: 14;
  };
  readonly ATI: [-1, -1, 1, 2, 3, 4, -1, -1, 8, 7, 5, 6, 9, -1, 6];
  readonly S: [
    softDrop: 1,
    hardDrop: 2,
    clear1: 100,
    clear2: 300,
    clear3: 500,
    clear4: 800,
    clear5: 1600,
    tspinMini: 100,
    tspin: 400,
    tspinMiniSingle: 200,
    tspinSingle: 800,
    tspinDouble: 1200,
    tspinTriple: 1600,
    perfectClear: 300,
    combo: 50
  ];
  readonly B2B: [
    softDrop: undefined,
    hardDrop: undefined,
    clear1: undefined,
    clear2: undefined,
    clear3: undefined,
    clear4: 400,
    clear5: 800,
    tspinMini: undefined,
    tspin: undefined,
    tspinMiniSingle: 100,
    tspinSingle: 400,
    tspinDouble: 600,
    tspinTriple: 800,
    perfectClear: undefined,
    combo: undefined
  ];
}
