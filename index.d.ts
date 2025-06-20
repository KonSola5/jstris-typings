/// <reference types="./bots.d.ts" />

declare global {
  interface Window {
    Bots: Bots;
  }
}

declare interface AleaPRNG {
  (): number;
  int32: () => number;
  double: () => number;
  quick: () => number;
}

declare interface LZString {
  compress: (input: string | null) => string;
  compressToBase64: (input: string | null) => string;
  compressToEncodedURIComponent: (input: string | null) => string;
  compressToUTF16: (input: string | null) => string;
  compressToUint8Array: (uncompressed: string | null) => Uint8Array;
  decompress: (compressed: string | null) => string | null | undefined;
  decompressFromBase64: (compressed: string | null) => string | null | undefined;
  decompressFromEncodedURIComponent: (input: string | null) => string | null | undefined;
  decompressFromUTF16: (compressed: string | null) => string | null | undefined;
  decompressFromUint8Array: (compressed: Uint8Array | null) => string | null | undefined;
}

type GrowToSize<T, N extends number, A extends T[]> = A["length"] extends N ? A : GrowToSize<T, N, [...A, T]>;

type FixedArray<T, N extends number> = GrowToSize<T, N, []>;

/** Stores types used throughout Jstris. */
declare namespace Jstris {
  /** @deprecated Jstris should use {@link KeyboardEvent.code() keyboard codes} instead. Come on, we are in 2025. */
  type KeyCode = number;

  /** An array of 10 numbers, which defines a row of a Jstris board. */
  type MatrixRow = FixedArray<number, 10>;

  /** A 20x10 matrix, which is a visible part of the Jstris board. */
  type Matrix = FixedArray<MatrixRow, 20>;

  type Tetrominoes = "I" | "O" | "T" | "L" | "J" | "S" | "Z";
  interface ReplayResponse {
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
  }

  interface PersonalBestInfo {
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
    /** The mode title. */
    modeTitle: string;
  }

  /**
   * Specifies options for GIF/video skins.
   */
  interface VideoOptions {
    /** Makes the skin video visible. */
    debug?: boolean;
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
  }

  interface GameData {
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
  }

