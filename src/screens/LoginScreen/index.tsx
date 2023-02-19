import React from 'react';

import {Button, Input} from 'galio-framework';
import {Image, TouchableOpacity} from 'react-native';
import {Flex, Text, WhiteSpace} from '@ant-design/react-native';
import {Icon} from 'react-native-elements';

import {style, color} from 'style';
import {useAppTheme} from 'App';

import MultilangButton from 'components/MultilangButton';
// import {StackNavigationProp} from '@react-navigation/stack'

export function LoginScreen({navigation: {navigate}}: any): JSX.Element {
  const theme = useAppTheme();
  const logo = require('assets/logo.png');

  return (
    <>
      <MultilangButton />

      <Flex direction="column" style={style.containerMul}>
        <Image style={style.imageStyle} resizeMode={'contain'} source={logo} />

        <Input
          placeholder="Email"
          rounded
          placeholderTextColor={color.grey}
          family="AntDesign"
          icon="mail"
          cursorColor={theme?.colors?.primary}
        />

        <WhiteSpace />

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

        <WhiteSpace />

        <Button
          round
          style={style.primaryButton}
          onPress={() => {
            navigate('Main');
          }}>
          Login
        </Button>

        <WhiteSpace />
        <WhiteSpace />

        <Text>Or continue with</Text>

        <WhiteSpace />

        <Flex>
          <TouchableOpacity style={style.mr5}>
            <Icon
              name="facebook"
              color={color.facebookColor}
              type="font-awesome-5"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon
              name="google"
              type="font-awesome-5"
              color={color.googleColor}
            />
          </TouchableOpacity>
        </Flex>

        <WhiteSpace />
        <WhiteSpace />

        <TouchableOpacity
          onPress={() => {
            navigate('ForgetPass');
          }}>
          <Text style={style.textBoldPrimary}>Forgot password?</Text>
        </TouchableOpacity>

        <WhiteSpace />
        <WhiteSpace />

        <TouchableOpacity
          onPress={() => {
            navigate('Signup');
          }}>
          <Flex>
            <Text style={style.mr2}>Not a member yet?</Text>
            <Text style={style.textBoldPrimary}>Register</Text>
          </Flex>
        </TouchableOpacity>
      </Flex>
    </>
  );
}

export default LoginScreen;
