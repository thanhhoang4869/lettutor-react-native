import React from 'react';

import {Button, Input} from 'galio-framework';
import {Image, TouchableOpacity} from 'react-native';
import {Flex, Text, WhiteSpace} from '@ant-design/react-native';
import {style, color} from 'style';
import {useAppTheme} from 'App';
import MultilangButton from 'components/MultilangButton';

export function SignupScreen({navigation: {navigate}}: any): JSX.Element {
  const logo = require('assets/logo.png');
  const theme = useAppTheme();

  return (
    <>
      <MultilangButton />

      <Flex direction="column" style={style.containerMul}>
        <Image style={style.imageStyle} resizeMode={'contain'} source={logo} />

        <Text style={style.textPrimary}>Let us sign you up!</Text>

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

        <Input
          placeholder="Password"
          password
          viewPass
          rounded
          placeholderTextColor={color.grey}
          icon="lock"
          family="AntDesign"
          cursorColor={theme?.colors?.primary}
        />

        <Input
          placeholder="Confirm password"
          password
          viewPass
          rounded
          placeholderTextColor={color.grey}
          icon="lock"
          family="AntDesign"
          cursorColor={theme?.colors?.primary}
        />

        <WhiteSpace />

        <Button
          round
          style={style.primaryButton}
          onPress={() => {
            navigate('AccVerify');
          }}>
          Sign up
        </Button>

        <WhiteSpace />

        <TouchableOpacity onPress={() => navigate('Login')}>
          <Flex>
            <Text style={style.mr2}>Got an account?</Text>
            <Text style={style.textBoldPrimary}>Login</Text>
          </Flex>
        </TouchableOpacity>
      </Flex>
    </>
  );
}

export default SignupScreen;
