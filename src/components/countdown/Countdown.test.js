/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

import { Countdown } from './Countdown';
import { Number, Circle } from './Countdown.styled';

describe('Given a Countdown component', () => {
  const COLOR_PROP = 'red';
  const onEndMock = jest.fn();
  let component;
  let wrapper;

  const requiredProps = {
    color: COLOR_PROP,
    onEnd: onEndMock,
  };

  describe('when it is rendered', () => {
    beforeEach(() => {
      component = <Countdown {...requiredProps} />;
      wrapper = shallow(component);
    });

    afterEach(() => {
      jest.clearAllTimers();
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

      it('should have the timer in play', () => {
        expect(wrapper.find(Circle)).toHaveProp('isPaused', false);
      });

      xdescribe('and 3 seconds are passed', () => {
        beforeEach(() => {
          jest.advanceTimersByTime(3000);
        });

        it('should show the countdown set to 00:07', () => {
          expect(wrapper.find(Number)).toHaveText('00:07');
        });

        describe('and the user pauses the timer', () => {
          beforeEach(() => {
            wrapper.setProps({
              isPaused: true,
            });
          });

          describe('and the user starts the timer after 4 seconds', () => {
            beforeEach(() => {
              wrapper.setProps({
                pauseDuration: 4,
              });
            });
            describe('and 5 seconds are passed in total', () => {
              beforeEach(() => {
                jest.advanceTimersByTime(5000);
              });

              it('should show the countdown set to 00:06', () => {
                expect(wrapper.find(Number)).toHaveText('00:06');
              });
            });
          });
        });
      });
    });
  });
});
