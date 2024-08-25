export const WORD_KEY = "minigames:termo:words" as const;
export const layout_map = Object.freeze({
  4: {
    1: [[null]],
    2: [[null, null]],
    3: [[null, null], [null]],
    4: [
      [null, null],
      [null, null],
    ],
  },
  5: {
    1: [[null]],
    2: [[null, null]],
    3: [[null, null], [null]],
    4: [
      [null, null],
      [null, null],
    ],
  },
  6: {
    1: [[null]],
    2: [[null, null]],
    3: [[null, null], [null]],
    4: [
      [null, null],
      [null, null],
    ],
  },
} as const);

export const max_tries_map = Object.freeze({
  4: {
    1: {
      easy: 8,
      normal: 6,
      hard: 4,
    },
    2: {
      easy: 10,
      normal: 7,
      hard: 5,
    },
    3: {
      easy: 11,
      normal: 8,
      hard: 6,
    },
    4: {
      easy: 13,
      normal: 9,
      hard: 6,
    },
  },
  5: {
    1: {
      easy: 8,
      normal: 6,
      hard: 4,
    },
    2: {
      easy: 10,
      normal: 7,
      hard: 5,
    },
    3: {
      easy: 11,
      normal: 8,
      hard: 6,
    },
    4: {
      easy: 13,
      normal: 9,
      hard: 6,
    },
  },
  6: {
    1: {
      easy: 8,
      normal: 6,
      hard: 4,
    },
    2: {
      easy: 10,
      normal: 7,
      hard: 5,
    },
    3: {
      easy: 11,
      normal: 8,
      hard: 6,
    },
    4: {
      easy: 13,
      normal: 9,
      hard: 6,
    },
  },
} as const);

export const map = Object.freeze({
  word_length: {
    "4tro": 4,
    cinco: 5,
    sextou: 6,
  },
  grid_size: {
    uno: 1,
    duo: 2,
    trio: 3,
    quatro: 4,
  },
} as const);

export const WARN_DIALOG_KEY = "warn-dialog";
export const STEP_BY_KEY = "step-by";
export const GRID_ENABLED_KEY = "grid-enabled";
export const DOT_SIZE_KEY = "dot-size";
export const REFRESH_RATE_KEY = "refresh-rate";

export const OPEN_GRAPH_EMAILS = ["contact@arthurbr.me", "arthurbr@cdmd.dev"];
