import styled, { keyframes } from 'styled-components';

const size = 300;
const strokeWidth = size / 20;
const radius = size / 2 - strokeWidth / 2

export const Container = styled.div`
  position: relative;
  width: ${size}px;
  text-align: center;
  margin: 20px auto;
`

export const Number = styled.div`
  color: ${ ({color}) => color};
  display: inline-block;
  line-height: ${size}px;
  font-size: ${size / 4}px;
`

export const Svg = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transform: rotateY(-180deg) rotateZ(-90deg);
`

const countdown = keyframes`
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: ${2 * Math.PI * radius}px;
  }
`

export const Circle = styled.circle.attrs({
  r: radius,
  cx: size / 2,
  cy: size / 2,
})`
  stroke-dasharray: ${2 * Math.PI * radius}px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: ${strokeWidth}px;
  stroke: ${({color}) => color};
  fill: none;
  animation: ${countdown} ${ ({duration}) => `${duration}s` } linear forwards;
  animation-play-state: ${ ({isPaused}) => isPaused ? 'paused' : 'running' };
`
