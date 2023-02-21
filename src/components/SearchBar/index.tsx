import {Input} from 'galio-framework';
import React from 'react';

import {color} from 'style';

export interface SearchBarProps {
  placeHolder: string;
}

const SearchBar = ({placeHolder}: SearchBarProps) => {
  return (
    <Input
      placeholder={placeHolder}
      rounded
      placeholderTextColor={color.grey}
      style={{borderColor: color.grey, borderRadius: 5}}
      family="AntDesign"
      icon="search1"
      cursorColor={color.primaryColor}
    />
  );
};

export default SearchBar;
