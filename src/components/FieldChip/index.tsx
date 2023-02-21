import {Chip} from '@react-native-material/core';
import React from 'react';

export interface FieldChipProps {
  label: string;
  color: string;
}

const FieldChip = ({label, color}: FieldChipProps) => {
  return <Chip label={label} color={color} />;
};

export default FieldChip;
