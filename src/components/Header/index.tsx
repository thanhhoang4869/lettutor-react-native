import {Flex} from '@ant-design/react-native';
import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {style} from 'style';

import {useContext} from 'react';
import {AccountContext} from 'context/AccountContext';

export interface HeaderProps {
  title: string;
  onTouch: () => void;
}

const Header = ({title, onTouch}: HeaderProps) => {
  const {account} = useContext(AccountContext);

  return (
    <Flex justify="between" style={{width: '100%', backgroundColor: 'white'}}>
      <Text style={style.pageTitle}>{title}</Text>
      <TouchableOpacity onPress={onTouch}>
        {account?.avatar != null ? (
          <Image
            source={{
              uri: account?.avatar,
            }}
            style={{width: 40, height: 40, borderRadius: 50}}
          />
        ) : null}
      </TouchableOpacity>
    </Flex>
  );
};

export default Header;
