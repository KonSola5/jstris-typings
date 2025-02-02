declare type AleaPRNG = () => number;
/** @deprecated Jstris should use {@link KeyboardEvent.code() keyboard codes} instead. Come on, we are in 2025. */
declare type KeyCode = number;

declare type ReplayResponse = {
  /** The replay ID. */
  id: number;
  /** The game mode played. */
  gm: number;
  /**
   * Map ID or a number that is composed like this:
   *
   * `ruleset * 10 + submode`.
   */
  m: number;
  /** Whether a replay has been generated for the game. */
  rep: true;
  /** Contains personal best info if a PB has been achieved, `true` if that was the first game, `false` if no PB was achieved. */
  pb: PersonalBestInfo | boolean;
};

declare type PersonalBestInfo = {
  /** The new best score/time. */
  new: number;
  /** The previous best score/time. */
  prev: number;
  /** The new best score/time. */
  newS: number;
  /** The previous best score/time. */
  prevS: number;
  /** The improvement from the previous best score/time. */
  diffS: number;
  /** How long ago the previous PB was achieved. */
  days: number;
};

/**
 * Specifies options for GIF/video skins.
 */
declare type VideoOptions = {
  /**
   * **GIF skins**: Turns a single GIF into a complete skin by replicating the GIF 9 times over.
   *
   * Discards the original aspect ratio of the GIF.
   */
  skinify?: boolean;
  /** **GIF skins**: If `skinify` option is `true`, the skinified GIF will be tinted with Guideline colors. */
  colorize?: boolean;
  /**
   * **GIF skins**: If `colorize` option is `true`, specifies the tint intensity.
   *
   * A number between 0 and 1. Defaults to 0.7 if not provided.
   */
  colorAlpha?: number;
  /**
   * **Video skins**: Specifies, whether the video plays sounds.
   *
   * Defaults to `false` if not provided.
   */
  sound?: boolean;
};

