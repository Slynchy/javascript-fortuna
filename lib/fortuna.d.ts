// fortuna.d.ts
// Type declarations for fortuna.js (Fortuna-based PRNG)

export interface FortunaInitOptions {
  /** Continually gather entropy on a timer (default: false) */
  timeBasedEntropy?: boolean;
  /** Timer interval in ms used when `timeBasedEntropy` is true (default: 375) */
  accumulateTimeout?: number;
  /**
   * Custom entropy provider returning either a
   * string **or** an array of length 128.
   * (default: `fortuna.timeBasedEntropyFxn`)
   */
  entropyFxn?: () => string | unknown[];
}

/** Error thrown when the supplied entropy is malformed */
export class EntropyException extends Error {
  constructor(message: string);
}

/** Error thrown when an input cannot be converted */
export class ConversionException extends Error {
  constructor(message: string);
}

export interface Fortuna {
  /*-- state --*/
  initialized: boolean;
  key: unknown;
  entropy: unknown;
  counter: number;
  entropySz: number;
  currentTimer: ReturnType<typeof setTimeout> | null;
  timeBasedEntropy: boolean;
  accumulateTimeout: number;
  entropyFxn: () => string | unknown[];

  /*-- lifecycle --*/
  init(options?: FortunaInitOptions): void;
  accumulate(): void;
  stopTimer(): void;
  seed(): void;

  /*-- entropy helpers --*/
  timeBasedEntropyFxn(): string;

  /*-- core generator --*/
  generate(): number;

  /*-- integer helpers --*/
  int32(): number;       // signed 32-bit
  uint32(): number;      // unsigned 32-bit
  int53(): number;       // signed 53-bit (safe integer range)
  int53Full(): number;   // signed 53-bit, inclusive of extremes
  uint53(): number;      // unsigned 53-bit
  uint53Full(): number;  // unsigned 53-bit, inclusive of extremes

  /*-- floating-point helper --*/
  random(): number;      // 0 ≤ n < 1
}

/**
 * Fortuna PRNG module
 *
 * ```ts
 * import fortuna = require("fortuna");
 * fortuna.init();
 * const n = fortuna.uint32();
 * ```
 */
declare const fortuna: Fortuna;

export = fortuna;
