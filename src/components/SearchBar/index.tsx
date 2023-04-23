import {Input} from 'galio-framework';
import React from 'react';

import {color} from 'style';

export interface SearchBarProps {
  value: string;
  placeHolder: string;
  onSearch: () => void;
  onChangeText: (text: string) => void;
}

const SearchBar = ({
  placeHolder,
  onSearch,
  onChangeText,
  value,
}: SearchBarProps) => {
  return (
    <Input
      rounded
      placeholder={placeHolder}
      placeholderTextColor={color.grey}
      style={{
        width: '125%',
        borderColor: color.grey,
        borderRadius: 50,
      }}
      value={value}
      family="AntDesign"
      icon="search1"
      onChangeText={onChangeText}
      onEndEditing={onSearch}
      cursorColor={color.primaryColor}
    />
  );
};

export default SearchBar;
