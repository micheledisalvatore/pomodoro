import React from 'react';
import PropTypes from 'prop-types';

import { COUNTER_GOALS, COUNTER_SESSIONS } from '../../constants/counter';

import Countdown from '../countdown';
import Controller from '../controller';
import InfoBox from '../info-box';

import { Container } from './Main.styled';

export const Main = ({ goalNumber, sessionNumber }) => (
  <Container>
    <Countdown />
    <Controller />
    <div>
      <InfoBox current={sessionNumber} total={COUNTER_SESSIONS} title="Round" />
      <InfoBox current={goalNumber} total={COUNTER_GOALS} title="Goal" />
    </div>
  </Container>
);

Main.propTypes = {
  goalNumber: PropTypes.number.isRequired,
  sessionNumber: PropTypes.number.isRequired,
};

export const mapStateToProps = ({
  counter: {
    goalNumber,
    sessionNumber,
  },
}) => ({
  goalNumber,
  sessionNumber,
});
