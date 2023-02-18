import React from 'react';

import {Button, Input} from 'galio-framework';
import {Image, TouchableOpacity} from 'react-native';
import {Flex, Text, WhiteSpace} from '@ant-design/react-native';
import {style, color} from 'style';
import {useAppTheme} from 'App';

export function ForgetPasswordScreen({
  navigation: {navigate},
}: any): JSX.Element {
  const logo = require('assets/logo.png');
  const theme = useAppTheme();

  return (
    <Flex justify="center" direction="column" style={style.container}>
      <Image style={style.imageStyle} resizeMode={'contain'} source={logo} />

      <Text>Please enter your registered email to get recovery code</Text>

      <WhiteSpace />
      <WhiteSpace />

      <Input
        placeholder="Email"
        rounded
        placeholderTextColor={color.grey}
        family="AntDesign"
        icon="mail"
        cursorColor={theme?.colors?.primary}
      />

      <WhiteSpace />

      <Button round style={style.primaryButton}>
        Send recovery code
      </Button>

      <WhiteSpace />

      <TouchableOpacity onPress={() => navigate('Login')}>
        <Text style={style.textBoldPrimary}>Back to Login</Text>
      </TouchableOpacity>
    </Flex>
  );
}

export default ForgetPasswordScreen;
