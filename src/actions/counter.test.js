/* eslint-env jest */

import { COUNTER_SET_NEW_SESSION } from '../constants/counter';
import { setNewSession } from './counter';

describe('Given the counter actions', () => {
  describe('when the setNewSession action is called', () => {
    it('should return an object with COUNTER_SET_NEW_SESSION type and return the passed payload', () => {
      expect(setNewSession({ foo: 'foo' })).toEqual({
        type: COUNTER_SET_NEW_SESSION,
        foo: 'foo',
      });
    });
  });
});
