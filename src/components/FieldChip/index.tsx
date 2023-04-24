import {Chip} from '@react-native-material/core';
import React from 'react';

export interface FieldChipProps {
  value?: string;
  label: string;
  color: string;
  onSelected?: () => void;
}

const FieldChip = ({label, color, onSelected}: FieldChipProps) => {
  return <Chip label={label} color={color} onPress={onSelected} />;
};

export default FieldChip;
