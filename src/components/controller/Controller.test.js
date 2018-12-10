/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

import { PlayIcon, PauseIcon } from './Controller.style';
import { Controller, mapStateToProps } from './Controller';

describe('Given a Controller component', () => {
  let component;
  let wrapper;
  const pauseSessionActionMock = jest.fn();
  const startSessionActionMock = jest.fn();
  const requiredProps = {
    isPaused: true,
    pauseSessionAction: pauseSessionActionMock,
    startSessionAction: startSessionActionMock,
  };

  describe('when it is rendered', () => {
    beforeEach(() => {
      component = <Controller {...requiredProps} />;
      wrapper = shallow(component);
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the play icon', () => {
      expect(wrapper.find(PlayIcon)).toExist();
    });

    describe('and the user clicks on it when it is paused', () => {
      beforeEach(() => {
        wrapper.simulate('click', 'foo');
      });

      afterEach(() => {
        startSessionActionMock.mockReset();
      });

      it('should invoke startSessionAction without parameters', () => {
        expect(startSessionActionMock).toBeCalledWith();
      });
    });

    describe('and the component is started', () => {
      beforeEach(() => {
        wrapper.setProps({
          isPaused: false,
        });
      });

      it('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should render the pause icon', () => {
        expect(wrapper.find(PauseIcon)).toExist();
      });

      describe('and the user clicks on it when it is started', () => {
        beforeEach(() => {
          wrapper.simulate('click', 'foo');
        });

        afterEach(() => {
          pauseSessionActionMock.mockReset();
        });

        it('should invoke startSessionAction without parameters', () => {
          expect(pauseSessionActionMock).toBeCalledWith();
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
          isPaused: 'foo',
        },
      })).toEqual({
        isPaused: 'foo',
      });
    });
  });
});
