/* eslint-env jest */

import { COUNTER_SET_NEW_SESSION } from '../constants/counter';
import { SESSIONS } from '../constants/session';

import counter from './counter';

describe('Given a counter reducer', () => {
  describe('when a state is passed', () => {
    let initState;

    beforeEach(() => {
      initState = {
        sessionTypeLabel: 'foo',
        sessionNumber: 1,
        goalNumber: 2,
      };
    });

    describe('and the COUNTER_SET_NEW_SESSION action is fired', () => {
      let newState;

      beforeEach(() => {
        newState = counter(initState, {
          type: COUNTER_SET_NEW_SESSION,
          bar: 'bar',
        });
      });

      it('should return the expected new state', () => {
        expect(newState).toEqual({
          sessionTypeLabel: 'foo',
          sessionNumber: 1,
          goalNumber: 2,
          bar: 'bar',
        });
      });
    });
  });

  describe('when the state is NOT passed', () => {
    describe('and the COUNTER_SET_NEW_SESSION action is fired', () => {
      let newState;

      beforeEach(() => {
        newState = counter(undefined, {
          type: COUNTER_SET_NEW_SESSION,
          bar: 'bar',
        });
      });

      it('should return the expected new state', () => {
        expect(newState).toEqual({
          sessionTypeLabel: SESSIONS.FOCUS.label,
          sessionNumber: 0,
          goalNumber: 0,
          bar: 'bar',
        });
      });
    });
  });
});