  type Controls = [
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

  type AttackTable = [
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

  type ComboTable = [
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

  interface GLContextDefinition {
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
    }[];
    boundBuffers: boolean;
    boundTexture: WebGLTexture | null;
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

  interface ClientWithOtherIcon {
    /** Whether the user is registered or not. (?) */
    auth: boolean;
    /** The client's CID. */
    cid: number;
    /** Nickname color, if set. */
    color: string | null;
    /** Openmoji Supporter icon (applied only when `type` is `999`). */
    icon: null;
    /** Whether the user is a moderator. Potentially only `true` when the player is a moderator. */
    mod: boolean;
    /** The client's nickname. */
    name: string;
    /** The replay played live, or `null` if the player is not playing. */
    rep: Replayer | null;
    /** Specifies the role (Champion, Moderator, Supporter) and client's icon. */
    type: Exclude<number, 999>;
    bold?: boolean;
  }

  interface ClientWithOpenmojiIcon {
    /** Whether the user is registered or not. (?) */
    auth: boolean;
    /** The client's CID. */
    cid: number;
    /** Nickname color, if set. */
    color: string | null;
    /** Openmoji Supporter icon (applied only when `type` is `999`). */
    icon: string;
    /** Whether the user is a moderator. Potentially only `true` when the player is a moderator. */
    mod: boolean;
    /** The client's nickname. */
    name: string;
    /** The replay played live, or `null` if the player is not playing. */
    rep: Replayer | null;
    /** Specifies the role (Champion, Moderator, Supporter) and client's icon. */
    type: 999;
    bold?: boolean;
  }

  type Client = ClientWithOpenmojiIcon | ClientWithOtherIcon;

  interface LobbyList {
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
  }

  interface Limits {
    /** 10-game APM minimum and maximum */
    apm?: [min: number | null, max: number | null];
    /** Live gametime (in hours) minimum and maximum */
    gt?: [min: number | null, max: number | null];
    /** Sprint 40L PB minimum and maximum */
    sub?: [min: number | null, max: number | null];
  }

  // interface RoomDetails {
  //   /** Player count. */
  //   c: number;
  //   /** */
  //   s: number;
  //   /** Room ID. */
  //   id: string;
  //   /** Room name. */
  //   n: string;
  //   /** Room mode (modes not starting with "Live"). */
  //   mo: number;
  //   /** Room mode (modes starting with "Live"). */
  //   pm: number;
  //   /** Lifetime games played. */
  //   g: number;
  //   /** Room speed limit (in PPS) - `0` if no speed limit is set. */
  //   sl: number;
  //   /** Maximum number of users in a room - `24` or more is treated as no limit. */
  //   m: number;
  //   /** Waiting, perhaps? */
  //   w?: number;
  //   /** */
  //   d: {
  //     /** The server the given room is on. */
  //     s: string;
  //     /** Restrictions that prevent certain users from joining */
  //     lock?: Limits;
  //   };
  //   det: RoomFurtherDetails;
  //   /** */
  //   tr?: number;
  //   /** Whether the room is locked or not. */
  //   l?: number;
  // }

  interface RoomJoinLimits {
    /** Whether the player is eligible to play in the room. */
    r?: boolean;
    /** Limits imposed on the room. */
    l?: Limits;
    /** Player's current stats. */
    s?: CurrentStats;
  }

  interface CurrentStats {
    /** The player's 10-game APM average. */
    apm: number;
    /** The player's total Live playtime. */
    gt: number;
    /** The player's 40L Sprint PB. */
    sub: number;
  }

  interface PlayerInformation {
    /** Current amount of registered players in the room. */
    c: number;
    /** Current amount of guests in the room. */
    g: number;
    /** More detailed information about players in the room. */
    p: PlayerDetails;
    /** Current amount of spectators in the room. */
    s: number;
  }

  interface RoomDetails {
    /** Information about room join limits. */
    l?: RoomJoinLimits;
    /** Information about players in the room. */
    p: PlayerInformation;
    /** Room ID. */
    r: string;
    /** Settings modified from defaults. */
    s: RoomModifiedConfig;
    /** Max amount allowed? */
    t: number;
  }

  type PlayerDetails = {
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
  }[];

  interface RoomFurtherDetails {
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
        /** The player's Supporter tier. */
        ti?: number;
      };
      /** */
      g: number;
      /** Room config */
      s: RoomConfig;
      l: null;
    };
  }
  // TODO
  type ResultsList = object;
  type TeamResultsList = object;

  interface Emote {
    /** Category to which the emote belongs. */
    g: string;
    /** Emote name. */
    n: string;
    /** Tags separated by spaces to which the emote belongs. */
    t?: string;
    /** Emote URL. */
    u?: string;
    /** */
    c?: "uee" | "oee";
    /** Never used, but called by the code. */
    p?: unknown;
  }

  type CurrentWord = [lastWord: string, caretPosition: number];

  type EmoteList = Emote[];

  interface ViewNameDefinition {
    hold: "holdCanvas";
    bg: "bgLayer";
    main: "myCanvas";
    queue: "queueCanvas";
    statTable: "statTable";
    si: "sprintInfo";
    lrem: "lrem";
  }

  interface ReplayMeta {
    /** Replay version. */
    v: number;
    /** Soft drop ID used. */
    softDropId: number;
    /** Timestamp of the start of the game. */
    gameStart: number;
    /** Timestamp of the end of the game. */
    gameEnd: number;
    /** Seed used in the replay. */
    seed: string;
    /**
     * 32-bit integer representing the mode and submode of the replay.
     *
     * First 16 bits represent the mode.
     *
     * Last 16 bits represent the submode.
     */
    m: number;
    /** Piece set used. */
    bs: number;
    /** Sound effect set used. */
    se: number;
    /** DAS used (in milliseconds) */
    das: number;
    /**
     * Ruleset used:
     * - `0` - Standard
     * - `1` - Big Mode
     * - `2` - Pentomino
     * - `3` - MPH
     */
    r: number;
    /** Map ID used. */
    map?: string;
  }

  interface ReplayInfo {
    /**  */
    c: ReplayMeta;
    /** Replay data as a Base64-encoded string. */
    d: string;
    /** Map info. */
    map: {
      /** Map ID. */
      id: number;
      /** Map state: `0` if the map is not published, `1` if it is. */
      state: 0 | 1;
      /** Name of the map. */
      name: string;
      /** Static queue consisting of tetrominoes (`I`,`O`,`T`,`L`,`J`,`S`,`Z`), or `null` if not provided. */
      queue: string | null;
      /**
       * Type of finish:
       * - `0` if all map blocks need to be cleared,
       * - `1` if a Perfect Clear must be achieved.
       */
      finish: 0 | 1;
      /** Map data. */
      data: string;
      /** Map MD5 hash. */
      boardMD5: string;
    };
  }

  enum Actions {
    MOVE_LEFT = 0,
    MOVE_RIGHT = 1,
    DAS_LEFT = 2,
    DAS_RIGHT = 3,
    ROTATE_LEFT = 4,
    ROTATE_RIGHT = 5,
    ROTATE_180 = 6,
    HARD_DROP = 7,
    SOFT_DROP_BEGIN_END = 8,
    GRAVITY_STEP = 9,
    HOLD_BLOCK = 10,
    GARBAGE_ADD = 11,
    SGARBAGE_ADD = 12,
    REDBAR_SET = 13,
    ARR_MOVE = 14,
    AUX = 15,
  }

  enum AuxActions {
    AFK = 0,
    BLOCK_SET = 1,
    MOVE_TO = 2,
    RANDOMIZER = 3,
    MATRIX_MOD = 4,
    WIDE_GARBAGE_ADD = 5,
  }

  interface Action {
    /** Action timestamp (milliseconds since the game started) */
    t: number;
    /** Action performed. */
    a: number;
    /** Hard drop ordinal, if the action is a hard drop. */
    hdId?: number;
  }

  interface HardDrop {
    frame: number;
    deltat: number;
  }

  interface ReplayData {
    c: ReplayMeta;
    d: string;
    a: Action[];
  }

  type Segment = [duration: number, index: number, frame: number, deltat: number];

  enum ScoringActions {
    SOFT_DROP = 0,
    HARD_DROP = 1,
    CLEAR1 = 2,
    CLEAR2 = 3,
    CLEAR3 = 4,
    CLEAR4 = 5,
    TSPIN_MINI = 6,
    TSPIN = 7,
    TSPIN_MINI_SINGLE = 8,
    TSPIN_SINGLE = 9,
    TSPIN_DOUBLE = 10,
    TSPIN_TRIPLE = 11,
    PERFECT_CLEAR = 12,
    COMBO = 13,
    CLEAR5 = 14,
  }

  interface ScoringOptions {
    type: number;
    b2b: boolean;
    cmb: number;
  }

  type ScoreStamp = [timestamp: number, scoring: ScoringActions, scoreAdded: number, multiplier: number, alwaysZero: 0];

  type FinesseArray = [stateSpawn: number[], stateCW: number[], state180: number[], stateCCW: number[]];

  type FullPointDefinition = [fullPoint1_X: number, fullPoint1_Y: number, fullPoint2_X: number, fullPoint2_Y: number];

  type MiniPointDefinition = [miniPoint1_X: number, miniPoint1_Y: number, miniPoint2_X: number, miniPoint2_Y: number];

  /** Specifies 4-point all-spin points for L, J, S and Z pieces. T piece is handled differently. */
  type AllSpin4Point = [fullPoints: FullPointDefinition, miniPoints: MiniPointDefinition];

  /** Specifies 4-point all-spin for the I piece. The I piece has two sets of mini points. */
  type IPiece_AllSpin4Point = [
    fullPoints: FullPointDefinition,
    miniPoints: [primary: MiniPointDefinition, alternative: MiniPointDefinition]
  ];

  type PieceBoundingBoxes<N extends number> = [
    stateSpawn: FixedArray<FixedArray<number, N>, N>,
    stateCW: FixedArray<FixedArray<number, N>, N>,
    state180: FixedArray<FixedArray<number, N>, N>,
    stateCCW: FixedArray<FixedArray<number, N>, N>
  ];

  /** Interface used internally to type kicks. */
  interface Kicks {
    None: [
      stateSpawn: {
        "-1": FixedArray<[x: number, y: number], 1>;
        1: FixedArray<[x: number, y: number], 1>;
        2: FixedArray<[x: number, y: number], 1>;
      },
      stateCW: {
        "-1": FixedArray<[x: number, y: number], 1>;
        1: FixedArray<[x: number, y: number], 1>;
        2: FixedArray<[x: number, y: number], 1>;
      },
      state180: {
        "-1": FixedArray<[x: number, y: number], 1>;
        1: FixedArray<[x: number, y: number], 1>;
        2: FixedArray<[x: number, y: number], 1>;
      },
      stateCCW: {
        "-1": FixedArray<[x: number, y: number], 1>;
        1: FixedArray<[x: number, y: number], 1>;
        2: FixedArray<[x: number, y: number], 1>;
      }
    ];
    SRS: [
      stateSpawn: {
        "-1": FixedArray<[x: number, y: number], 5>;
        1: FixedArray<[x: number, y: number], 5>;
        2: FixedArray<[x: number, y: number], 2>;
      },
      stateCW: {
        "-1": FixedArray<[x: number, y: number], 5>;
        1: FixedArray<[x: number, y: number], 5>;
        2: FixedArray<[x: number, y: number], 2>;
      },
      state180: {
        "-1": FixedArray<[x: number, y: number], 5>;
        1: FixedArray<[x: number, y: number], 5>;
        2: FixedArray<[x: number, y: number], 2>;
      },
      stateCCW: {
        "-1": FixedArray<[x: number, y: number], 5>;
        1: FixedArray<[x: number, y: number], 5>;
        2: FixedArray<[x: number, y: number], 2>;
      }
    ];
    ARS: [
      stateSpawn: {
        "-1": FixedArray<[x: number, y: number], 3>;
        1: FixedArray<[x: number, y: number], 3>;
        2: FixedArray<[x: number, y: number], 3>;
      },
      stateCW: {
        "-1": FixedArray<[x: number, y: number], 3>;
        1: FixedArray<[x: number, y: number], 3>;
        2: FixedArray<[x: number, y: number], 3>;
      },
      state180: {
        "-1": FixedArray<[x: number, y: number], 3>;
        1: FixedArray<[x: number, y: number], 3>;
        2: FixedArray<[x: number, y: number], 3>;
      },
      stateCCW: {
        "-1": FixedArray<[x: number, y: number], 3>;
        1: FixedArray<[x: number, y: number], 3>;
        2: FixedArray<[x: number, y: number], 3>;
      }
    ];
    C2: [
      stateSpawn: {
        "-1": FixedArray<[x: number, y: number], 8>;
        1: FixedArray<[x: number, y: number], 8>;
        2: FixedArray<[x: number, y: number], 8>;
      },
      stateCW: {
        "-1": FixedArray<[x: number, y: number], 8>;
        1: FixedArray<[x: number, y: number], 8>;
        2: FixedArray<[x: number, y: number], 8>;
      },
      state180: {
        "-1": FixedArray<[x: number, y: number], 8>;
        1: FixedArray<[x: number, y: number], 8>;
        2: FixedArray<[x: number, y: number], 8>;
      },
      stateCCW: {
        "-1": FixedArray<[x: number, y: number], 8>;
        1: FixedArray<[x: number, y: number], 8>;
        2: FixedArray<[x: number, y: number], 8>;
      }
    ];
    OSpin: [
      stateSpawn: {
        "-1": FixedArray<[x: number, y: number], 16>;
        1: FixedArray<[x: number, y: number], 16>;
        2: FixedArray<[x: number, y: number], 16>;
      },
      stateCW: {
        "-1": FixedArray<[x: number, y: number], 16>;
        1: FixedArray<[x: number, y: number], 16>;
        2: FixedArray<[x: number, y: number], 16>;
      },
      state180: {
        "-1": FixedArray<[x: number, y: number], 16>;
        1: FixedArray<[x: number, y: number], 16>;
        2: FixedArray<[x: number, y: number], 16>;
      },
      stateCCW: {
        "-1": FixedArray<[x: number, y: number], 16>;
        1: FixedArray<[x: number, y: number], 16>;
        2: FixedArray<[x: number, y: number], 16>;
      }
    ];
  }

  interface PieceDefintion<RotSys extends keyof Kicks, N extends number> {
    /** Specifies bounding boxes of the pieces. */
    blocks: PieceBoundingBoxes<N>;
    /** Unknown. */
    cc: FixedArray<number, 4>;
    /** Presumably the rotation center of the piece? */
    center: FixedArray<FixedArray<number, 2>, 4>;
    /** The piece's color. An integer between 0 and 9 inclusive. */
    color: number;
    /** No idea. */
    h: FixedArray<number, 4>;
    /** The ID of the piece. */
    id: number;
    /** Kicks of the piece. */
    kicks: Kicks[RotSys];
    /** The name of the piece. */
    name: string;
    /** Spawn offset of the piece. */
    spawn: [x: number, y: number];
    xp?: [x: number, y: number] | 0; // why
    yp: [x: number, y: number];
  }

  interface PieceSetStandard {
    /** Specifies points for 4-point all-spin. */
    allspin: [IPiece_AllSpin4Point, null, null, AllSpin4Point, AllSpin4Point, AllSpin4Point, AllSpin4Point];
    /** Specifies pieces contained in a piece set. */
    blocks: [
      PieceDefintion<"SRS", 4>,
      PieceDefintion<"None", 4>,
      PieceDefintion<"SRS", 4>,
      PieceDefintion<"SRS", 4>,
      PieceDefintion<"SRS", 4>,
      PieceDefintion<"SRS", 4>,
      PieceDefintion<"SRS", 4>
    ];
    /** Specifies whether the pieces are distributed equally on the NEXT queue or not. */
    equidist: true;
    /** Specifies, how many blocks does the piece move at a time. */
    step: 1;
    /** Specifies the rendering scale of the piece. */
    scale: 1;
    /** Specifies, whether April Fools items appear in this piece set or not. */
    items: true;
    /** Specifies finesse data for pieces in this piece set, or `null` if not available. */
    finesse: FixedArray<FinesseArray, 7>;
    /** Specifies, how should pieces look like in the NEXT queue. */
    previewAs: PieceSetStandard;
  }

  interface PieceSetBig {
    /** Specifies points for 4-point all-spin. */
    allspin: null;
    /** Specifies pieces contained in a piece set. */
    blocks: [
      PieceDefintion<"SRS", 8>,
      PieceDefintion<"None", 8>,
      PieceDefintion<"SRS", 8>,
      PieceDefintion<"SRS", 8>,
      PieceDefintion<"SRS", 8>,
      PieceDefintion<"SRS", 8>,
      PieceDefintion<"SRS", 8>
    ];
    /** Specifies whether the pieces are distributed equally on the NEXT queue or not. */
    equidist: true;
    /** Specifies, how many blocks does the piece move at a time. */
    step: 2;
    /** Specifies the rendering scale of the piece. */
    scale: 2;
    /** Specifies, whether April Fools items appear in this piece set or not. */
    items: false;
    /** Specifies finesse data for pieces in this piece set, or `null` if not available. */
    finesse: null;
    /** Specifies, how should pieces look like in the NEXT queue. */
    previewAs: PieceSetStandard;
  }
  interface PieceSetBigPlus {
    /** Specifies points for 4-point all-spin. */
    allspin: null;
    /** Specifies pieces contained in a piece set. */
    blocks: [
      PieceDefintion<"SRS", 8>,
      PieceDefintion<"None", 8>,
      PieceDefintion<"SRS", 8>,
      PieceDefintion<"SRS", 8>,
      PieceDefintion<"SRS", 8>,
      PieceDefintion<"SRS", 8>,
      PieceDefintion<"SRS", 8>
    ];
    /** Specifies whether the pieces are distributed equally on the NEXT queue or not. */
    equidist: true;
    /** Specifies, how many blocks does the piece move at a time. */
    step: 1;
    /** Specifies the rendering scale of the piece. */
    scale: 2;
    /** Specifies, whether April Fools items appear in this piece set or not. */
    items: false;
    /** Specifies finesse data for pieces in this piece set, or `null` if not available. */
    finesse: null;
    /** Specifies, how should pieces look like in the NEXT queue. */
    previewAs: PieceSetStandard;
  }
  interface PieceSetARS {
    /** Specifies points for 4-point all-spin. */
    allspin: null;
    /** Specifies pieces contained in a piece set. */
    blocks: [
      PieceDefintion<"None", 4>,
      PieceDefintion<"ARS", 4>,
      PieceDefintion<"ARS", 4>,
      PieceDefintion<"ARS", 4>,
      PieceDefintion<"ARS", 4>,
      PieceDefintion<"ARS", 4>,
      PieceDefintion<"ARS", 4>
    ];
    /** Specifies whether the pieces are distributed equally on the NEXT queue or not. */
    equidist: true;
    /** Specifies, how many blocks does the piece move at a time. */
    step: 1;
    /** Specifies the rendering scale of the piece. */
    scale: 1;
    /** Specifies, whether April Fools items appear in this piece set or not. */
    items: false;
    /** Specifies finesse data for pieces in this piece set, or `null` if not available. */
    finesse: null;
    /** Specifies, how should pieces look like in the NEXT queue. */
    previewAs: PieceSetARS;
  }
  interface PieceSetPentomino {
    /** Specifies points for 4-point all-spin. */
    allspin: null;
    /** Specifies pieces contained in a piece set. */
    blocks: FixedArray<PieceDefintion<"SRS", 5>, 18>;
    /** Specifies whether the pieces are distributed equally on the NEXT queue or not. */
    equidist: false;
    /** Specifies, how many blocks does the piece move at a time. */
    step: 1;
    /** Specifies the rendering scale of the piece. */
    scale: 1;
    /** Specifies, whether April Fools items appear in this piece set or not. */
    items: false;
    /** Specifies finesse data for pieces in this piece set, or `null` if not available. */
    finesse: null;
    /** Specifies, how should pieces look like in the NEXT queue. */
    previewAs: PieceSetPentomino;
  }
  interface PieceSetM123 {
    /** Specifies points for 4-point all-spin. */
    allspin: null;
    /** Specifies pieces contained in a piece set. */
    blocks: [PieceDefintion<"SRS", 1>, PieceDefintion<"SRS", 2>, PieceDefintion<"SRS", 3>, PieceDefintion<"SRS", 3>];
    /** Specifies whether the pieces are distributed equally on the NEXT queue or not. */
    equidist: false;
    /** Specifies, how many blocks does the piece move at a time. */
    step: 1;
    /** Specifies the rendering scale of the piece. */
    scale: 1;
    /** Specifies, whether April Fools items appear in this piece set or not. */
    items: false;
    /** Specifies finesse data for pieces in this piece set, or `null` if not available. */
    finesse: null;
    /** Specifies, how should pieces look like in the NEXT queue. */
    previewAs: PieceSetM123;
  }
  interface PieceSetAll29 {
    /** Specifies points for 4-point all-spin. */
    allspin: null;
    /** Specifies pieces contained in a piece set. */
    blocks: [
      // Tetrominoes
      PieceDefintion<"SRS", 4>,
      PieceDefintion<"None", 4>,
      PieceDefintion<"SRS", 4>,
      PieceDefintion<"SRS", 4>,
      PieceDefintion<"SRS", 4>,
      PieceDefintion<"SRS", 4>,
      PieceDefintion<"SRS", 4>,
      // M123
      PieceDefintion<"SRS", 1>,
      PieceDefintion<"SRS", 2>,
      PieceDefintion<"SRS", 3>,
      PieceDefintion<"SRS", 3>,
      // Pentominoes
      ...FixedArray<PieceDefintion<"SRS", 5>, 18>
    ];
    /** Specifies whether the pieces are distributed equally on the NEXT queue or not. */
    equidist: false;
    /** Specifies, how many blocks does the piece move at a time. */
    step: 1;
    /** Specifies the rendering scale of the piece. */
    scale: 1;
    /** Specifies, whether April Fools items appear in this piece set or not. */
    items: false;
    /** Specifies finesse data for pieces in this piece set, or `null` if not available. */
    finesse: null;
    /** Specifies, how should pieces look like in the NEXT queue. */
    previewAs: PieceSetAll29;
  }
  interface PieceSetCultris2RS {
    /** Specifies points for 4-point all-spin. */
    allspin: null;
    /** Specifies pieces contained in a piece set. */
    blocks: FixedArray<PieceDefintion<"C2", 4>, 7>;
    /** Specifies whether the pieces are distributed equally on the NEXT queue or not. */
    equidist: true;
    /** Specifies, how many blocks does the piece move at a time. */
    step: 1;
    /** Specifies the rendering scale of the piece. */
    scale: 1;
    /** Specifies, whether April Fools items appear in this piece set or not. */
    items: false;
    /** Specifies finesse data for pieces in this piece set, or `null` if not available. */
    finesse: null;
    /** Specifies, how should pieces look like in the NEXT queue. */
    previewAs: PieceSetCultris2RS;
  }
  interface PieceSetOSpin {
    /** Specifies points for 4-point all-spin. */
    allspin: null;
    /** Specifies pieces contained in a piece set. */
    blocks: FixedArray<PieceDefintion<"OSpin", 4>, 7>;
    /** Specifies whether the pieces are distributed equally on the NEXT queue or not. */
    equidist: true;
    /** Specifies, how many blocks does the piece move at a time. */
    step: 1;
    /** Specifies the rendering scale of the piece. */
    scale: 1;
    /** Specifies, whether April Fools items appear in this piece set or not. */
    items: false;
    /** Specifies finesse data for pieces in this piece set, or `null` if not available. */
    finesse: null;
    /** Specifies, how should pieces look like in the NEXT queue. */
    previewAs: PieceSetOSpin;
  }
  interface PieceSetNone {
    /** Specifies points for 4-point all-spin. */
    allspin: null;
    /** Specifies pieces contained in a piece set. */
    blocks: FixedArray<PieceDefintion<"SRS", 1>, 1>;
    /** Specifies whether the pieces are distributed equally on the NEXT queue or not. */
    equidist: false;
    /** Specifies, how many blocks does the piece move at a time. */
    step: 1;
    /** Specifies the rendering scale of the piece. */
    scale: 1;
    /** Specifies, whether April Fools items appear in this piece set or not. */
    items: true;
    /** Specifies, whether ghost pieces should be rendered for this piece set. */
    ghost: false;
    /** Specifies finesse data for pieces in this piece set, or `null` if not available. */
    finesse: null;
    /** Specifies, how should pieces look like in the NEXT queue. */
    previewAs: PieceSetNone;
  }

  /** Specifies piece sets used in the game. */
  type BlockSets = [
    PieceSetStandard,
    PieceSetBig,
    PieceSetBigPlus,
    PieceSetARS,
    PieceSetPentomino,
    PieceSetM123,
    PieceSetCultris2RS,
    PieceSetOSpin,
    PieceSetNone
  ];

  interface ExportBackgroundDefinition {
    id: number;
    name: string;
    data: string | null;
    h?: number;
    w?: number;
    w0?: number;
    l: {
      titleColor: string;
      statTitleColor: string;
      statValColor: string;
    };
  }

  interface ExportLayoutDefinition {
    stageMargin: number;
    holdBS: number;
    queueBS: number;
    /** Hold right margin? */
    holdRM: number;
    /** Queue left margin? */
    queueLM: number;
    font: string;
    monofont: string;
    stats: number;
  }

  interface SFXDefinition {
    url: string;
    abs?: number;
    set?: number;
    duration?: number;
    spacing?: number;
    // How many combo tones there are.
    cnt?: number;
    q?: number;
  }

  interface SFXSetDefinition {
    id: number;
    name: string;
    data: typeof BaseSFXset;
  }

  interface I18n {
    /**
     * Displayed during the "Ready" state of "Ready? Go!" sequence.
     *
     * English: **"READY"**
     */
    ready: string;
    /**
     * Displayed during the "Go" state of "Ready? Go!" sequence.
     *
     * English: **"GO!"**
     */
    go: string;
    /**
     * Title of the "out of focus" message.
     *
     * English: **"Out of focus"**
     */
    notFocused: string;
    /**
     * Description of the "out of focus" message.
     *
     * English: **"Click here to focus the game"**
     */
    clickToFocus: string;
    /**
     * Title of the "spectator mode" message.
     *
     * English: **"Spectator mode"**
     */
    specMode: string;
    /**
     * Description of the "spectator mode" message.
     *
     * English: **"You are in spectator mode now."**
     */
    specModeInfo: string;
    /**
     * Description of the "spectator mode" message if the game is not ongoing.
     *
     * English: **"Type /play to join the game"**
     */
    endSpec: string;
    /**
     * Displays after the player logs into the game.
     *
     * English: **"Type /help for available commands."**
     */
    typeHelp: string;
    /**
     * Displayed after the place ordinal: 1st, 21st, 31st,...
     *
     * English: **"st"**
     */
    st: string;
    /**
     * Displayed after the place ordinal: 2nd, 22nd, 32nd,...
     *
     * English: **"nd"**
     */
    nd: string;
    /**
     * Displayed after the place ordinal: 3rd, 23rd, 33rd,...
     *
     * English: **"rd"**
     */
    rd: string;
    /**
     * Displayed for remaining ordinals, like: 4th, 11th, etc.
     *
     * English: **"th"**
     */
    th: string;
    /**
     * Title of the "Not playing" message.
     *
     * English: **"Not playing"**
     */
    notPlaying: string;
    /**
     * Description of the "Not playing" message if the game is ongoing.
     *
     * English: **"Wait until the round ends"**
     */
    waitNext: string;
    /**
     * Alternative description of the "Not playing" message if the game is ongoing.
     *
     * English: **"Please wait for the next round"**
     */
    waitNext2: string;
    /**
     * Description of the "Not playing" message if no game is ongoing.
     *
     * English: **"Press 'New game' to start"**
     */
    pressStart: string;
    /**
     * Title of the speed limit warning.
     *
     * English: **"SLOW DOWN"**
     */
    slowDown: string;
    /**
     * Description of the speed limit warning.
     *
     * English: **"The speed limit is"**
     */
    speedLimitIs: string;
    /**
     * Connecting message.
     *
     * English: **"Connecting..."**
     */
    connecting: string;
    /**
     * Signing in message.
     *
     * English: **"Signing in"**
     */
    signingIn: string;
    /**
     * Displays when log in fails.
     *
     * English: **"Log in failed!"**
     */
    loginFail: string;
    /**
     * Displays when the player is not logged in and is playing as a guest instead
     *
     * English: **"Not logged in! You're playing as a guest called {name}."**
     */
    loginFail2: string;
    /**
     * Displays when the map is loading.
     *
     * English: **"Map loading..."**
     */
    mapLoading: string;
    /**
     * General warning title.
     *
     * English: **"Warning"**
     */
    warning: string;
    /**
     * Description of a warning describing that spectator mode will activate soon.
     *
     * English: **"Spectator mode will be activated. Type in chat to abort."**
     */
    inactive1: string;
    /**
     * Description of a warning describing that spectator mode will activate after the next game with no inputs.
     *
     * English: **"Inactivity detected, next inactive game will activate spectator mode."**
     */
    inactive2: string;
    /**
     *
     *
     * English: **"Type your username to be able to chat!"**
     */
    nickFill: string;
    /**
     * Set
     *
     * English: **"Set"**
     */
    setButton: string;
    /**
     * Text on a button that sends the chat message.
     *
     * English: **"Send"**
     */
    sendButton: string;
    /**
     *
     *
     * English: **"Room name must be filled!"**
     */
    rNameReq: string;
    /**
     * News user.
     *
     * English: **"News"**
     */
    newsUser: string;
    /**
     * Server user.
     *
     * English: **"Server"**
     */
    serverUser: string;
    /**
     * Guest name, used in places when the auto-generated name is not used.
     *
     * English: **"NoNamed"**
     */
    noNamed: string;
    /**
     * Displays before the list of spectators in the room.
     *
     * English: **"Watching"**
     */
    watching: string;
    /**
     * Displays when someone joins the room.
     *
     * English: **"joined the room"**
     */
    userJoined: string;
    /**
     * Displays in tab title when someone joins the room.
     *
     * English: **"joined"**
     */
    joined: string;
    /**
     * Displays when someone joined as an observer, due to not fulfilling the room requirements.
     *
     * English: **"came to watch"**
     */
    userCame: string;
    /**
     * Displays when someone stops playing and starts spectating.
     *
     * English: **"is now spectating"**
     */
    isSpectating: string;
    /**
     * Spectator.
     *
     * English: **"Spectator"**
     */
    spectator: string;
    /**
     * Displays when someone leaves the room.
     *
     * English: **"has left"**
     */
    hasLeft: string;
    /**
     * Displays in chat when the player logs in.
     *
     * English: **"You are signed in as"**
     */
    signedAs: string;
    /**
     * Greeting message.
     *
     * English: **"Welcome,"**
     */
    welcome: string;
    /**
     * Greeting message for a room.
     *
     * English: **"Welcome in"**
     */
    welcomeIn: string;
    /**
     * There are no spectators in the room.
     *
     * English: **"No one is watching right now."**
     */
    noSpectators: string;
    /**
     * Replay available at.
     *
     * English: **"Replay available at"**
     */
    replayAvailable: string;
    /**
     * Description of a warning about old version of Jstris.
     *
     * English: **"You have an old version, use CTRL+F5 to reload to the new version!"**
     */
    oldVer: string;
    /**
     * Alternative description of a warning about old version of Jstris.
     *
     * English: **"You still have the old version! Use {key} to reload your client"**
     */
    oldVer2: string;
    /**
     * Displays in chat in private rooms.
     *
     * English: **"This is your private room where you won't be disturbed while playing. Check the Lobby to see public rooms."**
     */
    privateRoom: string;
    /**
     *
     *
     * English: **"Restart by F4 or set a custom key."**
     */
    restartInfo: string;
    /**
     * Displays in chat in private rooms.
     *
     * English: **"This room is private. Only way someone can join it is using this link:"**
     */
    joinLinkInfo: string;
    /**
     * Garbage received.
     *
     * English: **"Received"**
     */
    received: string;
    /**
     * Number of finesse faults.
     *
     * English: **"Finesse"**
     */
    finesse: string;
    /**
     * Name of the room.
     *
     * English: **"Room name"**
     */
    roomName: string;
    /**
     * Games played in the room.
     *
     * English: **"Games"**
     */
    games: string;
    /**
     * Players in the room.
     *
     * English: **"Players"**
     */
    players: string;
    /**
     * Name
     *
     * English: **"Name"**
     */
    name: string;
    /**
     * Wins
     *
     * English: **"Wins"**
     */
    wins: string;
    /**
     * Time
     *
     * English: **"Time"**
     */
    time: string;
    /**
     * Sent
     *
     * English: **"Sent"**
     */
    sent: string;
    /**
     * Pieces usedd
     *
     * English: **"Blocks"**
     */
    blocks: string;
    /**
     * Combo
     *
     * English: **"REN"**
     */
    ren: string;
    /**
     * Game time
     *
     * English: **"time"**
     */
    gameTime: string;
    /**
     * See... (mode leaderboard.)
     *
     * English: **"See"**
     */
    see: string;
    /**
     * (See mode) ...leaderboard.
     *
     * English: **"leaderboard"**
     */
    leaderboard: string;
    /**
     *
     *
     * English: **"WARNING"**
     */
    warning2: string;
    /**
     *
     *
     * English: **"Connected"**
     */
    connected: string;
    /**
     *
     *
     * English: **"client"**
     */
    client: string;
    /**
     *
     *
     * English: **"NOT CONNECTED"**
     */
    notConnected: string;
    /**
     *
     *
     * English: **"Connection lost!"**
     */
    connLost: string;
    /**
     *
     *
     * English: **"Last game:"**
     */
    lastGame: string;
    /**
     *
     *
     * English: **"Room settings:"**
     */
    roomSettings: string;
    /**
     *
     *
     * English: **"Attack"**
     */
    attack: string;
    /**
     *
     *
     * English: **"Combo"**
     */
    combo: string;
    /**
     *
     *
     * English: **"Solid"**
     */
    solid: string;
    /**
     *
     *
     * English: **"Clear"**
     */
    clear: string;
    /**
     *
     *
     * English: **"Mode"**
     */
    mode: string;
    /**
     *
     *
     * English: **"Garbage"**
     */
    garbage: string;
    /**
     *
     *
     * English: **"GarbageDelay"**
     */
    garbageDelay: string;
    /**
     *
     *
     * English: **"Messiness"**
     */
    messiness: string;
    /**
     *
     *
     * English: **"Replay"**
     */
    replay: string;
    /**
     *
     *
     * English: **"Rep"**
     */
    rep: string;
    /**
     *
     *
     * English: **"Rec."**
     */
    rec: string;
    /**
     * Displays in an alert prompting user to enter a DAS value in frames (like in NullpoMino)
     *
     * English: **"Enter numeric NullpoMino DAS value:"**
     */
    enterNullDAS: string;
    /**
     * Displays in an alert that informs the user about the DAS value converted to milliseconds.
     *
     * English: **"Suggested DAS is"**
     */
    suggestedIs: string;
    /**
     * Displays in an alert that ask the user whether to apply the DAS value or not.
     *
     * English: **"Apply?"**
     */
    applyConfirm: string;
    /**
     *
     *
     * English: **"DAS value is invalid, was not changed!"**
     */
    invalidDAS: string;
    /**
     * Displays in chat when settings (like DAS or ARR) are changed mid-game.
     *
     * English: **"Settings changed during the game. Replay invalidated."**
     */
    settingsChanged: string;
    /**
     * Replay segment.
     *
     * English: **"Segment"**
     */
    segment: string;
    /**
     * Duration of the replay segment.
     *
     * English: **"Duration"**
     */
    duration: string;
    /**
     *
     *
     * English: **"It seems the room is full."**
     */
    roomFull: string;
    /**
     *
     *
     * English: **"This chat is shared with {discord}."**
     */
    lobbyInfo: string;
    /**
     *
     *
     * English: **"You are now the host of this room."**
     */
    newHost: string;
    /**
     *
     *
     * English: **"This room no longer exists, joining the Default room!"**
     */
    badRoom: string;
    /**
     *
     *
     * English: **"Setting changed by the host"**
     */
    stngsChanged: string;
    /**
     *
     *
     * English: **"Custom settings"**
     */
    stngsCustom: string;
    /**
     *
     *
     * English: **"Already spectating!"**
     */
    aSpec: string;
    /**
     *
     *
     * English: **"Already playing!"**
     */
    aPlay: string;
    /**
     * Displays when replay either fails to save or user used `/replay`.
     *
     * English: **"Replay failed to save."**
     */
    repFail: string;
    /**
     * Displays when replay either fails to save or user used `/replay`.
     *
     * English: **"Replay file dumped into the chat. To preserve it, copy the text in the box and paste into your favourite text editor."**
     */
    repInChat: string;
    /**
     *
     *
     * English: **"The copied replayfile can be then played in the replayer or possibly resubmitted to the site."**
     */
    repTxtInfo: string;
    /**
     * Displays when a player achieves their new personal best score/time.
     *
     * English: **"YOUR NEW PERSONAL BEST"**
     */
    newPB: string;
    /**
     * Displays when a player finishes a mode for the first time.
     *
     * English: **"This was your first game. Get another PB to track the improvement."**
     */
    firstPB: string;
    /**
     * Displays when a player beats their previous personal best score/time.
     *
     * English: **"Your previous record was {prevPB} achieved {prevAgo}. The improvement is {PBdiff}."**
     */
    infoPB: string;
    /**
     * Specifies how long ago the PB was achieved.
     *
     * English: **"days ago"**
     */
    daysAgo: string;
    /**
     * Title of a message displayed when one player finishes a Live race game mode (like Maps or Sprint).
     *
     * English: **"THE RACE HAS FINISHED"**
     */
    raceFin: string;
    /**
     * Description of a message when one player finishes a Live race game mode (like Maps or Sprint).
     *
     * English: **"You can complete the run, but the next round can start at any time."**
     */
    raceFinInfo: string;
    /**
     * Title of a message displayed when a line clear other than a T-spin Double was performed in 20TSD.
     *
     * English: **"NOT TSD"**
     */
    notTSD: string;
    /**
     * Description of a message displayed when a line clear other than a T-spin Double was performed in 20TSD.
     *
     * English: **"Only T-Spin Double is allowed"**
     */
    notTSDInfo: string;
    /**
     * Title of a message displayed when a 4-line Perfect Clear is not possible in PC Mode.
     *
     * English: **"NOT a PC"**
     */
    notPC: string;
    /**
     * Description of a message displayed when a 4-line Perfect Clear is not possible in PC Mode.
     *
     * English: **"Do a Perfect Clear every 10 blocks. Your board is not clearable."**
     */
    notPCInfo: string;
    /**
     * Title of a message the displays when the player performs a 4-wide in a room with NoFW enabled.
     *
     * English: **"FOUR WIDE"**
     */
    fwDetect: string;
    /**
     * Description of a message the displays when the player performs a 4-wide in a room with NoFW enabled.
     *
     * English: **"Attacking yourself!"**
     */
    fwDetectInfo: string;
    /**
     *
     *
     * English: **"Oops!"**
     */
    oops: string;
    /**
     *
     *
     * English: **"Public chatting is not available for guests or users with less than {chReq} hours of gametime."**
     */
    chatNA: string;
    /**
     *
     *
     * English: **"Learn more"**
     */
    leMore: string;
    /**
     *
     *
     * English: **"The maximum amount of open connections for this IP is curently reached. If you need increased limits, contact us via Discord"**
     */
    connLimit: string;
    /**
     *
     *
     * English: **"Disconnected for inactivity! Spectator section was full."**
     */
    idleDC: string;
    /**
     *
     *
     * English: **"Rate limit reached."**
     */
    RLreach: string;
    /**
     * Displays when the account's access to Live games is permanently restricted.
     *
     * English: **"Your access to the Live games has been permanently restricted. You can still play singleplayer modes."**
     */
    ban1: string;
    /**
     * Displays when the account is banned.
     *
     * English: **"This user account is BANNED. Relogin to the website for more information."**
     */
    ban2: string;
    /**
     * Displays when the player fails to connect to the servers.
     *
     * English: **"Not connected to the game server, try {refr}."**
     */
    ncGS: string;
    /**
     * Suggests the user to refresh the page.
     *
     * English: **"refreshing the page"**
     */
    refr: string;
    /**
     * Displays when the player beats an unpublished map.
     *
     * English: **"Record not saved, the map is not published."**
     */
    nsUnpub: string;
    /**
     * Displays in chat when the player achieves no T-spin Doubles in 20TSD.
     *
     * English: **"Record not saved, not enough T-Spins."**
     */
    nsTspins: string;
    /**
     * Displays in chat when the player achieves less than 2 Perfect Clears in PC Mode.
     *
     * English: **"Record not saved, at least 2 Perfect Clears needed."**
     */
    nsLowPC: string;
    /**
     * Title of the message that displays in usermodes when a finite queue is depleted.
     *
     * English: **"Out of blocks"**
     */
    noBlocks: string;
    /**
     * Description of the message that displays in usermodes when a finite queue is depleted.
     *
     * English: **"All blocks were used"**
     */
    noBlocks2: string;
    /**
     *
     *
     * English: **"No players"**
     */
    noPlayers: string;
    /**
     *
     *
     * English: **"{cnt} more"**
     */
    cntMore: string;
    /**
     *
     *
     * English: **"{cnt} guests"**
     */
    cntGuests: string;
    /**
     *
     *
     * English: **"{cnt} spectating"**
     */
    cntSpec: string;
    /**
     *
     *
     * English: **"Join possible"**
     */
    joinPossible: string;
    /**
     *
     *
     * English: **"Not eligible"**
     */
    notEligible: string;
    /**
     *
     *
     * English: **"G.time"**
     */
    gTimeShort: string;
    /**
     *
     *
     * English: **"On"**
     */
    on: string;
    /**
     *
     *
     * English: **"Off"**
     */
    off: string;
    /**
     *
     *
     * English: **"Friends"**
     */
    fr: string;
    /**
     *
     *
     * English: **"Loading friend list"**
     */
    frLoad: string;
    /**
     *
     *
     * English: **"Log in first to use friend list"**
     */
    frLogin: string;
    /**
     *
     *
     * English: **"Friend list is empty"**
     */
    frEmpty: string;
    /**
     *
     *
     * English: **"Visit user's profile to send friend request."**
     */
    frHowAdd: string;
    /**
     *
     *
     * English: **"Private"**
     */
    frPriv: string;
    /**
     *
     *
     * English: **"Already in!"**
     */
    frIn: string;
    /**
     *
     *
     * English: **"Open chat"**
     */
    frChat: string;
    /**
     *
     *
     * English: **"Reload"**
     */
    frRel: string;
    /**
     *
     *
     * English: **"Message to {name}"**
     */
    frMsgTo: string;
    /**
     *
     *
     * English: **"Send room invite"**
     */
    frInv: string;
    /**
     *
     *
     * English: **"Invite to join {room}"**
     */
    frInvTo: string;
    /**
     *
     *
     * English: **"You are already in!"**
     */
    frInvIn: string;
    /**
     *
     *
     * English: **"by {user}"**
     */
    frInvBy: string;
    /**
     *
     *
     * English: **"ONLINE"**
     */
    frOn: string;
    /**
     *
     *
     * English: **"OFFLINE"**
     */
    frOff: string;
    /**
     *
     *
     * English: **"This is the beginning of chat history with {name}."**
     */
    frNewChatH: string;
    /**
     *
     *
     * English: **"Welcome to the Friends tab"**
     */
    frWelc: string;
    /**
     *
     *
     * English: **"In this area you can access a list of online friends, private chats, and room invites"**
     */
    frIntro: string;
    /**
     *
     *
     * English: **"To send a friend request, visit a user's profile"**
     */
    frIntro2: string;
    /**
     *
     *
     * English: **"To manage friends, visit the {frPage}"**
     */
    frIntro3: string;
    /**
     *
     *
     * English: **"Friends page"**
     */
    frPage: string;
    /**
     *
     *
     * English: **"Close intro"**
     */
    frIntroCl: string;
    /**
     *
     *
     * English: **"PPS"**
     */
    PPS: string;
    /**
     *
     *
     * English: **"APM"**
     */
    APM: string;
    /**
     *
     *
     * English: **"KPP"**
     */
    KPP: string;
    /**
     *
     *
     * English: **"Score"**
     */
    score: string;
    /**
     *
     *
     * English: **"Time"**
     */
    roundTime: string;
    /**
     *
     *
     * English: **"Apply changes"**
     */
    applyCh: string;
    /**
     *
     *
     * English: **"Create"**
     */
    create: string;
    /**
     *
     *
     * English: **"Sprint"**
     */
    sprint: string;
    /**
     *
     *
     * English: **"s"**
     */
    s: string;
    /**
     *
     *
     * English: **"hrs"**
     */
    hrs: string;
    /**
     *
     *
     * English: **"Show more"**
     */
    showMore: string;
    /**
     *
     *
     * English: **"Show less"**
     */
    showLess: string;
    /**
     *
     *
     * English: **"Cheese race"**
     */
    cheese: string;
    /**
     *
     *
     * English: **"Survival"**
     */
    survival: string;
    /**
     *
     *
     * English: **"Ultra"**
     */
    ultra: string;
    /**
     *
     *
     * English: **"Free play"**
     */
    freePlay: string;
    /**
     *
     *
     * English: **"20TSD"**
     */
    "20TSD": string;
    /**
     *
     *
     * English: **"PC Mode"**
     */
    PCmode: string;
    /**
     *
     *
     * English: **"Close"**
     */
    close: string;
    /**
     *
     *
     * English: **"Report user"**
     */
    reportU: string;
    /**
     *
     *
     * English: **"User"**
     */
    user: string;
    /**
     *
     *
     * English: **"Reason"**
     */
    reason: string;
    /**
     *
     *
     * English: **"Spam or unwanted advertising"**
     */
    rr0: string;
    /**
     *
     *
     * English: **"Sexually explicit content"**
     */
    rr1: string;
    /**
     *
     *
     * English: **"Hate speech"**
     */
    rr2: string;
    /**
     *
     *
     * English: **"Harassment or bullying"**
     */
    rr3: string;
    /**
     *
     *
     * English: **"Other (specify)"**
     */
    rr4: string;
    /**
     *
     *
     * English: **"Send report"**
     */
    sendReport: string;
  }

  /** @experimental */
  declare namespace Replay2 {
    type PotentialCaptionIDs = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

    type PotentialScoringActions = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

    interface MatrixChange {
      index: number;
      blockId: number;
    }

    interface MatrixBitMask {
      mask: number[];
      payload: number[];
    }

    interface Piece {
      type: number | null;
      blocksetId: number | null;
    }

    interface CurrentPiece extends Piece {
      type: number | null;
      blocksetId: number | null;
      state: number | null;
      positionDelta: number | null;
    }

    interface Event {
      type: number;
      data: EventData | undefined;
    }

    interface EventData {
      soundId: number;
    }

    interface Score {
      id: number;
      count: number;
    }

    interface Ruleset {
      ghost: number;
      skinId: number;
    }

    interface TimestampSavings {
      fixedBits: number;
      variableBits: number;
      savings: number;
      savingsPercent: number;
      stats: {
        small: number;
        medium: number;
        large: number;
      };
      totalFrames: number;
    }

    interface PositionSavings {
      fixedBits: number;
      deltaBits: number;
      savings: number;
      savingsPercent: number;
      stats: {
        left: number;
        right: number;
        down: number;
        rotateCW: number;
        rotateCCW: number;
        rotate180: number;
        absolute: number;
      };
      totalPositions: number;
    }

    interface PositionState {
      x: number;
      y: number;
      rotation: number;
    }

    interface Config {
      v: 4;
      softDropId: undefined;
      gameStart: undefined;
      gameEnd: undefined;
      seed: undefined;
      m: undefined;
      bs: undefined;
      se: undefined;
      das: undefined;
      arr: undefined;
    }
  }

  type Randomizer = Bag | Classic | OneBlock | C2Sim | Repeated | BsBlock | BigBlockRand | ConstBlock;

  interface SoundDefinition {
    id: string;
    vol: number;
  }

  interface Ruleset {
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

  interface RoomConfig {
    mode: number;
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
  }

  interface RoomModifiedConfig {
    at?: [
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
    ct?: [
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
    ld?: [lockDelay: number, maxLockDelayWithoutLock: number, maxWithoutLock: number];
    cd?: number;
    gdm?: number;
    gblock?: number;
    ghost?: number;
    DAS?: number;
    ARR?: number;
    rnd?: number;
    pr?: number;
    hold?: boolean;
    bbs?: number;
    grav?: number;
    mess?: number;
    gDelay?: number;
    hostStart?: boolean;
    noFW?: boolean;
    sa?: boolean;
    gInv?: boolean;
    gapW?: number;
    as?: number;
    asEx?: string;
    sgp?: number;
    sgpA?: number[];
  }

  // Utilities
  const enum Modes {
    SPRINT = 1,
    PRACTICE = 2,
    CHEESE_RACE = 3,
    SURVIVAL = 4,
    ULTRA = 5,
    MAPS = 6,
    TSD20 = 7,
    PC_MODE = 8,
    USERMODE = 9,
    BOT = 10,
  }
}

/** Specifies translatable strings throughout the game. */
declare const i18n: Jstris.I18n;

/** */
declare const Score: Scoring;

declare const Action: Readonly<{
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
}>;

declare const Aux: Readonly<{
  AFK: 0;
  BLOCK_SET: 1;
  MOVE_TO: 2;
  RANDOMIZER: 3;
  MATRIX_MOD: 4;
  WIDE_GARBAGE_ADD: 5;
}>;
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
declare function getKeyByValue<T>(object: object, value: T): keyof typeof object;

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
declare function objCopy(object: object): object;

/**
 * Determines whether an array includes a certain element.
 * @deprecated Jstris uses {@link Array.includes() `Array.prototype.includes()`} instead.
 * @param array The array to search.
 * @param value The value to search for.
 * @returns `true` if the given value is in the array, `false` otherwise.
 */
declare function arrayContains<T>(array: T[], value: T): boolean;

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
declare function arrayUnique<T>(array: T[]): T[];

/**
 * Creates a shallow copy of a 2D matrix.
 * @param matrix The matrix to copy.
 * @returns The matrix copy.
 */
declare function copyMatrix<T extends number[][]>(matrix: T): T;

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
declare function loadSkin(url: string, size?: number, settings?: object): void;

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
declare function loadVideoSkin(url: string, videoOptions: Jstris.VideoOptions): void;

/**
 * Joins a multiplayer room.
 * @param roomID ID of the room to join.
 */
declare function joinRoom(roomID: string): void;

declare function loadSFX(sfx: SFXsets | VSFXsets, useVoice?: 0 | 1): void;

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
  SFXset: BaseSFXset | null;
  VSFXset: BaseSFXset | null;
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
  linesAttackDef: Jstris.AttackTable;
  linesAttack: Jstris.AttackTable;
  cheeseHeight: number;
  ghostEnabled: boolean;
  getPPS(): number;
  comboAttackDef: Jstris.ComboTable;
  comboAttack: Jstris.ComboTable;
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
  conf: [Jstris.Ruleset, Jstris.Ruleset];
  /** Refers to `this.conf[0]`. */
  R: Jstris.Ruleset;
  Settings: Settings;
  Caption: GameCaption;
  Live: Live;
  Replay: Replay;
  Scoring: Scoring;
  MapManager: MapManager;
  ModeManager: ModeManager;
  GameStats: StatsManager;
  Mobile: Mobile;
  Bots: Bots;
  Replay2: Replay2;

  rollBigSpawn(): void;
  loadGhostSkin(url: string, size: number): void;
  changeSkin(skinIndex: number): void;
  initSFX(): void;
  changeSFX(sfx: BaseSFXset, useVoice?: 0 | 1): void;
  loadSounds(sfx: BaseSFXset, prefix: string): void;
  drawGrid(mode: number): void;
  /**
   * Returns the currently played game mode.
   * @param isLive Seems to toggle the check for live race game mode.
   */
  isPmode(isLive: boolean): number;
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
  getPlaceColor(place: number): { str: string; color: string };
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
  updateLiveMatrix(slot: number, matrix: Jstris.Matrix, redBar: number): void;
  /**
   * Plays specified sound or sounds.
   * @param soundOrSounds Sound or sounds to play.
   * @param type `1` for regular sounds, `2` for voice samples.
   */
  playSound(soundOrSounds: string | string[], type?: number): void;
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
  /**
   * Shows the appropriate sprint info element, or replaces "lines remaining" text.
   * @param mode Stat to show:
   * - 0: Lines remaining,
   * - 1: Time remaining,
   * - 2: T-spin Doubles,
   * - 3: Perfect Clears.
   *
   * If string is passed, it will replace the "lines remaining" text with the text.
   */
  sprintInfoLineContent(modeOrText: 0 | 1 | 2 | 3 | string): void;
  evalPCmodeEnd(): void;
  savePlacementTime(): void;
  getCurrentPPS(): number;
  isHardDropAllowed(): boolean;
  setSpeedLimit(PPSlimit: number): void;
  setupGameLinks(): void;
}

declare class GameCore {
  constructor(isGame: boolean);
  ISGAME: boolean;
  randomizer: Jstris.Randomizer | null;
  /** A 20 x 10 array specifying blocks in the visible area of the playfield. */
  matrix: Jstris.Matrix;
  /** A 1 x 10 array specifying blocks in the hidden row. */
  deadline: Jstris.MatrixRow;
  /** Specifies piece sets used in the game. */
  blockSets: Jstris.BlockSets;
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
  gamedata: Jstris.GameData;
  skins: {
    id: number;
    name: string;
    data: string;
    w: number;
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
  R: Jstris.Ruleset;
  DEF: Jstris.Ruleset;

  canvas: HTMLCanvasElement;
  holdCanvas: HTMLCanvasElement;
  queueCanvas: HTMLCanvasElement;
  v: WebGLView | Ctx2DView | View;
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
  SFXset: BaseSFXset | null;
  VSFXset: BaseSFXset | null;
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
  redBar: number;
  incomingGarbage: [garbageInSegment: number, timestamp: number][];
  solidHeight: number;
  solidToAdd: number;
  solidInterval: number | null;
  solidProfiles: [[0, 3], [0, 3, 2.8, 2.6, 2.4, 2.2, 2, 1.8, 1.6, 1.4, 1.2, 1, 31, 1, 1, 1, 1, 1, 1, 1], null, null];
  garbageCols: number[];
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
  linesAttackDef: Jstris.AttackTable;
  linesAttack: Jstris.AttackTable;
  cheeseHeight: number;
  ghostEnabled: boolean;
  getPPS(): number;
  comboAttackDef: Jstris.ComboTable;
  comboAttack: Jstris.ComboTable;
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
  Settings: Settings;
  Caption: GameCaption;
  Live: Live;
  Replay: Replay;
  Scoring: Scoring;
  MapManager: MapManager;
  ModeManager: ModeManager;
  GameStats: StatsManager | SimpleStatsManager;
  Mobile: Mobile;
  Bots: Bots;
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
  last: number;

  randomizerFactory(randomizerID: number, pre_seed: AleaPRNG): Jstris.Randomizer;
  initRandomizer(randomizerID: number): void;
  getRandomizerBlock(randomizer?: Jstris.Randomizer): Block;
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
  getQueuePreview(randomizer: Jstris.Randomizer): Block[];
  generateQueue(): void;
  addGarbageFromQueue(timestamp: number): void;
  addGarbage(amountOfLines: number): number | null;
  addToGarbageQueue(garbageToAdd: number): void;
  /**
   * Plays specified sound or sounds.
   * @param soundOrSounds Sound or sounds to play.
   * @param type `1` for regular sounds, `2` for voice samples.
   */
  playSound(soundOrSounds: string | string[], type?: number): void;
  getAPM(): number;
  getKPP(): number;
  getVS(): number;
  getWasted(): number;
  score(scoring: number, multiplier: number): void;
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

declare class Replayer extends GameCore {
  constructor(view: View);
  v: View | SlotView;
  // temporaryBlockSet = null;
  reachedEnd: boolean;
  pmode: number;
  subMode: number;
  activeBlock: Block;
  ghostPiece: {
    pos: {
      x: number;
      y: number;
    };
  };
  timer: number;
  frames: number;
  gameStep: number;
  softDrop: boolean;
  softDropId: number;
  holdPressed: boolean;
  holdUsedAlready: boolean;
  redBar: number;
  solidHeight: number;
  solidToAdd: number;
  solidInterval: number | null;
  blockInHold: Block | null;
  ghostEnabled: boolean;
  placedBlocks: number;
  finesse: number;
  used180: number;
  totalFinesse: number;
  totalKeyPresses: number;
  // finFaults = null;
  // scoreStamps
  linesAttack: Jstris.AttackTable;
  comboAttack: Jstris.ComboTable;
  timeRemaining: number;
  linesRemaining: number;
  RNG: AleaPRNG;
  blockRNG: AleaPRNG;
  r: Jstris.ReplayInfo;
  actions: Jstris.Action[];
  debug: boolean; // Actually a 0 (number), but nothing sets this property in replayer.js, and 0 is falsy.
  Analytics: Analytics;
  Scoring: Scoring;
  // data = null;
  byte: number;
  bitpos: number;
  timeout: number | null;
  playingLive: boolean;
  frameId: number;
  GameStats: SimpleStatsManager;

  ptr: number;

  getRandomizer(replayVersion: number, seed: string): void;
  initReplay(): void;
  loadMap(matrix: Jstris.Matrix, staticQueue: string | null): void;
  pullBits(amountOfBits: number): number | null;
  loadBinaryActionsV3(): void;
  initSetOnce(): void;
  restart(): void;
  moveCurrentBlock(direction: number, timestamp: number): void;
  hardDrop(): void;
  GameOver(): void;
  /** Fills the map queue with pieces set by the randomizer if the game mode is set to Maps and the map has no static queue set. */
  refillQueue(): void;
  redraw(): void;
  getNextBlock(): void;
  /** Returns the currently played game mode. */
  isPmode(): number;
  getComboAttack(combo: number): number;
  /** Adds garbage from the queue. */
  // @ts-expect-error This method breaks the Liskov's substitution principle.
  addGarbage(amountOfLines: number, selectedColumn: number, garbageWidth: number, invertGarbage: boolean): void;
  garbage_add_adv(amountOfLines: number, selectedColumn: number, garbageWidth: number, invertGarbage: boolean): void;
  processAction(replayAction: ReplayAction): void;
  applyGravitySteps(): void;
  playLive(replayActions: ReplayAction[]): void;
  playByTimeouts(): void;
  playUntilTime(timestamp: number): void;
  getPPS(): number;
  timestamp(): number;
  score(scoring: number, multiplier: number): void;
}

/** Written like a static class */
declare interface Replay2Common {
  readonly FRAME_TYPE: Readonly<{
    FULL: 0;
    DIFF: 1;
  }>;
  readonly PROPERTY: Readonly<{
    MATRIX: 0;
    MATRIX_CHANGE: 1;
    MATRIX_BITMASK: 2;
    CURRENT_BLOCK: 3;
    CURRENT_BLOCK_STATE: 4;
    HOLD_BLOCK: 5;
    QUEUE: 6;
    QUEUE_SHIFT: 7;
    RULESET: 8;
    SOUND_EFFECT: 9;
    CAPTION_CHANGE: 10;
    SCORE: 11;
  }>;
  readonly RULESET_PROP: Readonly<{
    GHOST: 0;
    SKIN_ID: 1;
  }>;
  readonly DIFF_FRAME_TIMESTAMP_BITS: 15;
  readonly DIFF_FRAME_MAX_TIME: 32767;
  readonly FULL_FRAME_INTERVAL: 32767;
  readonly TIMESTAMP_SMALL_THRESHOLD: 64;
  readonly TIMESTAMP_MEDIUM_THRESHOLD: 512;
  readonly TIMESTAMP_SMALL_BITS: 6;
  readonly TIMESTAMP_MEDIUM_BITS: 9;
  readonly TIMESTAMP_LARGE_BITS: 15;
  readonly TIMESTAMP_SMALL_MAX: 63;
  readonly TIMESTAMP_MEDIUM_MAX: 511;
  readonly TIMESTAMP_LARGE_MAX: 32767;
  readonly POSITION_DELTA: Readonly<{
    LEFT: 0;
    RIGHT: 1;
    DOWN: 2;
    ROTATE_CW: 3;
    ROTATE_CCW: 4;
    ROTATE_180: 5;
    RESERVED: 6;
    ABSOLUTE: 7;
  }>;
  readonly SCORING_EVENTS_WITH_COUNT: Readonly<{
    0: true;
    13: true;
  }>;
  readonly CAPTION_POSITION: Readonly<{
    LREM: 0;
    SPRINT_INFO: 1;
  }>;
  readonly DEFAULT_CONFIG: Readonly<Jstris.Replay2.Config>;
  // Frame is defined in a namespace - only namespaces can be used to define inner classes.
  createFrame(type: number, timestamp: number): Replay2Common.Frame;

  encodeVariableLengthTimestamp(stream: ReplayStream2, deltaT: number): void;
  decodeVariableLengthTimestamp(stream: ReplayStream2): number | null;
  calculateVariableLengthBits(something: number): number;
  calculateTimestampSavings(frames: number[]): Jstris.Replay2.TimestampSavings;
  calculatePositionDelta(
    beforeX: number,
    beforeY: number,
    beforeState: number,
    afterX: number,
    afterY: number,
    afterState: number
  ): number;
  decodePositionState(positionState: number): Jstris.Replay2.PositionState;
  encodePositionState(x: number, y: number, rotationState: number): number;
  applyPositionDelta(x: number, y: number, rotationState: number, type: number): Jstris.Replay2.PositionState;
  calculatePositionSavings(positionTypeArray: number[]): Jstris.Replay2.PositionSavings;
}

/**
 * @experimental
 */
declare namespace Replay2Common {
  export class Frame {
    constructor(type: number, timestamp: number);
    type: number;
    timestamp: number;
    matrix: Jstris.Matrix;
    matrixChanges: Jstris.Replay2.MatrixChange[];
    matrixBitmask: Jstris.Replay2.MatrixBitMask;
    currentBlock: Jstris.Replay2.CurrentPiece;
    holdBlock: Jstris.Replay2.Piece;
    queue: Jstris.Replay2.Piece[];
    queueShift: Jstris.Replay2.Piece;
    events: Jstris.Replay2.Event[];
    score: Jstris.Replay2.Score[];
    ruleset: Jstris.Replay2.Ruleset;
    caption: { [ID in Jstris.Replay2.PotentialCaptionIDs]?: string | null };

    isEmpty(): boolean;
  }
}

/** @experimental */
declare const Replay2Common: Replay2Common;

/** @experimental */
declare class ReplayStream2 {
  constructor();
  data: number[];
  datapos: number;
  bitpos: number;
  wordSize: number;
  byte: number;

  pushBits(number: number, numberBitWidth: number): void;
  pullBits(amountOfBits: number): number;
}

/** @experimental */
declare class Replay2Decoder {
  constructor();
  readonly FRAME_TYPE: Replay2Common["FRAME_TYPE"];
  readonly PROPERTY: Replay2Common["PROPERTY"];
  readonly DIFF_FRAME_TIMESTAMP_BITS: 15;
  readonly DIFF_FRAME_MAX_TIME: 32767;
  stream: ReplayStream2;
  frames: Replay2Common.Frame[];
  lastFullFrameTime: number;
  verbose: boolean;
  currentPositionState: Jstris.Replay2.PositionState;
  config: Jstris.Replay2.Config;

  pushFrame<Frame extends Replay2Common.Frame>(frame: Frame): Frame;
  logFrameDecoding(param1: unknown, param2: unknown): void;
  decode(base64String: string): ReturnType<Replay2Decoder["decodeFromBinary"]>;
  decodeFromBinary(arrayBuffer: ArrayBuffer): Replay2Common.Frame[];
  decodeFrameProperties(frame: Replay2Common.Frame): void;
  /**
   * @param frame The frame.
   * @param eventType An unsigned 4-bit integer (0 to 15).
   */
  decodeEventData(frame: Replay2Common.Frame, eventType: number);
  /**
   * @deprecated Work in progress
   * @experimental
   */
  getReplayData(): {
    frames: Replay2Decoder["frames"];
    c: Replay2Decoder["config"];
    format: "replay2";
  };
}

/**
 * @experimental
 */
declare class Replay2 {
  constructor(game: Game);
  FRAME_TYPE: Replay2Common["FRAME_TYPE"];
  PROPERTY: Replay2Common["PROPERTY"];
  readonly DIFF_FRAME_TIMESTAMP_BITS: 15;
  readonly DIFF_FRAME_MAX_TIME: 32767;
  readonly FULL_FRAME_INTERVAL: 32767;
  config: Jstris.Replay2.Config;
  frames: Replay2Common.Frame[];
  lastFullFrameTime: number;
  lastFullFrameIndex: number;
  stream: ReplayStream2;
  /** This probably should be a callback, but it's not defined anywhere, not even in Game. */
  onSaved: null;
  verbose: boolean;
  p: Game;
  currentFrameTimestamp: number;
  currentFrame: Replay2Common.Frame | null;
  workingFullState: ReplayState;
  currentState: ReplayState;
  scoringQueue: {
    [scoring in Jstris.Replay2.PotentialScoringActions]: number;
  };

  // Hooray for jezevec for making constants static!
  // At least some of them, as there are some other constants that are on every instance of Replay2.
  static readonly FULL_FRAME_PROPERTIES: Readonly<["matrix", "currentBlock", "holdBlock", "queue"]>;
  static readonly FULL_FRAME_BANNED_PROPERTIES: Readonly<
    ["matrixChanges", "matrixBitmask", "positionDelta", "queueShift"]
  >;

  pushFrame<Frame extends Replay2Common.Frame>(frame: Frame): Frame;
  /**
   * Decides whether the timestamp is on a full frame or not.
   * @param timestamp Timestamp (in milliseconds)
   */
  shouldBeFullFrame(timestamp: number): boolean;
  /**
   * Creates a new frame
   * @param timestampSec Timestamp (in **seconds**).
   */
  createFrame(timestampSec: number): Replay2Common.Frame;
  finalizeCurrentFrame(): void;
  processScoringQueue(): void;
  getCurrentFrame(timestampSec: number): Replay2Common.Frame;
  onMatrix(timestampSec: number): void;
  onHold(timestampSec: number): void;
  onQueue(timestampSec: number): void;
  onScore(scoring: number, multiplier: number): void;
  onRuleset(timestampSec: number, ruleset: { [rule: string]: unknown }): void;
  onCaption(timestampSec: number, captions: { [caption: string]: string }): void;
  // TODO
  trimTextToMaxBytes();
  canUseQueueShift();
  onGameStart();
  setMatrix();
  addMatrixChange();
  setCurrentBlock();
  countMatrixDifferences();
  getMatrixChangesList();
  getMatrixBitmask();
  setHoldBlock();
  populateFullFrameState();
  setQueue();
  addEvent();
  clear();
  encodeFrameProperty();
  encodeEventData();
  logFrameEncoding();
  encodeFrame();
  getRawData(): Uint32Array;
  getBlobData(): string;
  getData();
  postData();
}

declare class ReplayState {
  constructor();
  currentBlockType: number;
  currentBlockSet: number;
  currentBlockState: number;
  currentBlockX: number;
  currentBlockY: number;
  currentBlockRotation: number;
  holdBlockType: number;
  holdBlockSet: number;
  matrix: Jstris.Matrix;
  queue;
  rulesetGhost;
  rulesetSkinId;
  captions;

  /** Mutates the `otherReplayState`. */
  copyTo(otherReplayState: ReplayState): void;
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
  nextSegment(unusedParameter?: unknown): void;
  getBlock(unusedParameter?: unknown): Block;
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

  g: Game;
  slot: Slot;
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
  updateLiveMatrix(matrix: Jstris.Matrix, redBar: number): void;
  updateTextBar(): void;
  /** Empty function. */
  onCreate(): void;
  onReady(): void;
  onRestart(): void;
  onBlockHold(): void;
  onBlockMove(unusedParameter?: unknown): void;
  /** Empty function. */
  onFinesseChange(): void;
  onGameOver(): void;
  /**
   * Empty function.
   */
  onBlockLocked(): void;
  /** Empty function. */
  onLinesCleared(attack: number, comboBonus: number, scoringOptions: Jstris.ScoringOptions): void;
  /** Empty function. */
  onScoreChanged(): void;
  onResized(): void;
  printTextBg(): void;
  printSlotPlace(): void;
  printSlotNotPlaying(): void;
  printSlotKO(): void;
  afterRedraw(): void;
}

declare class WebGLView {
  constructor(game: Game);
  g: Game;
  ctxs: Jstris.GLContextDefinition[];
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
  initGLContext(ctx: Jstris.GLContextDefinition): void;
  initRenderer(): void;
  initRedbarTexture(ctx: Jstris.GLContextDefinition, id: number): void;
  initEmptyTexture(ctx: Jstris.GLContextDefinition, id: number): void;
  loadTexture(id: number, source: string): void;
  drawImage(
    ctx: Jstris.GLContextDefinition,
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
  redrawRedBar(shouldClear: boolean): void;
  drawClearLine(row: number, alpha: number): void;
  setAlpha(alpha: number): void;
  clearRect(startX: number, startY: number, endX: number, endY: number): void;
  setupGif(URL: string, videoOptions: Jstris.VideoOptions): void;
  realSetupGif(URL: string): void;
  updateGifTexture(ctx: CanvasRenderingContext2D, source: string): void;
  setupVideo(URL: string, videoOptions: Jstris.VideoOptions): void;
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
  redrawRedBar(shouldClear: boolean): void;
  drawClearLine(row: number, alpha: number): void;
  setAlpha(alpha: number): void;
  clearRect(startX: number, startY: number, endX: number, endY: number): void;
  createFastFont(): FastFont2D;
}

declare class View {
  g: Game;
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
  sprintInfo: HTMLDivElement;
  lrem: HTMLDivElement;
  statTable: HTMLTableSectionElement;
  block_size: number;
  drawScale: number;
  SEenabled: boolean;
  replaySEset: number;
  SFXset: BaseSFXset | null;
  tex: HTMLImageElement;
  skinId: number;
  ghostSkinId: number;
  redrawBlocked: boolean;
  ghostEnabled: boolean;
  QueueHoldEnabled: boolean;

  constructor(nameDefinition: Jstris.ViewNameDefinition);
  changeSkin(skinID: number): void;
  changeSFX(sfxSet: BaseSFXset): void;
  loadSounds(): void;
  loadSounds2(sfxSet: BaseSFXset, prefix: string): void;
  drawBgGrid(unusedParameter?: unknown): void;
  drawGhostAndCurrent(): void;
  redraw(): void;
  clearMainCanvas(): void;
  clearHoldCanvas(): void;
  clearQueueCanvas(): void;
  drawBlockOnCanvas(x: number, y: number, blockID: number, ctxID: number): void;
  drawBlock(x: number, y: number, blockID: number): void;
  drawGhostBlock(x: number, y: number, blockID: number): void;
  drawRectangle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    fillStyle: string | CanvasGradient | CanvasPattern
  ): void;
  drawLine(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number): void;
  paintMatrixWithColor(blockID: number): void;
  updateTextBar(): void;
  onCreate(): void;
  setupMode(): void;
  /**
   * Shows the appropriate sprint info element.
   * @param mode Stat to show:
   * - 0: Lines remaining,
   * - 1: Time remaining,
   * - 2: T-spin Doubles,
   * - 3: Perfect Clears.
   */
  sprintInfoLineContent(mode: 0 | 1 | 2 | 3): void;
  onReady(): void;
  onRestart(): void;
  onBlockHold(): void;
  onBlockMove(): void;
  onGameOver(): void;
  onBlockLocked(): void;
  /**
   * Gets called with parameters in regular replays.
   *
   * Gets called witout any parameters in Replay2 format replays.
   * @param attack Attack due to the line clear.
   * @param comboBonus Additional attack due to combo.
   * @param scoringOptions Specifies type of the clear, current combo and whether B2B is present or not.
   */
  onLinesCleared(attack?: number, comboBonus?: number, scoringOptions?: Jstris.ScoringOptions): void;
  onTimeRemainingChanged(): void;
  onScoreChanged(): void;
}

/**
 * Class responsible for drawing the board in export.
 * Actually named `View` in-game.
 *
 * In order to modify this using TypeScript, you need to cast `View` to the type of this class:
 * ```ts
 * (View as unknown as typeof ExportView).prototype.myMethod = function () { ... }
 * ```
 *
 * Make sure that you check for whether the `View` is the export one, to not accidentally overwrite the replayer `View`.
 */
declare class ExportView {
  g: Replayer;
  readonly MAIN: 0;
  readonly HOLD: 1;
  readonly QUEUE: 2;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  /** Block size. */
  BS: number;
  drawScale: number;
  replaySEset: number;
  tex: HTMLImageElement;
  ghostSkinId: number;
  skinId: number;
  bgs: Jstris.ExportBackgroundDefinition[];
  bg: Jstris.ExportBackgroundDefinition;
  redrawBlocked: boolean;
  ghostEnabled: boolean;
  title: string;
  drawOffsetTop: number;
  drawOffsetLeft: number;
  QueueHoldEnabled: boolean;
  layout: Jstris.ExportLayoutDefinition;
  AP: {
    HLD: {
      T: number;
      L: number;
      BS: number;
    };
    STG: {
      L: number;
      T: number;
      H: number;
      W: number;
    };
    QUE: {
      L: number;
      T: number;
      BS: number;
      W: number;
    };
    TTL: unknown; // TODO: Find out what this does.
    STA: {
      T: number;
      L: number;
      W: number;
      FS: number;
    };
    H: number;
    W: number;
  };

  block_size?: number;

  constructor(settings: { main: string });

  readSettings(): void;
  loadBG(id: number): void;
  setBackgroundOptions(): void;
  computeAbsolutePositions(): void;
  changeSkin(skinID: number): void;
  /**
   * Draws the grid.
   * @param gridMode Unused parameter.
   */
  drawBgGrid(gridMode?: number): void;
  redraw(): void;
  drawGhostAndCurrent(): void;
  drawMainStage(): void;
  clearMainCanvas(): void;
  clearHoldCanvas(): void;
  clearQueueCanvas(): void;
  drawBlockOnCanvas(x: number, y: number, blockID: number, ctxID: number): void;
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
  /** Draws an image onto the canvas, with destination offset by `drawOffsetLeft` and `drawOffsetTop`. */
  drawImage(
    ctx: CanvasRenderingContext2D,
    image: CanvasImageSource,
    sourceX: number,
    sourceY: number,
    sourceWidth: number,
    sourceHeight: number,
    destX: number,
    destY: number,
    destWidth: number,
    destHeight: number
  ): void;
  drawLine(ctx: CanvasRenderingContext2D, startX: number, startY: number, destX: number, destY: number): void;
  paintMatrixWithColor(blockID: number): void;
  updateTextBar(): void;

  onCreate(): void;

  setupMode(): void;
  sprintInfoLineContent(): void;
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
  cidSlots: object;
  nameFontSize: number;
  nameHeight: number;
  redBarWidth: number;
  slots: Slot[];
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

declare class SoundQueue {
  constructor();
  playingSound: null;
  queue: Jstris.SoundDefinition[];

  add(sound: string, volume: number): void;
  stop(): void;
  private _playTask(soundDefinition: Jstris.SoundDefinition): void;
  private _next(): void;
}

declare class LineClearAnimator {
  constructor(matrix: Jstris.Matrix, clearPositions: number[], game: GameCore);
  g: GameCore;
  matrix: Jstris.Matrix;
  clearPositions: number[];
  clearDelay: number;
  t: number;
  IS_SOLID: boolean;

  render(timeDelta_ms: number): void;
  finished(): void;
}

declare class RulesetManager {
  constructor(game: Game);
  p: Game;
  modeMenu: HTMLDivElement;
  DEF: Jstris.Ruleset;
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
    c: [object];
  }[];
  readonly MODES: {
    /** Mode ID. */
    id: number;
    /** Mode name */
    n: string;
    /** Submodes available for the given mode. */
    modes: {
      /** Submode ID. */
      id: number;
      /** Submode name. */
      n: string;
      /** Ruleset IDs in which the submode is available. */
      rs: number[];
      /** Friendly submode name, appears as a text on a button. */
      fn?: string;
      /** Added later by methods in {@link RulesetManager}. */
      elem?: HTMLDivElement;
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
   * @param shouldAdjustToValidMode Whether the mode should be adjusted to a valid one. Defaults to `true` if not provided.
   */
  ruleSetChange(rulesetID: number, shouldAdjustToValidMode?: boolean): void;
  createOptions(): void;
  closeCombo(event: Event): true;
  toggleCombo(event: Event, elementToAppendTo: HTMLElement): void;
  registerCombo(): void;
  /** Empty function. */
  afterRuleChange(ruleset: Jstris.Ruleset): void;
  forceApplyChanges(ruleset: Jstris.Ruleset): void;
  /**
   * Applies rule changes to the ruleset.
   * @param ruleChange The object contatining rules to change.
   * @param ruleset The ruleset which should be changed.
   * @param pullFromDefinition Whether the rules should be pulled from the default definition. Defaults to `true` if not provided.
   */
  applyRule(ruleChange: object, ruleset: Jstris.Ruleset, pullFromDefinition?: boolean): void;
  /**
   * Applies rule changes from the preset to the ruleset.
   * @param ruleChange The object contatining rules to change.
   * @param ruleset The ruleset which should be changed.
   * @param pullFromDefinition Whether the rules should be pulled from the default definition. Defaults to `true` if not provided.
   * @returns Object containing changed rules.
   */
  applyPresetRule(ruleChange: object, ruleset: Jstris.Ruleset, pullFromDefinition?: boolean): object;
  /**
   * Adds/Changes rules to/in a specified ruleset.
   * @param rulesToAppend The object contatining rules to add/change.
   * @param ruleset The ruleset which should be changed.
   */
  appendRule(rulesToAppend: object, ruleset: Jstris.Ruleset): void;
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
  controls: Jstris.Controls;
  soundEnabled: boolean;
  DMsound: boolean;
  /** Move left */
  ml: Jstris.KeyCode;
  /** Move right */
  mr: Jstris.KeyCode;
  /** Soft drop */
  sd: Jstris.KeyCode;
  /** Hard Drop */
  hd: Jstris.KeyCode;
  /** Rotate left */
  rl: Jstris.KeyCode;
  /** Rotate right */
  rr: Jstris.KeyCode;
  /** Hold (**h**old **k**ey)*/
  hk: Jstris.KeyCode;
  /** Rotate 180 (**d**ouble **r**otate?) */
  dr: Jstris.KeyCode;
  touchControlsEnabled: boolean;
  touchControls: boolean;
  gridMode: number;
  SFXsetID: number;
  VSFXsetID: number;
  restartSprintOnFF = false;
  rescaleNow: boolean;
  defaultMonochrome: "#5c5c5c";
  shownStats: number[];

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
  captions: {
    /** Spectator Mode caption. */
    "1"?: HTMLDivElement;
    /** Out of focus caption. */
    "2"?: HTMLDivElement;
    /** Ready? Go! caption. */
    "3"?: HTMLDivElement;
    /** Placement caption. */
    "4"?: HTMLDivElement;
    /** Speed limit caption. */
    "5"?: HTMLDivElement;
    /** Map/Usermode loading caption. */
    "6"?: HTMLDivElement;
    /** New personal best caption. */
    "7"?: HTMLDivElement;
    /** Loading caption. */
    "8"?: HTMLDivElement;
    /** Race finished caption. */
    "9"?: HTMLDivElement;
    /** Game warning caption. */
    "10"?: HTMLDivElement;
    /** Usermode task caption. */
    "11"?: HTMLDivElement;
    /** Usermode completed caption. */
    "12"?: HTMLDivElement;
    /** Usermode paused "caption". */
    "13"?: HTMLDivElement;
    /** Usermode button "caption". */
    "14"?: HTMLDivElement;
  };
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
  /** *sic!* */
  speedTimout: number | null;

  create(): HTMLDivElement;
  hide(captionType?: number): void;
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
  _fadeOut(caption: HTMLDivElement, timeoutMs: number, transitionTimerSec?: number, opacity?: number): void;
  newPB(PBinfo: Jstris.PersonalBestInfo | boolean): void;
  /**
   * Displays a loading caption.
   * @param captionText Caption text.
   * @param imageType Image type: `1` for a cross, `2` for a trollface, animated spinner if not provided.
   */
  loading(captionText: string, imageType?: undefined | 0 | 1 | 2): void;
  liveRaceFinished(): void;
  gameWarning(warningTitle: string, warningDescription?: string, options?: { fade_after?: number }): void;
}

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
  servers: Jstris.Servers | null;
  serverId: string;
  joinRemote: {
    rid: string;
    sess: string;
    srvId: string;
    t: number;
    ts: number;
  } | null;
  createRoomRequest: Jstris.RoomConfig | null;
  connectionTimeout: number | null;
  wasConnected: boolean;
  clients: Jstris.Clients;
  /** Array of CIDs of players. */
  players: number[];
  /** Unkown - this is empty even in a bot match. */
  bots: unknown[];
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
  roomConfig: Jstris.RoomConfig | null;
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
  getAuthorizedNameLink(clientName: string, clientType: number, client: Jstris.Client): string;
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
  displayLobby(lobbyList: Jstris.LobbyList): void;
  setupLobbyHandlers(): void;
  resetWinCounter(): void;
  displayResults(resultsList: Jstris.ResultsList, displayFullStats: boolean): void;
  displayTeamResults(teamResultsList: Jstris.TeamResultsList): void;
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
  decodeActionsAndPlay(replayData: number[], hasTimestamp: boolean): void;
  updateLiveMatrixViaSnapshot(rc: number, redBar: number, matrix: Jstris.Matrix): void;
  onClose(event: Event): void;
  useProxy(): void;
  changeServer(): void;
  connect(): void;
  parseBinaryMatrix(unknownParameter: string, trueHeight: number): Jstris.Matrix;
  sendReplayConfig(): void;
  sendRepFragment(unknownParameter1: number[], unknownParameter2: boolean): void;
  sendSnapshot(matrix: Jstris.Matrix): void;
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
  sendAttack(attack: number, comboAttack: number, scoringOptions: Jstris.ScoringOptions): void;
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
  onReplaySaved(replayResponse: Jstris.ReplayResponse): void;
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
  afkQueue: unknown[];
  stream: ReplayStream;
  /** Bound to {@link Live.onReplaySaved | `Live.onReplaySaved(replayResponse)`} with `this` object being the `Live` instance. */
  onSaved: (this: Live, replayResponse: Jstris.ReplayResponse) => void | null;
  /** Bound to {@link Game.onMove | `Game.onMove(replayAction)`} with `this` object being the `Game` instance. */
  onMoveAdded: (this: Game, replayAction: ReplayAction) => void | null;

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
  matrix: Jstris.Matrix;
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
  getLowestMapLine(unusedParameter?: unknown): void;
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
  timeTriggers: unknown[];
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
  staticQueue: string;
  repeatQueue: boolean;
  skinWasChanged: boolean;
  lastAttackGarbageColumn: number;
  mathEvaluate: (expression: string | string[]) => unknown | null;
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
  getNamedStatVal(statNameOrID: string | number, gamedata: Jstris.GameData): [value: number, name: string] | null;
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
  addStaticQueueToQueue(replaceActivePiece?: boolean): void;
  registerTimeTrigger(time: number | string): ModeTrigger;
  registerCommandTrigger(triggerID: number, value: number): ModeTrigger;
  registerVar(variableName: string): void;
  prepare(modeID?: number | string): void;
  isClearMatrix(): boolean;
}

declare class StatsManager {
  stats: { [statName: string]: StatLine };
  ordered: StatLine[];
  dirty: boolean;
  labelsElem: HTMLDivElement;
  shown: number;

  setView(view: WebGLView | Ctx2DView): void;
  adjustToGameMode(): void;
  initDefault(unusedParameter: unknown): void;
  applyShownStats(shown: number): void;
  get(stat: string): StatLine;
  render(): void;
  addStat(statLine: StatLine, shouldReorder: boolean): void;
  reorder(): void;
  resetAll(): void;
}

declare class StatLine {
  id: string;
  order: number;
  manager: StatsManager;
  enabled: boolean;
  label: HTMLSpanElement;
  initialVal: "0";
  value: string | number;
  resets: true;
  locked: boolean;

  constructor(id: string, name: string, order: number);

  set(value: string | number): this;
  enable(): this;
  disable(): this;
  reset(): this;
  setLock(lockState: boolean): this;
  setOrder(order: number): this;
}

declare class Mobile {}

declare const SFXsets: Jstris.SFXSetDefinition[];

declare const VSFXsets: Jstris.SFXSetDefinition[];

declare class FastFont {}

declare class FastFont2D {}

/** https://github.com/hammerjs/hammer.js */
declare class Hammer {}

/**
 * Color Picker
 */
declare class CP {}

declare class RoomInfo {
  constructor(live: Live);
  l: Live;
  roomDetailBox: HTMLDivElement | null;
  timeoutRequestDetail: number | null;
  timeoutRoomDetail: number | null;
  rdParts: {
    detail: HTMLDivElement;
    title: HTMLDivElement;
    spinner: HTMLDivElement;
    content: HTMLDivElement;
    settings: HTMLDivElement;
    settingsTitle: HTMLDivElement;
    settingsContent: HTMLDivElement;
    limit: HTMLDivElement;
  };
  roomDetails: {
    [roomID: string]: Jstris.RoomDetails;
  };
  /** Internationalized names for On and Off. */
  readonly ON_OFF: [string, string];
  /** Short config names. */
  readonly CONF_NAMES: {
    /** Attack Table */
    at: string;
    /** Combo Table */
    ct: string;
    /** Lock Delay */
    ld: string;
    /** Clear Delay (ms) */
    cd: {
      /** Config name. */
      n: string;
      /** Config unit. */
      u: string;
    };
    /** Delayed Auto Shift (ms) */
    DAS: {
      /** Config name. */
      n: string;
      /** Config unit. */
      u: string;
    };
    /** Auto Repeat Rate (ms). */
    ARR: {
      /** Config name. */
      n: string;
      /** Config unit. */
      u: string;
    };
    /** Garbage distribution method. */
    gdm: {
      /** Config name. */
      n: string;
      /** Config values. */
      v: [null, string, string, null, string, string, string, string];
    };
    /** Garbage blocking method. */
    gblock: {
      /** Config name. */
      n: string;
      /** Config values. */
      v: [string, string, string, string];
    };
    /** Randomizer. */
    rnd: {
      /** Config name. */
      n: string;
      /** Config values. */
      v: [string, string, string, string, string, string, string, string, string, string, string];
    };
    /** Amount of previews. */
    pr: string;
    /** Hold. */
    hold: string;
    /** Piece set. */
    bbs: {
      /** Config name. */
      n: string;
      /** Config values. */
      v: [null, string, string, string, string, string, string, string, string];
    };
    /** Gravity level. */
    grav: string;
    /** Garbage messiness (%). */
    mess: {
      /** Config name. */
      n: string;
      /** Config unit. */
      u: string;
    };
    /** Garbage delay (ms). */
    gDelay: {
      /** Config name. */
      n: string;
      /** Config unit. */
      u: string;
    };
    /** HostStart. */
    hostStart: string;
    /** Invert garbage. */
    gInv: string;
    /** Garbage hole width. */
    gapW: string;
    /** No 4-wide. */
    noFW: string;
    /** Ghost piece. */
    ghost: {
      /** Config name. */
      n: string;
      /** Config values. */
      v: {
        "-1": string;
        0: string;
        1: string;
      };
    };
    /** Attack as solid. */
    sa: string;
    /** All-spin. */
    as: {
      /** Config name. */
      n: string;
      /** Config values. */
      v: [string, string, string];
    };
    /** All-spin exclusion list. */
    asEx: string;
    /** Solid garbage profile. */
    sgp: {
      /** Config name. */
      n: string;
      /** Config values. */
      v: [string, string, string, string];
    };
  };
  /** Limit names and units. */
  readonly LIMIT_NAMES: {
    /** APM. */
    apm: {
      /** Name. */
      n: string;
      /** Unit. */
      u: string;
    };
    /** Sprint 40L time. */
    sub: {
      /** Name. */
      n: string;
      /** Unit. */
      u: string;
    };
    /** Total Live playtime. */
    gt: {
      /** Name. */
      n: string;
      /** Unit. */
      u: string;
    };
  };

  onLobbyRefresh(): void;
  onLobbyClosed(): void;
  detailBoxEntered(unusedParameter: unknown): void;
  detailBoxLeft(unusedParameter: unknown): void;
  createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    CSSclasses: string[],
    elementToAppendTo: Node | null
  ): HTMLElementTagNameMap[K];
  requestRoomDetail(roomID: string): void;
  acceptRoomDetail(response: object): void;
  displayRoomDetail(id: string): void;
  displayLimit(roomDetails: Jstris.RoomDetails): void;
  displayConfig(roomDetails: Jstris.RoomDetails): void;
  displayPlayers(roomDetails: Jstris.RoomDetails): void;
  openRoomDetails(event: MouseEvent): void;
  closeRoomDetails(event: MouseEvent): void;
}

declare class ChatAutocomplete {
  inp: HTMLInputElement;
  hintParent: HTMLDivElement;
  prfx: string;
  hints: (() => string[]) | string[];
  /**
   * Object containing possible hints.
   * Keys of this object are emote names wrapped in `:`.
   * Values of this object are emote URLs.
   */
  hintsImg: { [wrappedEmoteString: string]: string };
  prefixInSearch: true;
  maxPerHint: 10;
  minimalLengthForHint: 1;
  addEmoteSurrounder: ":";
  wipePrevious: boolean;
  onWiped?: (string: string) => void;
  preProcessEmotes?: (emoteList: Jstris.EmoteList) => Jstris.EmoteList;
  onEmoteObjectReady?: (emoteList: Jstris.EmoteList) => void;
  moreEmotesAdded: boolean;
  selectedIndex: number;
  hintsElem: HTMLDivElement;

  constructor(inp: HTMLInputElement, hintParent: HTMLDivElement, prfx: string, hints?: () => void);

  clearEmotes(): void;
  initEmoteHints(): void;
  addEmotes(emoteList: Jstris.EmoteList): void;
  loadEmotesIndex(versionSupporterParam: string): void;
  init(): void;
  moveSelected(moveAmount: number): void;
  setSelected(index: number): void;
  processHint(currentWord: Jstris.CurrentWord): void;
  ReturnWord(text: string, caretPositio0: number): string;
  getCurrentWord(): Jstris.CurrentWord;
  GetCaretPosition(inputElement: HTMLInputElement): number;
  setCaretPosition(position: number): void;
}

declare class Friends {}

/**
 * Emote selector.
 *
 * This class has source available at https://github.com/jezevec10/JstrisEmotePicker/.
 */
declare class EmoteSelect {
  // Declared in constructor
  input: HTMLInputElement;
  emoteIndex: string | object[];
  container: HTMLDivElement;
  openBtn: SVGElement;
  path: string;
  groupEmotes: { [categoryName: string]: string };
  // Declared in init()
  emoteElem: HTMLDivElement;
  comment: Comment;
  emoteList: Jstris.EmoteList;
  // Declared in initializeContainers()
  searchElem: HTMLFormElement;
  searchBar: HTMLInputElement;
  optionsContainer: HTMLDivElement;
  emotesWrapper: HTMLDivElement;
  // Declared in initializeEmotes()
  groupList: string[];
  // Declared in createGroups()
  emojis: Jstris.EmoteList;
  groupsFragment: DocumentFragment;
  groupDiv: HTMLDivElement;
  groupName: HTMLHeadingElement;
  // Declared in donateInfo()
  donateLink: HTMLAnchorElement;
  icon: HTMLElement;
  span: HTMLSpanElement;
  // Declared in createImages()
  emotesFragment: DocumentFragment;
  emoteImg: HTMLImageElement;
  // Declared in selectGroup()
  selectionDiv: HTMLDivElement;
  groupImage: HTMLImageElement;
  // Declared in searchFunction()
  resultsFragment: DocumentFragment;
  searchResults: HTMLDivElement;
  emoteResult: HTMLImageElement;
  // Declared in lastUsed()
  recent: HTMLDivElement;
  lastUsedWrapper: HTMLDivElement;
  groupLink: HTMLImageElement;
  // Declared in updateLastUsed()
  usedImage: HTMLImageElement;

  constructor(
    element: HTMLInputElement,
    emoteIndex: string | object[],
    container: HTMLDivElement,
    openBtn: SVGElement,
    path: string,
    groupsEmote: { [categoryName: string]: string }
  );

  init(): Promise<void>;
  initializeContainers(): void;
  initializeEmotes(): void;
  createGroups(groups: string[]): Promise<void>;
  donateInfo(groups: string[]): void;
  getEmoteSource(emoteObj: Jstris.Emote): string;
  createImages(emotes: Jstris.EmoteList, target: EventTarget): Promise<void>;
  selectGroup(): void;
  showName(target: EventTarget): void;
  searchFunction(list: Jstris.EmoteList): void;
  setSource(changes: IntersectionObserverEntry[], observer: IntersectionObserver): void;
  chatEmote(target: EventTarget): void;
  getCaretPosition(): number;
  setCaretPosition(pos: number): void;
  lastUsed(): void;
  updateLastUsed(): void;
  setStoredEmotes(target: EventTarget): void;
  hideElem(): void;
  openButtonLogic(): void;
}

declare class ModeTrigger {}

declare class ReplayController {
  g: Replayer[];
  playSpeed: number;
  clock: number;
  listeners: { [eventName: string]: (() => void)[] };
  debug: boolean;

  constructor(replayer: Replayer);

  toggleRepControls(): void;
  addListener(eventName: string, listener: () => void): void;
  trigger(eventName: string): void;
  frame(): void;
  run(): void;
  update(timeDelta_ms: number): void;
  loadReplay(): false | void;
  allReplaysEnded(unusedParameter: unknown): boolean;
  pauseReplay(shouldPlay?: boolean): boolean;
  nextFrame(): void;
  prevFrame(): void;
  loadAtFrame(pointer: number): void;
  loadAtTime(timestamp: number): void;
  changeSpeed(): void;
  timestamp(): number;
  toggleAnalytics(show?: 1): void;
  keyInput(event: KeyboardEvent): void;
  getFinesse(): { finesse: number[]; scoreStamps: Jstris.ScoreStamp[] };
  fixUltraClockPrecision(): void;
  startDownloaders(): void;
}

declare class ReplayDownloader {
  id: number;
  elemID: string;
  elem: HTMLTextAreaElement;
  live: number;
  isDownloading: boolean;
  controller: ReplayController | null;
  spin?: HTMLImageElement;

  constructor(id: number, live: number, elementID: string, replayController?: ReplayController);

  onData(data: object): void;
  download(id: string, type: string): void;
  onError(errorMessage: string): void;
}

declare class SimpleStatsManager {}

// TODO
declare class Analytics {
  constructor(i: number);

  i: 0 | 1;
  controller: ReplayController;
  r: Jstris.ReplayData;
  actions: Jstris.Action[];
  harddrops: Jstris.HardDrop[];
  readonly segSize: 10;
  showGlobalAvg: boolean;
  showLocalSpeed: boolean;
  showCurrentPos: boolean;
  showRelAtk: boolean;
  scLayer0: HTMLCanvasElement;
  ctx0: CanvasRenderingContext2D;
  scLayer1: HTMLCanvasElement;
  ctx1: CanvasRenderingContext2D;
  tb: HTMLTableSectionElement;
  data: { finesse: number[]; scoreStamps: Jstris.ScoreStamp[] };
  // scoreFilter = [];

  segments: Jstris.Segment[];
}

declare class BaseSFXset {
  constructor();

  volume: number;
  comboTones: false | Jstris.SFXDefinition | (Jstris.SFXDefinition | null)[];
  maxCombo: number | null;
  getSoundUrl: (property: string) => string | null;
  getSoundUrlFromObj: (object: Jstris.SFXDefinition) => string;
  getSoundUrlFromObj: (object: null) => null;
  /**
   * Gets combo SFX for the current combo.
   *
   * @returns Combo SFX file name (`c${currentCombo}`), or `linefall` if the sound definition does not provide combo tones.
   */
  getComboSFX: (currentCombo: number) => string | "linefall";
  getScoreSFX: (scoring: number) => string | null;
  getClearSFX: (scoring: number, scoreToAdd: number, isBackToBack: boolean, currentCombo: number) => string[];

  // These are set to Jstris.SFXDefinition
  hold: Jstris.SFXDefinition | null;
  linefall: Jstris.SFXDefinition | null;
  lock: Jstris.SFXDefinition | null;
  move: Jstris.SFXDefinition | null;
  died: Jstris.SFXDefinition | null;
  ready: Jstris.SFXDefinition | null;
  go: Jstris.SFXDefinition | null;
  ding: Jstris.SFXDefinition | null;
  msg: Jstris.SFXDefinition | null;
  fault: Jstris.SFXDefinition | null;
  blank: Jstris.SFXDefinition | null;
  item: Jstris.SFXDefinition | null;
  pickup: Jstris.SFXDefinition | null;
  rotate: Jstris.SFXDefinition | null;
  success: Jstris.SFXDefinition | null;
  // These are set to null
  harddrop: Jstris.SFXDefinition | null;
  golive: Jstris.SFXDefinition | null;
  land: Jstris.SFXDefinition | null;
  garbage: Jstris.SFXDefinition | null;
  b2b: Jstris.SFXDefinition | null;
  scoring: ((Jstris.SFXDefinition | undefined)[] & { length: 15 }) | null;
  b2bScoring: ((Jstris.SFXDefinition | undefined)[] & { length: 15 }) | null;
  /** Unused. */
  inherit: null;
  spawns: { [piece in Jstris.Tetrominoes]: Jstris.SFXDefinition } | null;
  author: string | null;
}

/** SFX set whose all defitions are set to `null`. */
declare class NullSFXset extends BaseSFXset {
  constructor();

  hold: null;
  linefall: null;
  lock: null;
  move: null;
  died: null;
  ready: null;
  go: null;
  ding: null;
  msg: null;
  fault: null;
  item: null;
  pickup: null;
  harddrop: null;
  golive: null;
  land: null;
  garbage: null;
  b2b: null;
  rotate: null;
  scoring: null;
  b2bScoring: null;
  author: null;
  inherit: null;
  spawns: null;
  success: null;
}

declare class YotipoSFXset extends BaseSFXset {
  constructor();
  volume: number;
  hold: null;
  linefall: Jstris.SFXDefinition;
  lock: Jstris.SFXDefinition;
  move: null;
  died: Jstris.SFXDefinition;
  ready: Jstris.SFXDefinition;
  go: Jstris.SFXDefinition;
}

declare class RainforestSFXset extends BaseSFXset {
  constructor();
  author: string;
  volume: number;
  move: null;
  hold: null;
  lock: Jstris.SFXDefinition;
  died: Jstris.SFXDefinition;
  comboTones: Jstris.SFXDefinition;
}

declare class TetraSFXset extends BaseSFXset {
  constructor();
  author: string;
  volume: number;
  comboTones: (Jstris.SFXDefinition | null)[];
  hold: Jstris.SFXDefinition;
  move: Jstris.SFXDefinition;
  ready: Jstris.SFXDefinition | null;
  go: Jstris.SFXDefinition | null;
  golive: Jstris.SFXDefinition | null;
  lock: Jstris.SFXDefinition | null;
  harddrop: Jstris.SFXDefinition | null;
  land: Jstris.SFXDefinition | null;
  garbage: Jstris.SFXDefinition | null;
  b2b: Jstris.SFXDefinition | null;
  linefall: null;
  died: Jstris.SFXDefinition | null;
  fault: Jstris.SFXDefinition | null;
  scoring: [
    SOFT_DROP: undefined,
    HARD_DROP: undefined,
    CLEAR1: Jstris.SFXDefinition,
    CLEAR2: Jstris.SFXDefinition,
    CLEAR3: Jstris.SFXDefinition,
    CLEAR4: Jstris.SFXDefinition,
    TSPIN_MINI: Jstris.SFXDefinition,
    TSPIN: Jstris.SFXDefinition,
    TSPIN_MINI_SINGLE: Jstris.SFXDefinition,
    TSPIN_SINGLE: Jstris.SFXDefinition,
    TSPIN_DOUBLE: Jstris.SFXDefinition,
    TSPIN_TRIPLE: Jstris.SFXDefinition,
    PERFECT_CLEAR: Jstris.SFXDefinition,
    COMBO: undefined,
    CLEAR5: Jstris.SFXDefinition
  ];
}

declare class VoiceSFXset extends NullSFXset {
  constructor();
  author: string;
  volume: number;
  died: Jstris.SFXDefinition;
  b2bScoring: [
    SOFT_DROP: undefined,
    HARD_DROP: undefined,
    CLEAR1: undefined,
    CLEAR2: undefined,
    CLEAR3: undefined,
    CLEAR4: Jstris.SFXDefinition,
    TSPIN_MINI: undefined,
    TSPIN: undefined,
    TSPIN_MINI_SINGLE: undefined,
    TSPIN_SINGLE: undefined,
    TSPIN_DOUBLE: Jstris.SFXDefinition,
    TSPIN_TRIPLE: undefined,
    PERFECT_CLEAR: undefined,
    COMBO: undefined,
    CLEAR5: undefined
  ];
  scoring: [
    SOFT_DROP: undefined,
    HARD_DROP: undefined,
    CLEAR1: Jstris.SFXDefinition,
    CLEAR2: Jstris.SFXDefinition,
    CLEAR3: Jstris.SFXDefinition,
    CLEAR4: Jstris.SFXDefinition,
    TSPIN_MINI: Jstris.SFXDefinition,
    TSPIN: Jstris.SFXDefinition,
    TSPIN_MINI_SINGLE: Jstris.SFXDefinition,
    TSPIN_SINGLE: Jstris.SFXDefinition,
    TSPIN_DOUBLE: Jstris.SFXDefinition,
    TSPIN_TRIPLE: Jstris.SFXDefinition,
    PERFECT_CLEAR: Jstris.SFXDefinition,
    COMBO: undefined,
    CLEAR5: undefined
  ];
}

declare class SpawnSFXset extends NullSFXset {
  constructor();
  author: string;
  volume: number;
  spawns: {
    I: Jstris.SFXDefinition;
    O: Jstris.SFXDefinition;
    S: Jstris.SFXDefinition;
    Z: Jstris.SFXDefinition;
    T: Jstris.SFXDefinition;
    L: Jstris.SFXDefinition;
    J: Jstris.SFXDefinition;
  };
}

declare class DalVSFXset extends NullSFXset {
  constructor();
  volume: number;
  died: Jstris.SFXDefinition;
  b2bScoring: null;
  b2b: Jstris.SFXDefinition;
  scoring: [
    SOFT_DROP: undefined,
    HARD_DROP: undefined,
    CLEAR1: undefined,
    CLEAR2: undefined,
    CLEAR3: undefined,
    CLEAR4: Jstris.SFXDefinition,
    TSPIN_MINI: Jstris.SFXDefinition,
    TSPIN: Jstris.SFXDefinition,
    TSPIN_MINI_SINGLE: Jstris.SFXDefinition,
    TSPIN_SINGLE: Jstris.SFXDefinition,
    TSPIN_DOUBLE: Jstris.SFXDefinition,
    TSPIN_TRIPLE: Jstris.SFXDefinition,
    PERFECT_CLEAR: Jstris.SFXDefinition,
    COMBO: undefined,
    CLEAR5: undefined
  ];
  success: Jstris.SFXDefinition;
}

declare class DalSpawnVSFXset extends NullSFXset {
  constructor();
  author: string;
  volume: number;
  died: Jstris.SFXDefinition;
  spawns: {
    I: Jstris.SFXDefinition;
    O: Jstris.SFXDefinition;
    S: Jstris.SFXDefinition;
    Z: Jstris.SFXDefinition;
    T: Jstris.SFXDefinition;
    L: Jstris.SFXDefinition;
    J: Jstris.SFXDefinition;
  };
}

declare const LZString: LZString;

declare function alea(seed: string): AleaPRNG;
