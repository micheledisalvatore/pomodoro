import React from 'react';
import { shallow } from 'enzyme';

import { InfoBox } from './InfoBox';
import { Current } from './InfoBox.styled';

describe('Given a InfoBox component', () => {
  let component;
  let wrapper;

  const requiredProps = {
    title: 'foo',
    current: 3,
    total: 10,
  };

  describe('when it is rendered', () => {
    beforeEach(() => {
      component = <InfoBox {...requiredProps} />
      wrapper = shallow(component);
    })

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    })

    it('should show the given title', () => {
      expect(wrapper.find('h3')).toHaveText('foo');
    })

    it('should show the given current value', () => {
      expect(wrapper.find(Current)).toHaveText('3');
    })

    it('should show the given total value', () => {
      expect(wrapper.find('span')).toHaveText('/10');
    })
  })
})
