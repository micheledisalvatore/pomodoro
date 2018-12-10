/* eslint-env jest */

import {
  SESSION_START,
  SESSION_PAUSE,
  SESSION_COMPLETE,
  SESSION_SET_TIMING,
  SESSIONS,
} from '../constants/session';

import session from './session';

describe('Given a session reducer', () => {
  let date;
  let timestamp;
  const origDateNow = global.Date.now;

  beforeEach(() => {
    date = new Date('July 22 1986 22:40:00');
    timestamp = date.getTime() / 1000;
    global.Date.now = jest.fn().mockReturnValue(date);
  });

  afterEach(() => {
    global.Date.now = origDateNow;
  });

  describe('when the initial state is the default', () => {
    describe('and the SESSION_START action is fired without parameters', () => {
      let newState;

      beforeEach(() => {
        newState = session(undefined, {
          type: SESSION_START,
        });
      });

      it('should return the expected new state', () => {
        expect(newState).toEqual({
          label: SESSIONS.FOCUS.label,
          color: SESSIONS.FOCUS.color,
          end: timestamp + SESSIONS.FOCUS.length,
          isPaused: false,
          pauseLength: 0,
          pauseStart: null,
          timing: SESSIONS.FOCUS.length,
          length: SESSIONS.FOCUS.length,
        });
      });
    });

    describe('and the SESSION_START action is fired with parameter SESSIONS.SHORT_BREAK', () => {
      let newState;

      beforeEach(() => {
        newState = session(undefined, {
          type: SESSION_START,
          session: SESSIONS.SHORT_BREAK,
        });
      });

      it('should return the expected new state', () => {
        expect(newState).toEqual({
          label: SESSIONS.SHORT_BREAK.label,
          color: SESSIONS.SHORT_BREAK.color,
          end: timestamp + SESSIONS.SHORT_BREAK.length,
          isPaused: false,
          pauseLength: 0,
          pauseStart: null,
          timing: SESSIONS.SHORT_BREAK.length,
          length: SESSIONS.SHORT_BREAK.length,
        });
      });
    });

    describe('and the SESSION_PAUSE action is fired', () => {
      let newState;

      beforeEach(() => {
        newState = session(undefined, {
          type: SESSION_PAUSE,
        });
      });

      it('should return the expected new state', () => {
        expect(newState).toEqual({
          label: SESSIONS.FOCUS.label,
          color: SESSIONS.FOCUS.color,
          end: null,
          pauseLength: 0,
          timing: SESSIONS.FOCUS.length,
          length: SESSIONS.FOCUS.length,
          isPaused: true,
          pauseStart: timestamp,
        });
      });
    });

    describe('and the SESSION_COMPLETE action is fired', () => {
      let newState;

      beforeEach(() => {
        newState = session(undefined, {
          type: SESSION_COMPLETE,
        });
      });

      it('should return the expected new state', () => {
        expect(newState).toEqual({
          label: SESSIONS.FOCUS.label,
          color: SESSIONS.FOCUS.color,
          end: null,
          isPaused: false,
          pauseLength: 0,
          pauseStart: null,
          timing: SESSIONS.FOCUS.length,
          length: SESSIONS.FOCUS.length,
        });
      });
    });

    describe('and the SESSION_SET_TIMING action is fired', () => {
      let newState;

      beforeEach(() => {
        newState = session(undefined, {
          type: SESSION_SET_TIMING,
          timing: 4,
        });
      });

      it('should return the expected new state', () => {
        expect(newState).toEqual({
          label: SESSIONS.FOCUS.label,
          color: SESSIONS.FOCUS.color,
          end: null,
          isPaused: false,
          pauseLength: 0,
          pauseStart: null,
          timing: 4,
          length: SESSIONS.FOCUS.length,
        });
      });
    });
  });

  describe('when the initial state is in pause', () => {
    let initState;
    let newDate;

    beforeEach(() => {
      initState = {
        label: SESSIONS.FOCUS.label,
        color: SESSIONS.FOCUS.color,
        end: timestamp + SESSIONS.FOCUS.length,
        isPaused: true,
        pauseLength: 3,
        pauseStart: timestamp + 5,
        timing: SESSIONS.FOCUS.length,
        length: SESSIONS.FOCUS.length,
      };

      newDate = new Date('July 22 1986 22:40:15');
      global.Date.now = jest.fn().mockReturnValue(newDate);
    });

    describe('and the SESSION_START action is fired', () => {
      let newState;

      beforeEach(() => {
        newState = session(initState, {
          type: SESSION_START,
        });
      });

      it('should return the expected new state as resumed', () => {
        expect(newState).toEqual({
          label: SESSIONS.FOCUS.label,
          color: SESSIONS.FOCUS.color,
          end: timestamp + SESSIONS.FOCUS.length,
          isPaused: false,
          timing: SESSIONS.FOCUS.length,
          length: SESSIONS.FOCUS.length,
          pauseLength: 13,
          pauseStart: null,
        });
      });
    });

    describe('and the SESSION_PAUSE action is fired', () => {
      let newState;

      beforeEach(() => {
        newState = session(initState, {
          type: SESSION_PAUSE,
        });
      });

      it('should return the expected new state', () => {
        expect(newState).toEqual({
          label: SESSIONS.FOCUS.label,
          color: SESSIONS.FOCUS.color,
          end: timestamp + 5,
          pauseLength: 3,
          timing: SESSIONS.FOCUS.length,
          length: SESSIONS.FOCUS.length,
          isPaused: true,
          pauseStart: timestamp + 15,
        });
      });
    });

    describe('and the SESSION_COMPLETE action is fired', () => {
      let newState;

      beforeEach(() => {
        newState = session(initState, {
          type: SESSION_COMPLETE,
        });
      });

      it('should return the expected new state', () => {
        expect(newState).toEqual({
          label: SESSIONS.FOCUS.label,
          color: SESSIONS.FOCUS.color,
          end: null,
          isPaused: false,
          pauseLength: 0,
          pauseStart: null,
          timing: SESSIONS.FOCUS.length,
          length: SESSIONS.FOCUS.length,
        });
      });
    });

    describe('and the SESSION_SET_TIMING action is fired', () => {
      let newState;

      beforeEach(() => {
        newState = session(initState, {
          type: SESSION_SET_TIMING,
          timing: 4,
        });
      });

      it('should return the expected new state', () => {
        expect(newState).toEqual({
          label: SESSIONS.FOCUS.label,
          color: SESSIONS.FOCUS.color,
          end: timestamp + SESSIONS.FOCUS.length,
          isPaused: true,
          pauseLength: 3,
          pauseStart: timestamp + 5,
          timing: 5,
          length: SESSIONS.FOCUS.length,
        });
      });
    });
  });
});
