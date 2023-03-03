import {Flex} from '@ant-design/react-native';
import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {style} from 'style';

export interface HeaderProps {
  title: string;
  onTouch: () => void;
}

const Header = ({title, onTouch}: HeaderProps) => {
  return (
    <Flex justify="between" style={{width: '100%', backgroundColor: 'white'}}>
      <Text style={style.pageTitle}>{title}</Text>
      <TouchableOpacity onPress={onTouch}>
        <Image
          source={{
            uri: 'https://oiir.illinois.edu/sites/prod/files/Profile%20Picture_1.png',
          }}
          style={{width: 40, height: 40}}
        />
      </TouchableOpacity>
    </Flex>
  );
};

export default Header;
