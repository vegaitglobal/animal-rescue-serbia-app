import React from 'react';
import ChevronIcon from '../assets/icons/chevron.svg';
import {ColorPallet} from '../resources/ColorPallet';

export enum Orientation {
  Up = '90deg',
  Forward = '180deg',
  Down = '270deg',
  Back = '0deg',
}

type ChevronProps = {
  orientation?: Orientation;
  color?: string;
  size?: number;
};

export const Chevron = ({
  orientation = Orientation.Forward,
  color = ColorPallet.yellow,
  size = 10,
}: ChevronProps) => {
  return (
    <ChevronIcon
      width={size}
      height={size}
      color={color}
      style={{transform: [{rotate: orientation}]}}
    />
  );
};
