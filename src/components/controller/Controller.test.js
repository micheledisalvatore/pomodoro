import React from 'react';
import { shallow } from 'enzyme';

import { PlayIcon, PauseIcon } from './Controller.style';
import { Controller } from './Controller';

describe('Given a Controller component', () => {
  let component;
  let wrapper;
  const onClickMock = jest.fn();
  const requiredProps = {
    onClick: onClickMock,
  };

  describe('when it is rendered', () => {
    beforeEach(() => {
      component = <Controller {...requiredProps} />
      wrapper = shallow(component);
    })

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    })

    it('should render the pause icon', () => {
      expect(wrapper.find(PauseIcon)).toExist();
    })

    describe('and the user clicks on it', () => {
      beforeEach(() => {
        wrapper.simulate('click', 'foo');
      })

      afterEach(() => {
        onClickMock.mockReset();
      })

      it('should invoke onClickMock', () => {
        expect(onClickMock).toBeCalledWith('foo');
      })
    })

    describe('and the component is in pause', () => {
      beforeEach(() => {
        wrapper.setProps({
          isPaused: true,
        });
      });

      it('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      })

      it('should render the play icon', () => {
        expect(wrapper.find(PlayIcon)).toExist();
      })
    })
  })
})
