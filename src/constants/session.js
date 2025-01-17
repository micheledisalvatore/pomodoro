export const SESSIONS = {
  FOCUS: {
    label: 'focus',
    color: 'red',
    length: 25 * 60,
  },
  SHORT_BREAK: {
    label: 'shortBreak',
    color: 'green',
    length: 5 * 60,
  },
  LONG_BREAK: {
    label: 'longBreak',
    color: 'blue',
    length: 30 * 60,
  },
};

export const SESSION_START = 'SESSION::START';
export const SESSION_PAUSE = 'SESSION::PAUSE';
export const SESSION_COMPLETE = 'SESSION::COMPLETE';
export const SESSION_SET_TIMING = 'SESSION::SET_TIMING';