declare type GameData = {
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

declare type Controls = [
  moveLeft: KeyCode,
  moveRight: KeyCode,
  softDrop: KeyCode,
  hardDrop: KeyCode,
  rotateLeft: KeyCode,
  rotateRight: KeyCode,
  rotate180: KeyCode,
  hold: KeyCode,
  restartPractice: KeyCode,
  restartLive: KeyCode
];

/**
 * Formats time into minutes, seconds and optionally partial seconds.
 * @param timeSec Time in seconds.
 * @param precision Decimal points shown for seconds.
 * @returns Formatted time:
 *  - `ss.sss` for times below 1 minute,
 *  - `mm:ss.sss` for times above 1 minute.
 */
declare function sprintTimeFormat(timeSec: number, precision?: number): string;

/**
 * Gets a parameter from the current URL.
 * @param parameterName Parameter to find.
 * @returns The value of the parameter.
 */
declare function getParameterByName(parameterName: string): string;

/**
 * Finds the first key in an object which value matches the provided value.
 * @param object The object to search.
 * @param value The value to find.
 * @returns The found key.
 */
declare function getKeyByValue(object: object, value: any): any;

/**
 * Turns a byte array into a Base64-encoded string.
 * @param byteArray Byte array to turn into Base64.
 * @returns Base64-encoded string.
 */
declare function _simpleArrayBufferToBase64(byteArray: Uint8Array): string;

/**
 * Turns a Base64-encoded string into a byte array.
 * @param base64array Base64-encoded string.
 * @returns Byte array.
 */
declare function base64ToBinary(base64array: string): Uint8Array;

/**
 * Counts the amount of keys in a given object.
 * @param object The object to count keys of.
 * @returns Number of keys in the object.
 */
declare function objSize(object: object): number;

/**
 * Creates a shallow copy of an object.
 * @param object The object to copy (or any value).
 * @returns Shallow copy of an object, if object has been provided, the input parameter otherwise.
 */
declare function objCopy(object: object | any): object | any;

/**
 * Determines whether an array includes a certain element.
 * @deprecated Jstris uses {@link Array.includes() `Array.prototype.includes()`} instead.
 * @param array The array to search.
 * @param value The value to search for.
 * @returns `true` if the given value is in the array, `false` otherwise.
 */
declare function arrayContains(array: any[], value: any): boolean;

/**
 * Turns a hex-formatted RGB value into individual RGB values.
 * @param rgbHex The hex-formatted RGB value.
 * @param divisor Specifies a number to divide all RGB values by. Defaults to `1` if not provided.
 * @returns The array of red, green, and blue values, or `null` if the RGB hex value is invalid.
 */
declare function hexToRgb(rgbHex: string, divisor?: number): [red: number, green: number, blue: number] | null;

/**
 * Strips all duplicate elements out of the array.
 * @param array The array to strip all duplicate elements from.
 * @returns The array with every value unique.
 */
declare function arrayUnique(array: any[]): any[];

/**
 * Creates a shallow copy of a 2D matrix.
 * @param matrix The matrix to copy.
 * @returns The matrix copy.
 */
declare function copyMatrix(matrix: number[][]): number[][];

/**
 * Escapes all `&`, `<` and `>` characters in order to sanitize input inserted via `innerHTML`.
 * @param string The string to escape.
 * @returns The escaped string.
 */
declare function stringEscape(string: string): string;

/**
 * Translates the string based on the current `i18n` value, and replaces all strings in {curly_brackets} with the appropriate value from the `replacements` object.
 * @param string The string to replace.
 * @param replacements The object that contains replacements for strings in {curly_brackets}.
 * @returns The translated string.
 */
declare function trans(string: string, replacements: object): string;

/**
 * Gets an SVG symbol from the external file and embeds it into a HTML string to be later embedded using `innerHTML`.
 * @param svgSrc Link to SVG file containing symbols.
 * @param symbolToUse The symbol to use from the SVG file.
 * @param cssClasses CSS classes to use.
 * @returns String containing the `<svg>` HTML element.
 */
declare function getSVG(svgSrc: string, symbolToUse: string, cssClasses: string): string;

/**
 * Sets `display: block` style on an element.
 * @param element The element to modify.
 */
declare function showElem(element: HTMLElement): void;

/**
 * Sets `display: none` style on an element.
 * @param element The element to modify.
 */
declare function hideElem(element: HTMLElement): void;

/**
 * Escapes all `&`, `<`, `>` and `"` characters in order to sanitize the input.
 * @param string The string to sanitize.
 * @returns The sanitized string.
 */
declare function htmlEntities(string: string): string;

/**
 * Toggles the visibility of an element.
 * @param element The element to show/hide.
 */
declare function toggleElem(element: HTMLElement): boolean;

/**
 * Selects all text from the element.
 * @param element The element to select all text from.
 */
declare function selectText(element: HTMLElement): void;

declare function addOption(
  selectElement: HTMLSelectElement,
  optionToAdd: { id: number; title: string; description: string }
): void;

declare function CDN_URL(resourceLocation: string): string;

/**
 * Includes an external script.
 * @param scriptSource URL of the desired script.
 * @param onLoad What to do, when the script is loaded.
 */
declare function includeScript(scriptSource: string, onLoad: (event: Event) => void): void;

/**
 * Loads an external skin.
 * @param url Skin URL.
 * @param size The skin size in pixels.
 * @param settings Unknown object.
 */
declare function loadSkin(url: string, size: number, settings?: object): void;

/**
 * Loads an external ghost skin.
 * @param url Skin URL.
 * @param size The skin size in pixels.
 */
declare function loadGhostSkin(url: string, size: number): void;

/**
 * Loads an external GIF/video skin.
 * @param url Skin URL.
 * @param videoOptions Video options.
 */
declare function loadVideoSkin(url: string, videoOptions: VideoOptions): void;

/**
 * Joins a multiplayer room.
 * @param roomID ID of the room to join.
 */
declare function joinRoom(roomID: string): void;

declare function loadSFX(sfx: SFXsets | VSFXsets, useVoice: 0 | 1): void;

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
  ghostTex: HTMLImageElement;
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
  DASmethod: 0 | 1; // Why isn't this a boolean?
  lockDelayActive: number;
  lockDelayActivated: number | undefined;
  lastAction: number;
  lastGeneration: number;
  /** Specifies, for how long the piece can stay on ground without locking. */
  lockDelay: number;
  /** Specifies, for how long the piece can stay on ground while moving left/right without locking. */
  maxLockDelayWithoutLock: number;
  /** Specifies, for how long the piece can be active. */
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
  /**
   * `0` if the game is focused, `1` otherwise.
   */
  focusState: 0 | 1; // jezevec, why isn't this a boolean?
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
  /** A generator function that generates pseudo-random values between 0 and 1. */
  RNG: AleaPRNG;
  /** A generator function that generates pseudo-random values between 0 and 1. */
  blockRNG: AleaPRNG;
  /** Last 6 digits of a base-36 encoded RNG value. */
  blockSeed: string;
  bigTriggered: boolean;
  bigChance: number;
  interval: number | null;
  animator: LineClearAnimator | null;
  RulesetManager: RulesetManager;
  conf: [object, object];
  /** Refers to `this.conf[0]`. */
  R: Ruleset;
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
  changeSFX(sfx: SFXsets | VSFXsets, useVoice: 0 | 1): void;
  loadSounds(sfx: SFXsets | VSFXsets, prefix: string): void;
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
  setFocusState(newFocusState: 0 | 1): void; // Again, why isn't this a boolean?
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

declare type Randomizer = Bag | Classic | OneBlock | C2Sim | Repeated | BsBlock | BigBlockRand | ConstBlock;

declare interface Ruleset {
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
}

declare type RoomConfig = {
  t?: number;
  p?: boolean;
  n?: string;
  pl?: number;
  m?: number;
  at?: number[];
  ct?: number[];
  gdm?: number;
  gblock?: number;
  rnd?: number;
  bset?: number;
  pr?: number;
  gDelay?: number;
  mess?: number;
  gapW?: number;
  sg?: number;
  hold?: boolean;
  hostStart?: boolean;
  noFW?: boolean;
  sa?: boolean;
  gInv?: boolean;
  as?: number;
  ghost?: number;
  srv?: string;
  cd?: number;
  DAS?: number;
  ARR?: number;
  sl?: number;
  grav?: number;
  ld?: [number, number, number];
  sgpA?: number[];
};

declare class GameCore {
  constructor(isGame: boolean);
  ISGAME: boolean;
  randomizer: Randomizer | null;
  /** A 20 x 10 array specifying blocks in the visible area of the playfield. */
  matrix: number[][];
  /** A 1 x 10 array specifying blocks in the hidden row. */
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
  gamedata: GameData;
  skins: {
    id: number;
    name: string;
    data: string;
    w?: number;
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
  monochromeSkin: string | false;
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
  R: Ruleset;
  DEF: Ruleset;

  randomizerFactory(randomizerID: number, pre_seed: AleaPRNG): Randomizer;
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
  checkAllSpin(pieceID: number): void;
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
  score(scoring: number, multipier: number): void;
  timestamp(): number;
  getComboAttack(combo: number): number;
  deleteFromGarbageQueue(counteredLines: number): void;
  blockOrSendAttack(attack: number, timestamp: number): number | null;
  recordRedbarChange(timestamp: number): void;
  paintMatrixWithColor(blockID: number): void;
  clearMatrix(): void;
  updateQueueBox(): void;
  redrawHoldBox(): void;
  resetGameData(): void;
  random(rangeStart: number, rangeEnd: number): number;
  randomExcept(rangeStart: number, rangeEnd: number, excludedNumber: number): number;
  getGravityLevel(gravityLevel: number): [number, number];
}

/** Defines a playable piece. */
declare class Block {
  constructor(id: number);
  /** The piece ID in a given piece set. */
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
  /** The position of the top-left block of the bounding box of the piece. */
  pos: {
    x: number;
    y: number;
  };
  /**
   * The rotation state of the piece.
   * ```
   * | State 0 | State 1 | State 2 | State 3 |
   * |   []    |   []    |         |   []    |
   * | [][][]  |   [][]  | [][][]  | [][]    |
   * |         |   []    |   []    |   []    |
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
  /** Specifies an action. */
  a: number;
  /** Specifies a timestamp. */
  t: number;
  /** Specifies extra data. */
  d: number | number[];
}

declare class Bag {
  constructor(RNG: AleaPRNG, piecesInPool: number, repeats: number);
  getBlock(): Block;
}

declare class Classic {
  constructor(RNG: AleaPRNG, piecesInPool: number);
  getBlock(): Block;
}

declare class OneBlock {
  constructor(RNG: AleaPRNG, piecesInPool: number, piecesToPick: number, bagsToRoll?: number);
  getBlock(): Block;
}

declare class C2Sim {
  constructor(RNG: AleaPRNG, piecesInPool: number);
  getRandomExcept(excludedNumber: number): number;
  getBlock(): Block;
}

declare class Repeated {
  constructor(bag: Bag, n: number);
  nextSegment(unusedParameter?: any): void;
  getBlock(unusedParameter?: any): Block;
}

declare class BsBlock {
  constructor(bag: Bag, blockSetArray: number[]);
  getBlock(): Block;
}

declare class BigBlockRand {
  constructor(bag: Bag, blockSetArray: number[]);
  getBlock(): Block;
}

declare class ConstBlock {
  constructor(pieceID: number, pieceSet: number);
  getBlock(): Block;
}

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

  get(scoring: number, wasBackToBack: boolean): number;
  lineAtk(scoring: number, combo: number, unknownParameter: object): number;
}

declare class SlotView {
  constructor(canvases: {
    main: HTMLCanvasElement;
    bg: HTMLCanvasElement;
    hold: HTMLCanvasElement;
    queue: HTMLCanvasElement;
  });

  g: Game | null;
  slot: Slot | null;
  readonly MAIN: 0;
  readonly HOLD: 1;
  readonly QUEUE: 2;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  bgCanvas: HTMLCanvasElement;
  bgctx: CanvasRenderingContext2D;
  holdCanvas: HTMLCanvasElement;
  hctx: CanvasRenderingContext2D;
  queueCanvas: HTMLCanvasElement;
  qctx: CanvasRenderingContext2D;
  readonly block_size: 24;
  readonly holdQueueBlockSize: 24;
  drawScale: number;
  isKO: boolean;
  KOplace: number | null;
  QueueHoldEnabled: boolean;
  SEenabled: boolean;
  replaySEset: number;
  tex: HTMLImageElement;
  skinId: number;
  ghostSkinId: number;
  readonly skinWidth: 32;
  redrawBlocked: boolean;
  ghostEnabled: boolean;

  changeSkin(skinIndex: number, monochromeColor?: string): void;
  /** Empty function. */
  loadResources(): void;
  drawBgGrid(): void;
  drawGhostAndCurrent(): void;
  redraw(): void;
  redrawRedBar(): void;
  clearMainCanvas(): void;
  clearHoldCanvas(): void;
  clearQueueCanvas(): void;
  drawBlockOnCanvas(x: number, y: number, blockID: number, canvasType: number, blockSize?: number): void;
  drawBlock(x: number, y: number, blockID: number): void;
  drawGhostBlock(x: number, y: number, blockID: number): void;
  drawRectangle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void;
  drawLine(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number): void;
  paintMatrixWithColor(blockID: number): void;
  updateLiveMatrix(matrix: number[][], redBar: number): void;
  updateTextBar(): void;
  /** Empty function. */
  onCreate(): void;
  onReady(): void;
  onRestart(): void;
  onBlockHold(): void;
  onBlockMove(unusedParameter?: any): void;
  /** Empty function. */
  onFinesseChange(): void;
  onGameOver(): void;
  /**
   * Empty function.
   */
  onBlockLocked(): void;
  /** Empty function. */
  onLinesCleared(): void;
  /** Empty function. */
  onScoreChanged(): void;
  onResized(): void;
  printTextBg(): void;
  printSlotPlace(): void;
  printSlotNotPlaying(): void;
  printSlotKO(): void;
  afterRedraw(): void;
}

declare type GLContextDefinition = {
  elem: HTMLCanvasElement;
  mesh: {
    w: number;
    h: number;
  };
  gl: WebGLRenderingContext;
  globalAlpha: WebGLUniformLocation;
  m4: Float32Array;
  matrixLocation: WebGLUniformLocation;
  positionBuffer: WebGLBuffer;
  positionLocation: number;
  program: WebGLProgram;
  textcoordBuffer: WebGLBuffer;
  texcoordLocation: 1;
  textureMatrixLocation: WebGLUniformLocation;
  textureInfos: {
    width: number;
    height: number;
    texture: WebGLTexture;
  };
  boundBuffers: boolean;
  boundTexture: WebGLTexture | null;
};

/**
 * Options used for the video skin.
 * All options are optional.
 */
declare type VideoOptions = {
  /** Specifies whether the skin video is muted or not. */
  sound?: boolean;
  /** Makes the skin video visible. */
  debug?: boolean;
  /** Turns a video into a fully-fledged skin. */
  skinify?: boolean;
  /** Whether the video will be tinted to match guideline block colors or not. */
  colorize?: boolean;
  /** Specifies the intensity of video tint. */
  colorAlpha?: number;
};

declare class WebGLView {
  constructor(game: Game);
  g: Game;
  ctxs: GLContextDefinition[];
  readonly MAIN: 0;
  readonly HOLD: 1;
  readonly QUEUE: 2;
  readonly NAME: "webGL";
  readonly colorsInTexture: [9, 8, 1, 2, 3, 4, 5, 6, 7];
  readonly shaders: {
    vertex: string;
    fragment: string;
  };
  videoSkin: boolean;
  video: HTMLVideoElement | null;

  isAvailable(): boolean;
  initGLContext(ctx: GLContextDefinition): void;
  initRenderer(): void;
  initRedbarTexture(ctx: GLContextDefinition, id: number): void;
  initEmptyTexture(ctx: GLContextDefinition, id: number): void;
  loadTexture(id: number, source: string): void;
  drawImage(
    ctx: GLContextDefinition,
    texture: WebGLTexture,
    textureWidth: number,
    textureHeight: number,
    sourceX: number,
    sourceY: number,
    destWidth: number,
    destHeight: number,
    destX: number,
    destY: number,
    scaleX: number,
    scaleY: number
  ): void;
  redrawMatrix(): void;
  clearMainCanvas(): void;
  clearHoldCanvas(): void;
  clearQueueCanvas(): void;
  drawBlockOnCanvas(x: number, y: number, blockID: number, ctxID: number): void;
  drawBrickOverlayOnCanvas(x: number, y: number, ctxID: number): void;
  drawBrickOverlay(x: number, y: number, isGhost: boolean): void;
  drawBlock(x: number, y: number, blockID: number, ctxID: number): void;
  drawGhostBlock(x: number, y: number, blockID: number): void;
  redrawRedBar(redBar: number): void;
  drawClearLine(row: number, alpha: number): void;
  setAlpha(alpha: number): void;
  clearRect(startX: number, startY: number, endX: number, endY: number): void;
  setupGif(URL: string, videoOptions: VideoOptions): void;
  realSetupGif(URL: string): void;
  updateGifTexture(ctx: CanvasRenderingContext2D, source: string): void;
  setupVideo(URL: string, videoOptions: VideoOptions): void;
  updateTexture(textureInfo: number): void;
  updateTextureFromElem(textureInfo: number, video: HTMLVideoElement, videoWidth: number, videoHeight: number): void;
  createFastFont(): FastFont;
}

declare class Ctx2DView {
  constructor(game: Game);
  g: Game;
  readonly MAIN: 0;
  readonly HOLD: 1;
  readonly QUEUE: 2;
  readonly NAME: "2d";
  ctx: CanvasRenderingContext2D;
  hctx: CanvasRenderingContext2D;
  qctx: CanvasRenderingContext2D;

  isAvailable(): true;
  initRenderer(): void;
  redrawMatrix(): void;
  clearMainCanvas(): void;
  clearHoldCanvas(): void;
  clearQueueCanvas(): void;
  drawBlockOnCanvas(x: number, y: number, blockID: number, ctxID: number): void;
  drawBrickOverlayOnCanvas(x: number, y: number, ctxID: number): void;
  drawBrickOverlay(x: number, y: number, isGhost: boolean): void;
  drawBlock(x: number, y: number, blockID: number): void;
  drawGhostBlock(x: number, y: number, blockID: number): void;
  drawRectangle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void;
  drawLine(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number): void;
  redrawRedBar(redBar: number): void;
  drawClearLine(row: number, alpha: number): void;
  setAlpha(alpha: number): void;
  clearRect(startX: number, startY: number, endX: number, endY: number): void;
  createFastFont(): FastFont2D;
}

interface TeamData {
  [teamNumber: number]: { color: string; name: string; APMsum: number };
}

declare class GameSlots {
  constructor(game: Game);
  p: Game;
  gsDiv: HTMLDivElement;
  chatBox: HTMLDivElement;
  chatArea: HTMLDivElement;
  chatExp: HTMLDivElement;
  resultsBox: HTMLDivElement;
  lobbyBox: HTMLDivElement;
  w: number;
  h: number;
  slotHeight: number;
  matrixHeight: number;
  slotWidth: number;
  matrixWidth: number;
  zoom: number;
  isFullscreen: boolean;
  forceExtended: boolean;
  slotStats: boolean;
  cidSlots: {};
  nameFontSize: number;
  nameHeight: number;
  redBarWidth: number;
  slots: [];
  targetSlotId: number;
  shownSlots: number;
  readonly extendedView: [1, 2, 4];
  isExtended: boolean;
  extendedAvailable: boolean;
  skinOverride: boolean;
  readonly baseSize: {
    playersW: 450;
    playersH: 450;
    gameFrame: 1091;
  };
  rowCount: number;
  liveBlockSize: number;
  holdQueueBlockSize: number;
  readonly blocksY: 20;
  chatExpanded: boolean;
  resultsShown: boolean;
  teamTags: HTMLDivElement[];
  readonly tagHeight: 20;
  teamData: TeamData | null;
  /** Stores CIDs of team members. */
  teamMembers: {
    0: number[];
    1: number[];
  };

  setZoom(zoomPercent: number): void;
  fullScreen(isFullscreen: boolean): void;
  numRows(players: number): number;
  nmob(unknownParameter: number): number;
  swapSlot(slot1: number, slot2: number): void;
  mvSlot(slot1: number, slot2: number): void;
  shrink(): number;
  teamOfSlot(slot: number): string;
  teamOfCid(CID: number): string;
  autoScale(): void;
  hideTags(): void;
  updateTeamNames(teamData: TeamData): void;
  initTeamTag(team: number, offsetLeftPx: number, offsetTopPx: number, unknownParameter: number): void;
  tsetup(teamSizeArray: number[]): void;
  setup(unknownParameter: number, secondFire?: boolean): void;
  chatMaxH(): number;
  resizeElements(): void;
  resetAll(): void;
  reset(): void;
  setTarget(slot: number): void;
  CID(CID: number): number;
  getSlot(CID: number, team: number): true;
  chatExpand(): void;
  scrollChatDown(): void;
}

declare class Slot {
  constructor(id: number, x: number, y: number, gameSlots: GameSlots);
  gs: GameSlots;
  id: number;
  cid: number;
  x: number;
  y: number;
  pCan: HTMLCanvasElement;
  bgCan: HTMLCanvasElement;
  holdCan: HTMLCanvasElement;
  queueCan: HTMLCanvasElement;
  name: HTMLSpanElement;
  slotDiv: HTMLDivElement;
  stageDiv: HTMLDivElement;
  stats: SlotStats;
  v: SlotView;

  init(): void;
  clear(): void;
  vacantClear(): void;
  hide(): void;
  setName(name: string): void;
  setIsTargetted(isTargetted: boolean): void;
}

declare class SlotStats {
  constructor(slot: Slot, gameSlots: GameSlots);
  slot: Slot;
  gs: GameSlots;
  statsDiv: HTMLDivElement;
  pps: HTMLSpanElement;
  apm: HTMLSpanElement;
  ppsTitle: HTMLSpanElement;
  apmTitle: HTMLSpanElement;
  winCounter: HTMLSpanElement;

  init(): void;
  disable(): void;
  update(PPS: number, APM: number): void;
}

declare type SoundDefinition = { id: string; vol: number };

declare class SoundQueue {
  constructor();
  playingSound: null;
  queue: SoundDefinition[];

  add(sound: string, volume: number): void;
  stop(): void;
  private _playTask(soundDefinition: SoundDefinition): void;
  private _next(): void;
}

declare class LineClearAnimator {
  constructor(matrix: number[][], clearPositions: number[], game: GameCore);
  g: GameCore;
  matrix: number[][];
  clearPositions: number[];
  clearDelay: number;
  t: number;
  readonly IS_SOLID: true;

  render(timeDelta_ms: number): void;
  finished(): void;
}

declare class RulesetManager {
  constructor(game: Game);
  p: Game;
  modeMenu: HTMLDivElement;
  DEF: Ruleset;
  pmodeRuleId: number;
  readonly RULE_KEYS: {
    cd: "clearDelay";
    rnd: "rnd";
    pr: "showPreviews";
    hold: "holdEnabled";
    bbs: "baseBlockSet";
    grav: "gravityLvl";
    ld: "lockDelay";
    mess: "mess";
    gapW: "gapW";
    gInv: "gInv";
    gDelay: "gDelay";
    gblock: "gblock";
    tsdOnly: "tsdOnly";
    as: "allSpin";
    sl: "speedLimit";
    sm: "scoreMult";
    ghost: "ghost";
    DAS: "DAS";
    ARR: "ARR";
    cl: "clearLines";
    sfx: "sfx";
    vsfx: "vsfx";
    sa: "solidAttack";
    ext: "ext";
    sgpA: "sgProfile";
  };
  readonly PRESET_KEYS: {
    clearDelay: "clearDelay";
    rndSel: "rnd";
    prSel: "showPreviews";
    hasHold: "holdEnabled";
    blocksSel: "baseBlockSet";
    gravityLvl: "gravityLvl";
    lockDelay: "lockDelay";
    mess: "mess";
    gapW: "gapW";
    gInv: "gInv";
    garbageDelay: "gDelay";
    gblockSel: "gblock";
    tsdOnly: "tsdOnly";
    allSpin: "allSpin";
    speedLimit: "speedLimit";
    scoreMult: "scoreMult";
    ghost: "ghost";
    DAS: "DAS";
    ARR: "ARR";
    clearLines: "clearLines";
    sfx: "sfx";
    vsfx: "vsfx";
    solidAtk: "solidAttack";
    sgProfile: "sgpA";
  };
  readonly RULESETS: {
    id: number;
    /** Defines the difficulty level of the ruleset. */
    lvl: number;
    /** The name of the ruleset. */
    name: string;
    /** Mode key. */
    key: string;
    /** The mode description. */
    desc: string;
    /** Extra rules applied to the ruleset. Keys used here are from `PRESET_KEYS` property. */
    c: {};
  }[];
  readonly MODES: {
    id: number;
    n: string;
    modes: {
      id: number;
      n: string;
      fn: string;
      rs: number[];
    }[];
  }[];

  combo: HTMLDivElement | null;
  isOpen: boolean;
  rs1: HTMLDivElement;

  fullModeName(mode: number, submodeOrID: number): string;
  adjustToValidMode(mode: number, submode: number): boolean | void;
  setActiveMode(mode: number): void;
  updateModeMenu(): void;
  /**
   * Changes the game ruleset.
   * @param rulesetID - The ruleset ID.
   * @param {boolean} [shouldAdjustToValidMode=true] Whether the mode should be adjusted to a valid one. Defaults to `true` if not provided.
   */
  ruleSetChange(rulesetID: number, shouldAdjustToValidMode?: boolean): void;
  createOptions(): void;
  closeCombo(event: Event): true;
  toggleCombo(event: Event, elementToAppendTo: HTMLElement): void;
  registerCombo(): void;
  /** Empty function. */
  afterRuleChange(ruleset: Ruleset): void;
  forceApplyChanges(ruleset: Ruleset): void;
  /**
   * Applies rule changes to the ruleset.
   * @param ruleChange The object contatining rules to change.
   * @param ruleset The ruleset which should be changed.
   * @param {boolean} [pullFromDefinition=true] Whether the rules should be pulled from the default definition. Defaults to `true` if not provided.
   */
  applyRule(ruleChange: object, ruleset: Ruleset, pullFromDefinition?: boolean): void;
  /**
   * Applies rule changes from the preset to the ruleset.
   * @param ruleChange The object contatining rules to change.
   * @param ruleset The ruleset which should be changed.
   * @param {boolean} [pullFromDefinition=true] Whether the rules should be pulled from the default definition. Defaults to `true` if not provided.
   * @returns Object containing changed rules.
   */
  applyPresetRule(ruleChange: object, ruleset: Ruleset, pullFromDefinition?: boolean): object;
  /**
   * Adds/Changes rules to/in a specified ruleset.
   * @param rulesToAppend The object contatining rules to add/change.
   * @param ruleset The ruleset which should be changed.
   */
  appendRule(rulesToAppend: object, ruleset: Ruleset): void;
}

declare class Settings {
  constructor(game: Game);
  p: Game;
  box: HTMLDivElement;
  touchEnabledBox: HTMLInputElement;
  soundEnabledBox: HTMLInputElement;
  DMsoundBox: HTMLInputElement;
  SEEnabledBox: HTMLInputElement;
  VSEEnabledBox: HTMLInputElement;
  sfxSelect: HTMLSelectElement;
  vsfxSelect: HTMLSelectElement;
  SEStartEnabledBox: HTMLInputElement;
  SErotateEnabledBox: HTMLInputElement;
  SEFaultEnabledBox: HTMLInputElement;
  monoColorInp: HTMLInputElement;
  statOptId: HTMLDivElement;
  settingBoxes: HTMLInputElement[];
  settingsSaveBtn: HTMLButtonElement;
  settingsResetBtn: HTMLButtonElement;
  mainDiv: HTMLDivElement;
  moreSkins: object | null;
  skinsLoaded: boolean;
  inputBoxes: HTMLInputElement[]; // I wonder where previously was a variable that was an array of HTMLInputElements 🤔
  webGlStartFailed: boolean;
  readonly BAN_ARTIFACT_KEY: "room3";
  mc: Hammer;
  preventZoomHandler: (event: Event) => void;
  touchActuallyUsed: boolean;
  monochromePicker: CP;
  gamepadFound: boolean;
  statGameModeSelect: HTMLSelectElement;
  statCheckboxes: HTMLInputElement[];

  // These properties are added later on
  ARR: number;
  DAS: number;
  DAScancel: 0 | 1;
  DMsound: boolean;
  SFXsetID: number;
  VSFSsetID: number;
  controls: Controls;

  init(): void;
  applyDefaults(): void;
  openSettings(): void;
  addSkins(): void;
  loadMoreSkins(): void;
  reloadCanvases(): void;
  closeSettings(): void;
  onStatGameModeChange(event: KeyboardEvent): void;
  onStatCheckboxChange(checkboxID: number): void;
  updateStatsOptionsId(): void;
  startCtx2D(): void;
  startWebGL(shouldReloadCanvases?: boolean): void;
  setBanArtifact(banArtifact: string): void;
  getBanArtifact(): string | null;
  removeBanArtifact(): void;
  resetSettings(): void;
  setDAS(DASms: number): void;
  setARR(ARRms: number): void;
  handleKeyDown(keyCode: number, keyIndex: number): void;
  setControlKey(keyIndex: number, keyCode: number): void;
  loadFromJson(json: object): void;
  cookiePrefOnly(): void;
  tryToLoadControlsFromCookie(): void;
  sendSettings(): void;
  postSettings(stringifiedJson: string): void;
  onGameStart(): void;
  onGameEnd(): void;
  volumeChange(volumePercent: number): void;
  touchActionVal(): "none" | "auto";
  touchUsed(): void;
  setTouchControls(touchControlsEnabled: 0 | 1): boolean | void;
  /** Despite the name, it sets an appropriate field in local storage. */
  setCookie(key: string, value: string): void;
  /** Despite the name, it gets an appropriate field from local storage. */
  getCookie(key: string): string;
  /** Despite the name, it removes an appropriate field from local storage. */
  removeCookie(key: string): void;
  onControlKeySet(i: number, event: KeyboardEvent): void;
  setGrid(gridMode: number): void;
  /** Displays a prompt that allows the user to insert the DAS value in frames (just like NullpoMino does), and converts the value to milliseconds. */
  nullpoDAS(): void;
  setupSwipeControl(): void;
  clearAllCookies(): void;
  clearRealCookies(): void;
  preventZoom(event: Event): void;
  registerColorPicker(): CP;
  initGamePad(event: GamepadEvent): void;
  removeGamePad(event: GamepadEvent): void;
  processGamepad(): void;
  getKeyName(keyCode: number): string;
}

declare class GameCaption {
  constructor(stage: HTMLDivElement);
  parent: HTMLDivElement;
  captions: object;
  readonly SPECTATOR_MODE: 1;
  readonly OUT_OF_FOCUS: 2;
  readonly READY_GO: 3;
  readonly GAME_PLACE: 4;
  readonly SPEED_LIMIT: 5;
  readonly MAP_LOADING: 6;
  readonly NEW_PERSONAL_BEST: 7;
  readonly LOADING: 8;
  readonly RACE_FINISHED: 9;
  readonly GAME_WARNING: 10;
  readonly MODE_INFO: 11;
  readonly MODE_COMPLETE: 12;
  readonly PAUSED: 13;
  readonly BUTTON: 14;
  speedTimout: number | null;

  create(): HTMLDivElement;
  hide(captionType: number): void;
  hideExcept(captionType: number): void;
  spectatorMode(): void;
  outOfFocus(topOffsetOverride?: number): void;
  readyGo(state: 0 | 1): void;
  modeInfo(text: string, options: { t: 0 | 1 }): void;
  modeComplete(isPlaylistEnd: 0 | 1): void;
  paused(options: { skip: boolean; sec: number }): void;
  mapLoading(isUsermode?: undefined | 1): void;
  button(options: { handler: VoidFunction }): void;
  gamePlace(game: Game): void;
  speedWarning(PPSlimit: number): void;
  private _fadeOut(caption: HTMLDivElement, timeoutMs: number, transitionTimerSec?: number, opacity?: number): void;
  newPB(PBinfo: PersonalBestInfo | boolean): void;
  /**
   * Displays a loading caption.
   * @param captionText Caption text.
   * @param imageType Image type: `1` for a cross, `2` for a trollface, animated spinner if not provided.
   */
  loading(captionText: string, imageType?: undefined | 1 | 2): void;
  liveRaceFinished(): void;
  gameWarning(warningTitle: string, warningDescription?: string, options?: { fade_after?: number }): void;
}

interface Servers {
  [serverID: string]: {
    /** The server's URL. */
    h: string;
    /** The server's name. */
    n: string;
    /** The server's port. */
    p: string;
    /** The server scheme. */
    s: string;
  };
}

interface Clients {
  [cid: number]: Client;
}

declare type Client = {
  /** Whether the user is registered or not. (?) */
  auth: boolean;
  /** The client's CID. */
  cid: number;
  /** Nickname color, if set. */
  color: string | null;
  /** Openmoji Supporter icon (applied only when `type` is `999`). */
  icon: string | null;
  /** Whether the user is a moderator. Potentially only `true` when the player is a moderator. */
  mod: boolean;
  /** The client's nickname. */
  name: string;
  /** The replay played live, or `null` if the player is not playing. */
  rep: Replayer | null;
  /** Specifies the role (Champion, Moderator, Supporter) and client's icon. */
  type: number;
};

declare type LobbyList = {
  /** Standard rooms. */
  s: object[];
  /** Custom rooms. */
  c: object[];
  /** Overflow rooms. */
  o: object[];
  /** Guest rooms. */
  g: object[];
  /** Spectate only rooms. */
  l: object[];
  /** Unknown. Private rooms maybe? */
  p: object[];
};

declare type Limits = {
  /** 10-game APM minimum and maximum */
  apm?: [min: number | null, max: number | null];
  /** Live gametime (in hours) minimum and maximum */
  gt?: [min: number | null, max: number | null];
  /** Sprint 40L PB minimum and maximum */
  sub?: [min: number | null, max: number | null];
};

declare type RoomDetails = {
  /** Player count. */
  c: number;
  /** */
  s: number;
  /** Room ID. */
  id: string;
  /** Room name. */
  n: string;
  /** Room mode (modes not starting with "Live"). */
  mo: number;
  /** Room mode (modes starting with "Live"). */
  pm: number;
  /** Lifetime games played. */
  g: number;
  /** Room speed limit (in PPS) - `0` if no speed limit is set. */
  sl: number;
  /** Maximum number of users in a room - `24` or more is treated as no limit. */
  m: number;
  /** Waiting, perhaps? */
  w?: number;
  /** */
  d: {
    /** The server the given room is on. */
    s: string;
    /** Restrictions that prevent certain users from joining */
    lock?: Limits;
  };
  det: RoomFurtherDetails;
  /** */
  tr?: number;
  /** Whether the room is locked or not. */
  l?: number;
};

declare type RoomDetails2 = {
  /** Information about room join limits. */
  l?: {
    /** Whether the player is eligible to play in the room. */
    r?: boolean;
    /** Limits imposed on the room. */
    l?: Limits;
    /** Player's current stats. */
    s?: {
      /** The player's 10-game APM average. */
      apm: number;
      /** The player's total Live playtime. */
      gt: number;
      /** The player's 40L Sprint PB. */
      sub: number;
    };
  };
  /** Information about players in the room. */
  p: {
    /** Current amount of registered players in the room. */
    c: number;
    /** Current amount of guests in the room. */
    g: number;
    /** More detailed information about players in the room. */
    p: PlayerDetails;
    /** Current amount of spectators in the room. */
    s: number;
  };
  /** Room ID. */
  r: string;
  /** Settings modified from defaults. */
  s: RoomConfig;
  /** Max amount allowed? */
  t: number;
};

declare type PlayerDetails = {
  /** The player's nickname. */
  n: string;
  /** The player's color, if set in Supporter settings. */
  col?: string;
  /** The player's Supporter tier. */
  ti?: number;
  /** The player's icon set as Supporter. */
  icn?: number;
  /** Player role and icon. */
  type?: number;
}[]

declare type RoomFurtherDetails = {
  /** */
  p: {
    /** */
    c: number;
    /** */
    p: {
      /** Player nickname */
      n: string;
      /** Player role and icon */
      type?: number;
      /** */
      ti?: number;
    };
    /** */
    g: number;
    /** Room config */
    s: RoomConfig;
    l: null;
  };
};
// TODO
declare type ResultsList = object;
declare type TeamResultsList = object;

declare class Live {
  constructor(game: Game);
  version: string;
  serverScheme: string;
  tryProxy: number;
  server: string;
  port: number;
  authorized: boolean;
  authReady: boolean;
  connected: boolean;
  sitout: boolean;
  socket: WebSocket | null;
  p: Game;
  /** The user's CID. */
  cid: number;
  conAttempts: number;
  readonly MAX_CONN_ATTEMPTS: 2;
  /** The user's Supporter tier, `0` if the user is not a Supporter. */
  sTier: number;
  isProxy: boolean;
  servers: Servers | null;
  serverId: string;
  joinRemote: {
    rid: string;
    sess: string;
    srvId: string;
    t: number;
    ts: number;
  } | null;
  createRoomRequest: RoomConfig | null;
  connectionTimeout: number | null;
  wasConnected: boolean;
  clients: Clients;
  /** Array of CIDs of players. */
  players: number[];
  /** Unkown - this is empty even in a bot match. */
  bots: any[];
  /** Array of CIDs of **registered** players. */
  authList: number[];
  places: {
    [cid: number]: number;
  };
  /** Array of CIDs of players who are **not playing**. */
  notPlaying: number[];
  /** Room ID. */
  rid: string;
  rc: number;
  /** The values of this object are CIDs */
  rcS: {
    [unknownKey: number]: number;
  };
  roomConfig: RoomConfig | null;
  gid: number | string;
  lastGameId: string;
  currentTarget: number;
  winnerCID: number;
  iAmHost: number;
  xbufferEnabled: number;
  xbuffer: object;
  urlPlayParamApplied: boolean;
  msgCount: number;
  chatBox: HTMLDivElement;
  friendsBox: HTMLDivElement;
  chatArea: HTMLDivElement;
  friendsBtn: HTMLDivElement;
  chatInput: HTMLInputElement;
  chatInputArea: HTMLDivElement;
  chatButton: HTMLButtonElement;
  resetButton: HTMLButtonElement;
  resetProgress: HTMLSpanElement;
  teamOptions: HTMLDivElement;
  tsArea: HTMLDivElement;
  myTeam: HTMLDivElement;
  resultsBox: HTMLDivElement;
  resultsContent: HTMLDivElement;
  moreResults: HTMLDivElement;
  moreData: HTMLDivElement;
  saveLink: HTMLAnchorElement;
  moreVisible: boolean;
  statsSent: boolean;
  lobbyVisible: boolean;
  lobbyInfoShown: boolean;
  chatAtBottom: boolean;
  lobbyBox: HTMLDivElement;
  lobbyContent: HTMLDivElement;
  refreshLobbyButton: HTMLButtonElement;
  RoomInfo: RoomInfo;
  editRoomButton: HTMLButtonElement;
  createRoomDialog: HTMLDivElement;
  roomNameInput: HTMLInputElement;
  roomName: string | null;
  isPrivateInput: HTMLInputElement;
  /** The player's nickname used in chat. */
  chatName: string;
  /** No idea. */
  roomJoinTimes: object;
  LiveGameRunning: boolean;
  liveMode: number;
  pingSent: number;
  emoteAutocomplete: ChatAutocomplete;
  nameAutocomplete: ChatAutocomplete;
  sessX: string;
  hostStartMode: boolean;
  noFourWide: 0 | 1;
  solidAfter: boolean;
  liveSeed: string;
  /** Map ID for the live Map Room. */
  liveMap: number | null;
  livePmodeTypes: [mode: number, submode: number];
  team: string | null;
  teamSwitchDisabled: boolean;
  teamButtons: {
    [teamNumber: number]: HTMLButtonElement;
  };
  gdm: number;
  readonly gdms: ["targets", "divide", "toAll", "toLeast", "toMost", "toSelf", "random", "roulette"];
  gDelay: number;
  sgProfile: number;
  playingOfflineWarningShown: boolean;
  loadMapForOpponents: boolean;
  Friends: Friends;

  adjustForCustomLayout(): void;
  /** (*sic!*)  Toggles the visibility of the lobby list. */
  toggleLobbby(lobbyMenuVisible?: boolean): void;
  initEmoteSelect(emoteObject: object): void;
  toggleMore(): void;
  /** (*sic!*)  Refreshes the lobby list. */
  refreshLobbby(lobbyMenuVisible?: boolean): void;
  saveRD(): void;
  switchRDmode(moreSettingsState: 0 | 1 | 2): void;
  onPresetChange(): void;
  useCustomPreset(): void;
  showRoomDialogForEdit(): void;
  showRoomDialog(): void;
  closeRoomDialog(): void;
  clearRoomForm(): void;
  clearLimitsForm(): void;
  getFilledLimits(): false | (number | null)[] | null;
  setDefaultRule(): void;
  /**
   * Switches the simple attack selection:
   * - 0: Tetris Friends:
   *   - Attack Table: `[0,0,1,2,4,4,6,2,0,10,1]`
   *   - Combo Table: `[0,0,1,1,1,2,2,3,3,4,4,4,5]`
   * - 1: Tetris Online Japan:
   *   - Attack Table: `[0,0,1,2,4,4,6,2,1,9,1]`
   *   - Combo Table: `[0,0,1,1,2,2,3,3,4,4,4,5,5]`
   * - 2: No spins:
   *   - Attack Table: `[0,0,1,2,4,1,2,0,0,10,1]`
   *   - Combo Table: `[0,0,1,1,1,2,2,3,3,4,4,4,5]`
   */
  attackSelect(): void;
  applyPreset(preset: object): void;
  makeRoomWrapper(): void;
  makeRoom(isEdit: boolean): void;
  joinRoom(roomID: string): void;
  onOpen(event: Event): void;
  authorize(response: object): void;
  getAuthorizedNameLink(clientName: string, clientType: number, client: Client): string;
  getName(CID: number, returnRawName?: boolean): string;
  forgetRoomPlayers(): void;
  createPrivatePracticeRoom(unknownParameter?: boolean): void;
  onCIDassigned(): void;
  readSpecs(response: object, unknownParameter: boolean): void;
  chatJoiningInfoEnabled(CID: number): boolean;
  showMessageAboutJoin(CID: number, hasSo: boolean): void;
  updateConnectionInfo(): void;
  handleResponse(response: object): void;
  applyConfig(response: object): void;
  updateTeamData(teamData: TeamData): void;
  teamSwitch(teamNumber: number): void;
  startLocalBotPractice(): void;
  tryPlayParam(): boolean;
  onRoomJoined(roomID: string, isPrivate: boolean, roomName: string): void;
  displayLobby(lobbyList: LobbyList): void;
  setupLobbyHandlers(): void;
  resetWinCounter(): void;
  displayResults(resultsList: ResultsList, displayFullStats: boolean): void;
  displayTeamResults(teamResultsList: TeamResultsList): void;
  resolveMention(response: object): string;
  chatMajorWarning(warningHTML: string, CSSclass?: string, options?: { closable: boolean }): void;
  getChatLineClassesFor(CID: number): ["infoChl"] | null;
  /**
   * Shows a message in chat.
   * @param boldText Bold text, usually a nickname.
   * @param textOrDiv Text or a `<div>` element to display.
   * @param CSSclasses Additionall CSS classes to use.
   */
  showInChat(boldText: string, textOrDiv?: string | HTMLDivElement, CSSclasses?: object): void;
  scrollOnMessage(forceScrollDown?: boolean): void;
  /** Removes chat messages if there are over 120 of them already. */
  clearOldChatIfNeeded(): void;
  showInLobbyChat(response: object): void;
  getGameSlot(CID: number, rc: number, team: number): boolean;
  onMessage(message: object): void;
  decodeActionsAndPlay(replayData: number[], bits: number): void;
  updateLiveMatrixViaSnapshot(rc: number, redBar: number, matrix: number[][]): void;
  onClose(event: Event): void;
  useProxy(): void;
  changeServer(): void;
  connect(): void;
  parseBinaryMatrix(unknownParameter: string, trueHeight: number): number[][];
  sendReplayConfig(): void;
  sendRepFragment(unknownParameter1: number[], unknownParameter2: boolean): void;
  sendSnapshot(matrix: number[][]): void;
  safeSend(data: string | ArrayBufferLike | Blob | ArrayBufferView): boolean;
  sendStats(): void;
  sendRestartEvent(): void;
  sendGameOverEvent(): void;
  showTargetOnSlot(slot: number): void;
  hideResults(): void;
  beforeReset(): void;
  onReset(): void;
  changeTarget(): void;
  /**
   * Sends lines to the targetted opponent.
   * @param attack Base attack generated by the line clear.
   * @param comboAttack Additional attack sent by combo.
   * @param scoringOptions Additional scoring options.
   */
  sendAttack(attack: number, comboAttack: number, scoringOptions: { type: number; b2b: boolean; cmb: number }): void;
  /**
   * Sends lines to the targetted opponent.
   * @deprecated Unused in Jstris.
   * @param attack Attack to send.
   */
  sendAttackOld(attack: number): void;
  /**
   * Sends lines to the specified slot.
   * @deprecated Unused in Jstris.
   * @param slot Slot to attack.
   * @param attack Attack to send.
   */
  sendAttackToSlot(slot: number, attack: number): void;
  setChatName(name: string): void;
  spectatorMode(mode?: number): void;
  spectatorModeOff(mode?: number): void;
  onGameEnd(): void;
  onReplaySaved(replayResponse: ReplayResponse): void;
  setResetButton(disabled: boolean): void;
  replayInfoToChat(replayID: number, mode: number, submode: number): void;
  getLeaderboardLink(mode: number, submode: number): string;
  sendPracticeModeStarting(): void;
  sendGameModeResult(replay: Replay): void;
  raceCompleted(): void;
  setXbuffer(bufferLevel: number, verbose: boolean): void;
  shouldWait(response: object): boolean;
  setResetProgress(delaySec: number): void;
  onChatScroll(event: Event): void;
  removeScrollButton(): void;
  sendChat(rawMessage: string): void;
  showModListOfRooms(responseData: object): void;
  showOfflineWarning(): void;
  getParameterByName(parameterName: string): string;
  showClass(classSelector: string, newVisibilityState?: boolean): void;
}

declare class Replay {
  readonly Action: {
    MOVE_LEFT: 0;
    MOVE_RIGHT: 1;
    DAS_LEFT: 2;
    DAS_RIGHT: 3;
    ROTATE_LEFT: 4;
    ROTATE_RIGHT: 5;
    ROTATE_180: 6;
    HARD_DROP: 7;
    SOFT_DROP_BEGIN_END: 8;
    GRAVITY_STEP: 9;
    HOLD_BLOCK: 10;
    GARBAGE_ADD: 11;
    SGARBAGE_ADD: 12;
    REDBAR_SET: 13;
    ARR_MOVE: 14;
    AUX: 15;
  };
  readonly AUX: {
    AFK: 0;
    BLOCK_SET: 1;
    MOVE_TO: 2;
    RANDOMIZER: 3;
    MATRIX_MOD: 4;
    WIDE_GARBAGE_ADD: 5;
  };
  AuxBits: number[];
  config: {
    v: number;
    softDropId: number | undefined;
    gameStart: number | undefined;
    gameEnd: number | undefined;
    seed: string | undefined;
    m: number | undefined;
    bs: number | undefined;
    se: number | undefined;
    das: number | undefined;
    arr: number | undefined;
  };
  actions: number[];
  string: string;
  md5: string;
  mode: number;
  isAfkMode: boolean;
  afkQueue: any[];
  stream: ReplayStream;
  /** Bound to {@link Live.onReplaySaved | `Live.onReplaySaved(replayResponse)`} with `this` object being the `Live` instance. */
  onSaved: (replayResponse: ReplayResponse) => void | null;
  /** Bound to {@link Game.onMove | `Game.onMove(replayResponse)`} with `this` object being the `Game` instance. */
  onMoveAdded: (replayAction: ReplayAction) => void | null;

  add(replayAction: ReplayAction): void;
  clear(): void;
  toggleAfkMode(isAfk: boolean, timestamp?: number): void;
  /**
   *
   * @returns The MD5 hash of the replay.
   */
  getData(): string;
  pushEndPadding(): void;
  /**
   * @returns A base64-encoded replay string.
   */
  getBlobData(): string;
  /**
   * @returns Total game time (in seconds).
   */
  getGameTime(unknownParameter: boolean): number;
  postLiveData(gameID: number, CID: number, unusedParameter: Live): void;
  ver(live: Live): string;
  postData(id: number, live: Live): void;
  uploadError(live: Live, message: string): void;
  hasUserInputs(): boolean;
}

declare class ReplayStream {
  constructor();
  data: number[];
  datapos: number;
  bitpos: number;
  wordSize: number;
  byte: number;

  pushBits(unknownParameter1: number, unknownParameter2: number): void;
  pullBits(unknownParameter: number): number | null;
}

declare class MapManager {
  constructor(game: Game);
  p: Game;
  /** Function that specifies what to do when the map is ready. */
  onMapReady: (() => void) | null;
  mapId: number | null;
  matrix: number[][];
  mapData: object;
  lowestMapLine: number | null;
  mapLines: number[];
  readonly FINISH_STANDARD: 0;
  readonly FINISH_BY_PC: 1;
  readonly STATE_NEW: 0;
  readonly STATE_PUBLISHED: 1;

  emptyMatrix(): void;
  /**
   * Displays a map loading error alert, and then starts Practice mode.
   * @param message The error message to show.
   */
  mapFetchError(message: string): void;
  parseMatrix(matrixBase64: string): void;
  lineCleared(row: number): void;
  getLowestMapLine(unusedParameter?: any): void;
  parseMapData(): void;
  loadMap(): void;
  prepare(mapID?: number): void;
}

declare class ModeManager {
  constructor(game: Game);
  p: Game;
  onReady: () => void | null;
  modeId: number | null;
  modeData: object;
  lowestMapLine: number | null;
  mapLines: number[];
  goalInfo: HTMLDivElement;
  modeBtns: HTMLDivElement;
  timesPlayed: object;
  soundCache: object;
  skinCache: object;
  startingTimeout: number | null;
  unpauseHandler: () => void | null;
  nextModeHandler: () => void | null;
  components: object;
  vars: object;
  eventTriggers: object;
  timeTriggers: any[];
  initTrigger: ModeTrigger;
  initTriggerFirst: ModeTrigger;
  afterTrigger: ModeTrigger;
  totalRuns: number;
  preventedKeys: number[];
  totalTriggers: number;
  usedTriggers: number;
  fail: boolean;
  isFinished: boolean;
  noQueueRefill: boolean;
  skinWasChanged: boolean;
  lastAttackGarbageColumn: number;
  mathEvaluate: (expression: string | string[]) => any | null;
  readonly FINISH_STANDARD: 0;
  readonly FINISH_BY_PC: 1;
  readonly STATE_NEW: 0;
  readonly STATE_LOCKED: 1;
  readonly STATE_PUBLISHED: 2;
  readonly STATE_PUBLISHED_UNLISTED: 3;
  readonly BLOCK: 3;
  readonly LINE: 4;
  readonly LINECLEAR: 5;
  readonly KEYDOWN: 12;
  readonly KEYUP: 13;
  readonly statID: {
    blocks: 1;
    finesse: 2;
    kpp: 3;
    sent: 4;
    tspins: 5;
    combo: 6;
    PC: 7;
    TSD: 8;
    time: 9;
    APM: 10;
    PPS: 11;
    VS: 12;
    garbage: 13;
    hold: 14;
    B2B: 15;
    wasted: 16;
    lines: 17;
    maxCombo: 18;
    single: 19;
    double: 20;
    triple: 21;
    jstris: 22;
    score: 23;
    redbar: 24;
    inputs: 25;
  };
  /** Piece names used for Queue component. */
  readonly blockNames: {
    I: [0, 0];
    O: [0, 1];
    T: [0, 2];
    L: [0, 3];
    J: [0, 4];
    S: [0, 5];
    Z: [0, 6];
    BI: [2, 0];
    BO: [2, 1];
    BT: [2, 2];
    BL: [2, 3];
    BJ: [2, 4];
    BS: [2, 5];
    BZ: [2, 6];
    I5: [4, 0];
    V5: [4, 1];
    T5: [4, 2];
    U5: [4, 3];
    W5: [4, 4];
    X5: [4, 5];
    J5: [4, 6];
    L5: [4, 7];
    S5: [4, 8];
    Z5: [4, 9];
    TL: [4, 10];
    TJ: [4, 11];
    OZ: [4, 12];
    OS: [4, 13];
    TS: [4, 14];
    TZ: [4, 15];
    LL: [4, 16];
    JJ: [4, 17];
    I1: [5, 0];
    I2: [5, 1];
    I3: [5, 2];
    L3: [5, 3];
    "O+": [8, 1];
    INV: [9, 0];
    NONE: [9, 0];
  };

  on(eventID: number, eventName: string): void;
  clearPause(): void;
  clearNextModeHandler(): void;
  clearUnPauseHandler(): void;
  resetUI(): void;
  getNamedStatVal(statNameOrID: string | number, gamedata: GameData): [value: number, name: string] | null;
  initialExecCommands(callback: () => void): void;
  execCommands(commands: object[] | object): void;
  sendForfeit(): void;
  skipToNext(): void;
  stageCompleted(): void;
  resolveIdentifier(localCounter: string): [string, string];
  execCommand(command: object): void;
  getCurrentVarScope(): object;
  execByID(ID: string): void;
  /** Replaces {variable_names} with their values in the text. */
  replaceTextVars(text: string): string;
  mapFetchError(usermodeID: number): void;
  getScoreNamedMetric(metric: string): string;
  saveScore(unknownParameter: boolean): void;
  enableSkipButton(): void;
  getHint(): void;
  enableHintButton(hintNumber: number): void;
  loadMode(): void;
  restoreSkin(): void;
  parseModeData(): void;
  /** Loads the MathJS library. */
  loadMath(): void;
  loadModeSkins(): void;
  soundLoaded(sound: object): void;
  finalLoader(): void;
  replaceActiveBlock(newPiece: Block): void;
  getBlockFromTextInput(pieceString: string): Block;
  addStaticQueueToQueue(replaceActivePiece: boolean): void;
  registerTimeTrigger(time: number | string): ModeTrigger;
  registerCommandTrigger(triggerID: number, value: number): ModeTrigger;
  registerVar(variableName: string): void;
  prepare(modeID?: number | string): void;
  isClearMatrix(): boolean;
}

declare class StatsManager {}

declare class Mobile {}

declare class SFXsets {}

declare class VSFXsets {}

declare class FastFont {}

declare class FastFont2D {}

declare class Hammer {}

/**
 * Color Picker
 */
declare class CP {}

declare class Replayer {}

declare class RoomInfo {
  constructor(live: Live);
  l: Live;
  roomDetailBox: number | null
  timeoutRequestDetail:  number | null
  timeoutRoomDetail: number | null
  rdParts: {
    "detail": HTMLDivElement,
    "title": HTMLDivElement,
    "spinner": HTMLDivElement,
    "content": HTMLDivElement,
    "settings": HTMLDivElement,
    "settingsTitle": HTMLDivElement,
    "settingsContent": HTMLDivElement,
    "limit": HTMLDivElement
  };
  roomDetails: {
    [roomID: string]: RoomDetails2;
  };
  /** Internationalized names for On and Off. */
  readonly ON_OFF: ["Off", "On"];
  /** Short config names. */
  readonly CONF_NAMES: {
    /** Attack Table */
    at: "Attack table",
    /** Combo Table */
    ct: "Combo table",
    /** Lock Delay */
    ld: "Lock delay",
    /** Clear Delay (ms) */
    cd: {
      /** Config name. */
      n: "Clear delay",
      /** Config unit. */
      u: "ms",
    },
    /** Delayed Auto Shift (ms) */
    DAS: {
      /** Config name. */
      n: "DAS",
      /** Config unit. */
      u: "ms",
    },
    /** Auto Repeat Rate (ms). */
    ARR: {
      /** Config name. */
      n: "ARR",
      /** Config unit. */
      u: "ms",
    },
    /** Garbage distribution method. */
    gdm: {
      /** Config name. */
      n: "G-distrib.",
      /** Config values. */
      v: [null, "divide", "toAll", null, "toMost", "toSelf", "random", "roulette"],
    },
    /** Garbage blocking method. */
    gblock: {
      /** Config name. */
      n: "G-blocking",
      /** Config values. */
      v: ["full", "limited", "none", "instant"],
    },
    /** Randomizer. */
    rnd: {
      /** Config name. */
      n: "Randomizer",
      /** Config values. */
      v: ["7bag", "14bag", "Classic", "1Block", "2Block", "1x7bag", "1x14bag", "C2Sim", "7b-RR", "BSb-7b", "BB-7b"],
    },
    /** Amount of previews. */
    pr: "Previews",
    /** Hold. */
    hold: "Hold",
    /** Piece set. */
    bbs: {
      /** Config name. */
      n: "Blocks",
      /** Config values. */
      v: [null, "Big", "Big+", "ARS", "Penta", "M123", "All29", "C2RS", "OSpin"],
    },
    /** Gravity level. */
    grav: "Gravity",
    /** Garbage messiness. */
    mess: {
      /** Config name. */
      n: "Messiness",
      /** Config unit. */
      u: "%",
    },
    /** Garbage delay. */
    gDelay: {
      /** Config name. */
      n: "G-delay",
      /** Config unit. */
      u: "ms",
    },
    /** HostStart. */
    hostStart: "HostStart",
    /** Invert garbage. */
    gInv: "G-invert",
    /** Garbage hole width. */
    gapW: "G-gap",
    /** No 4-wide. */
    noFW: "noFW",
    /** Ghost piece. */
    ghost: {
      /** Config name. */
      n: "Ghost",
      /** Config values. */
      v: {
        "-1": "Def",
        0: "Off",
        1: "On",
      },
    },
    /** Attack as solid. */
    sa: "SolidAtk",
    /** All-spin. */
    as: {
      /** Config name. */
      n: "AllSpin",
      /** Config values. */
      v: ["Off", "On - Im.", "On - 4P"],
    },
    /** All-spin exclusion list. */
    asEx: "AS-Excl.",
    /** Solid garbage profile. */
    sgp: {
      /** Config name. */
      n: "Solid",
      /** Config values. */
      v: ["0", "1", "2", "Custom speed"],
    },
  };
  /** Limit names and units. */
  readonly LIMIT_NAMES: {
    /** APM. */
    apm: {
      /** Name. */
      n: "APM",
      /** Unit. */
      u: "",
    },
    /** Sprint 40L time. */
    sub: {
      /** Name. */
      n: "Sprint 40L",
      /** Unit. */
      u: "s",
    },
    /** Total Live playtime. */
    gt: {
      /** Name. */
      n: "Gametime",
      /** Unit. */
      u: "hrs",
    },
  };
}

declare class ChatAutocomplete {}

declare class Friends {}

declare class EmoteSelect {}

declare class ModeTrigger {}
