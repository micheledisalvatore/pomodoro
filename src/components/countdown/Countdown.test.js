/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

import { Number, Circle } from './Countdown.styled';
import { Countdown, mapStateToProps } from './Countdown';

describe('Given a Countdown component', () => {
  const COLOR_PROP = 'red';
  let component;
  let wrapper;

  const requiredProps = {
    color: COLOR_PROP,
    isPaused: true,
    length: 10,
    timing: 10,
  };

  describe('when it is rendered', () => {
    beforeEach(() => {
      component = <Countdown {...requiredProps} />;
      wrapper = shallow(component);
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have the timer set to 10 sec', () => {
      expect(wrapper.find(Circle)).toHaveProp('duration', 10);
    });

    it(`should have the timer with the ${COLOR_PROP} color`, () => {
      expect(wrapper.find(Circle)).toHaveProp('color', COLOR_PROP);
    });

    it('should have the timer in pause', () => {
      expect(wrapper.find(Circle)).toHaveProp('isPaused', true);
    });

    it(`should show the countdown with the ${COLOR_PROP} color`, () => {
      expect(wrapper.find(Number)).toHaveProp('color', COLOR_PROP);
    });

    it('should show the countdown set to 00:10', () => {
      expect(wrapper.find(Number)).toHaveText('00:10');
    });

    describe('and the user starts the countdown', () => {
      beforeEach(() => {
        wrapper.setProps({
          isPaused: false,
        });
      });

      it('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should have the timer in play', () => {
        expect(wrapper.find(Circle)).toHaveProp('isPaused', false);
      });

      describe('and 3 seconds are passed', () => {
        beforeEach(() => {
          wrapper.setProps({
            timing: 7,
          });
        });

        it('should match the snapshot', () => {
          expect(wrapper).toMatchSnapshot();
        });

        it('should show the countdown set to 00:07', () => {
          expect(wrapper.find(Number)).toHaveText('00:07');
        });

        describe('and the timer ends', () => {
          beforeEach(() => {
            wrapper.setProps({
              timing: 0,
            });
          });

          it('should match the snapshot', () => {
            expect(wrapper).toMatchSnapshot();
          });

          it('should show the countdown set to 00:00', () => {
            expect(wrapper.find(Number)).toHaveText('00:00');
          });

          it('should NOT show the timer', () => {
            expect(wrapper.find(Circle)).not.toExist();
          });
        });
      });
    });
  });
});

describe('Given a mapStateToProps function', () => {
  describe('when it is called', () => {
    it('should return an object with the passed values', () => {
      expect(mapStateToProps({
        session: {
          color: 'fooColor',
          isPaused: 'fooIsPause',
          length: 'fooLength',
          timing: 'fooTiming',
        },
      })).toEqual({
        color: 'fooColor',
        isPaused: 'fooIsPause',
        length: 'fooLength',
        timing: 'fooTiming',
      });
    });
  });
});
