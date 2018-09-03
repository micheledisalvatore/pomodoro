import React from 'react';
import PropTypes from 'prop-types';

import { Container, Current } from './InfoBox.styled';

export const InfoBox = ({ current, total, title }) => (
  <Container>
    <h3>{title}</h3>
    <Current>{current}</Current><span>/{total}</span>
  </Container>
);

InfoBox.propTypes = {
  title: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
