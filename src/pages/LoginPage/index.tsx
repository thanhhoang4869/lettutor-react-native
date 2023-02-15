import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {TextInput} from '@react-native-material/core';
import {Button, Flex, WhiteSpace} from '@ant-design/react-native';
import {useAppTheme} from '../../../App';

export function LoginPage(): JSX.Element {
  const theme = useAppTheme();

  const style = StyleSheet.create({
    imageStyle: {
      alignSelf: 'center',
      width: '70%',
    },
    container: {
      backgroundColor: 'white',
      height: '100%',
      padding: 30,
      marginTop: -40,
    },
    button: {
      width: '100%',
    },
    input: {
      width: '100%',
    },
  });

  const logo = require('../../assets/logo.png');

  return (
    <Flex justify="center" direction="column" style={style.container}>
      <Image style={style.imageStyle} resizeMode={'contain'} source={logo} />

      <WhiteSpace />

      <TextInput
        label="Username"
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

      <Button type="primary" style={style.button}>
        Login
      </Button>
    </Flex>
  );
}

export default LoginPage;
