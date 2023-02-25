import {Input} from 'galio-framework';
import React from 'react';

import {color, style} from 'style';

export interface SearchBarProps {
  placeHolder: string;
}

const SearchBar = ({placeHolder}: SearchBarProps) => {
  return (
    <Input
      placeholder={placeHolder}
      rounded
      placeholderTextColor={color.grey}
      style={{
        width: '125%',
        borderColor: color.grey,
        borderRadius: 50,
      }}
      family="AntDesign"
      icon="search1"
      cursorColor={color.primaryColor}
    />
  );
};

export default SearchBar;
