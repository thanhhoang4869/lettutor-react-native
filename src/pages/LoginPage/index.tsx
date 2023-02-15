import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TextInput} from '@react-native-material/core';
import {Button, Flex, WhiteSpace} from '@ant-design/react-native';
import {useAppTheme} from '../../../App';

export function LoginPage(): JSX.Element {
  const theme = useAppTheme();

  const style = StyleSheet.create({
    imageStyle: {
      alignSelf: 'center',
      width: '70%',
      marginTop: -40,
    },
    container: {
      backgroundColor: 'white',
      height: '100%',
      padding: 30,
    },
    button: {
      width: '100%',
    },
    input: {
      width: '100%',
    },
    text: {
      fontWeight: 'bold',
      color: theme?.colors?.primary,
    },
    marginRight: {
      marginRight: 5,
    },
  });

  const logo = require('../../assets/logo.png');

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

      <TouchableOpacity>
        <Text style={style.text}>Forgot password?</Text>
      </TouchableOpacity>

      <WhiteSpace />
      <WhiteSpace />

      <Text>Or continue with</Text>

      <WhiteSpace />
      <WhiteSpace />

      <Flex>
        <Text style={style.marginRight}>Not a member yet?</Text>
        <TouchableOpacity>
          <Text style={style.text}>Register</Text>
        </TouchableOpacity>
      </Flex>
    </Flex>
  );
}

export default LoginPage;
