import React from 'react';

import {Button, Input} from 'galio-framework';
import {Image, TouchableOpacity} from 'react-native';
import {Flex, Text, WhiteSpace} from '@ant-design/react-native';
import {Icon} from 'react-native-elements';

import {style, color} from 'style';
import {useAppTheme} from 'App';

export function LoginPage(): JSX.Element {
  const logo = require('assets/logo.png');
  const theme = useAppTheme();

  return (
    <Flex justify="center" direction="column" style={style.container}>
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

      <Button round style={style.primaryButton}>
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
          <Icon name="google" type="font-awesome-5" color={color.googleColor} />
        </TouchableOpacity>
      </Flex>

      <WhiteSpace />
      <WhiteSpace />

      <TouchableOpacity>
        <Text style={style.textBoldPrimary}>Forgot password?</Text>
      </TouchableOpacity>

      <WhiteSpace />
      <WhiteSpace />

      <Flex>
        <Text style={style.mr2}>Not a member yet?</Text>
        <TouchableOpacity>
          <Text style={style.textBoldPrimary}>Register</Text>
        </TouchableOpacity>
      </Flex>
    </Flex>
  );
}

export default LoginPage;
