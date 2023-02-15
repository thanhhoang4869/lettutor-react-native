import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {TextInput} from '@react-native-material/core';
import {Button, Flex, WhiteSpace} from '@ant-design/react-native';
import {useAppTheme} from 'App';
import {Icon} from 'react-native-elements';
import {style, color} from 'style';

export function LoginPage(): JSX.Element {
  const theme = useAppTheme();

  const logo = require('assets/logo.png');

  return (
    <Flex justify="center" direction="column" style={style.container}>
      <Image style={style.imageStyle} resizeMode={'contain'} source={logo} />

      <WhiteSpace />

      <TextInput
        label="Email"
        variant="outlined"
        style={style.input}
        color={theme?.colors?.primary}
      />

      <WhiteSpace />

      <TextInput
        label="Password"
        variant="outlined"
        style={style.input}
        color={theme?.colors?.primary}
        secureTextEntry={true}
      />

      <WhiteSpace />
      <WhiteSpace />

      <Button type="primary" style={style.button}>
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
