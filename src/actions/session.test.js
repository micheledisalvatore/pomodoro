/* eslint-env jest */

import {
  SESSION_START,
  SESSION_PAUSE,
  SESSION_COMPLETE,
  SESSION_SET_TIMING,
} from '../constants/session';
import {
  startSession,
  completeSession,
  pauseSession,
  setTiming,
} from './session';

describe('Given the session actions', () => {
  describe('when the startSession action is called', () => {
    it('should return an object with SESSION_START type and return the passed session', () => {
      expect(startSession('foo')).toEqual({
        type: SESSION_START,
        session: 'foo',
      });
    });
  });
  describe('when the completeSession action is called', () => {
    it('should return an object with SESSION_COMPLETE type', () => {
      expect(completeSession()).toEqual({
        type: SESSION_COMPLETE,
      });
    });
  });
  describe('when the pauseSession action is called', () => {
    it('should return an object with SESSION_PAUSE type', () => {
      expect(pauseSession()).toEqual({
        type: SESSION_PAUSE,
      });
    });
  });
  describe('when the setTiming action is called', () => {
    it('should return an object with SESSION_SET_TIMING type and return the passed timing', () => {
      expect(setTiming('foo')).toEqual({
        type: SESSION_SET_TIMING,
        timing: 'foo',
      });
    });
  });
});
