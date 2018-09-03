import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  width: 100px;
`

const BaseSVG = styled.svg.attrs({ xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 512 512' })`
  width: 100%;
`

export const PauseIcon = () => (
  <BaseSVG>
    <path d="M477.6 128A254.2 254.2 0 0 0 322.2 8.9c-66-17.7-135-8.6-194.1 25.6A254.2 254.2 0 0 0 8.8 189.8c-17.7 66-8.6 135 25.6 194.1a257.3 257.3 0 0 0 222 128c44.4.1 88.1-11.5 127.5-34.3a254.2 254.2 0 0 0 119.3-155.4c17.7-66 8.6-135-25.6-194.1zm-.2 187.3a227.7 227.7 0 0 1-106.8 139.2 227.7 227.7 0 0 1-174 23A227.7 227.7 0 0 1 57.6 370.5a227.7 227.7 0 0 1-23-174A227.7 227.7 0 0 1 141.5 57.6a227.9 227.9 0 0 1 174-23 227.7 227.7 0 0 1 139.1 106.9 227.8 227.8 0 0 1 23 174z"/>
    <path d="M210.7 133.1h-33.1c-14.7 0-26.7 12-26.7 26.7v192.4c0 14.7 12 26.7 26.7 26.7h33.1c14.7 0 26.7-12 26.7-26.7V159.8c0-14.7-12-26.7-26.7-26.7zm0 219.1h-33.1V159.8h33.1v192.4zM334.4 133.1h-33.1c-14.7 0-26.7 12-26.7 26.7v192.4c0 14.7 12 26.7 26.7 26.7h33.1c14.7 0 26.7-12 26.7-26.7V159.8c0-14.7-12-26.7-26.7-26.7zm0 219.1h-33.1V159.8h33.1v192.4z" />
  </BaseSVG>
)

export const PlayIcon = () => (
  <BaseSVG>
    <path d="M477.6 128A254.2 254.2 0 0 0 322.2 8.9c-66-17.7-135-8.6-194.1 25.6A254.2 254.2 0 0 0 8.8 189.8c-17.7 66-8.6 135 25.6 194.1a257.3 257.3 0 0 0 222 128c44.4.1 88.1-11.5 127.5-34.3a254.2 254.2 0 0 0 119.3-155.4c17.7-66 8.6-135-25.6-194.1zm-.2 187.3a227.7 227.7 0 0 1-106.8 139.2 227.7 227.7 0 0 1-174 23A227.7 227.7 0 0 1 57.6 370.5a227.7 227.7 0 0 1-23-174A227.7 227.7 0 0 1 141.5 57.6a227.7 227.7 0 0 1 174-23 227.7 227.7 0 0 1 139.1 106.9 227.7 227.7 0 0 1 23 174z"/>
    <path d="M311.8 233.8l-139-80.2c-8-4.7-17.5-4.7-25.6 0-8 4.6-12.8 12.9-12.8 22.2v160.4a25.5 25.5 0 0 0 38.4 22.2l139-80.2c8-4.6 12.9-13 12.9-22.2 0-9.3-4.8-17.6-12.9-22.2zM161.1 334.5v-157L297 256l-136 78.5zM364.2 153.2c-7.3 0-13.3 6-13.3 13.3v179a13.3 13.3 0 0 0 26.7 0v-179c0-7.3-6-13.3-13.4-13.3z"/>
  </BaseSVG>
)
