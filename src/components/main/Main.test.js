/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

import { COUNTER_GOALS, COUNTER_SESSIONS } from '../../constants/counter';

import Countdown from '../countdown';
import Controller from '../controller';
import InfoBox from '../info-box';

import { Main, mapStateToProps } from './Main';

describe('Given a Main component', () => {
  let component;
  let wrapper;

  const requiredProps = {
    sessionNumber: 1,
    goalNumber: 2,
  };

  describe('when it is rendered', () => {
    beforeEach(() => {
      component = <Main {...requiredProps} />;
      wrapper = shallow(component);
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should show the Countdown component', () => {
      expect(wrapper.find(Countdown)).toExist();
    });

    it('should show the Controller component', () => {
      expect(wrapper.find(Controller)).toExist();
    });

    it('should show the first InfoBox component with Round title', () => {
      expect(wrapper.find(InfoBox).at(0)).toHaveProp('title', 'Round');
    });

    it('should show the first InfoBox component with current prop set to 1', () => {
      expect(wrapper.find(InfoBox).at(0)).toHaveProp('current', 1);
    });

    it('should show the first InfoBox component with total prop set to the constant value of COUNTER_SESSIONS', () => {
      expect(wrapper.find(InfoBox).at(0)).toHaveProp('total', COUNTER_SESSIONS);
    });

    it('should show the first InfoBox component with Goal title', () => {
      expect(wrapper.find(InfoBox).at(1)).toHaveProp('title', 'Goal');
    });

    it('should show the first InfoBox component with current prop set to 1', () => {
      expect(wrapper.find(InfoBox).at(1)).toHaveProp('current', 2);
    });

    it('should show the first InfoBox component with total prop set to the constant value of COUNTER_GOALS', () => {
      expect(wrapper.find(InfoBox).at(1)).toHaveProp('total', COUNTER_GOALS);
    });
  });
});

describe('Given a mapStateToProps function', () => {
  describe('when it is called', () => {
    it('should return an object with the passed values', () => {
      expect(mapStateToProps({
        counter: {
          goalNumber: 'foo',
          sessionNumber: 'bar',
        },
      })).toEqual({
        goalNumber: 'foo',
        sessionNumber: 'bar',
      });
    });
  });
});
