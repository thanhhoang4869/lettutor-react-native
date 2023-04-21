import React from 'react';

import {Flex, Text, WhiteSpace} from '@ant-design/react-native';
import {Button, Input} from 'galio-framework';
import {Image, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

import {useAppTheme} from 'App';
import {color, style} from 'style';

import MultilangButton from 'components/MultilangButton';
import {Alert} from 'react-native';
import Loading from 'components/Loading';

import authService from 'services/authService';

export function LoginScreen({navigation: {navigate}}: any): JSX.Element {
  const theme = useAppTheme();
  const logo = require('assets/logo.png');

  const [loginInfo, setLoginInfo] = React.useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const login = async () => {
    setIsLoading(true);

    const {email, password} = loginInfo;

    if (!email || !password) {
      setIsLoading(false);
      Alert.alert('Please enter email and password');
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await authService.login(data);

      if (response.status === 200) {
        // navigate('Main');
        Alert.alert('Success', 'Login success');
      } else {
        Alert.alert('Something went wrong');
      }
    } catch (error: any) {
      Alert.alert(error.response.data.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}

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
          onChangeText={text => {
            setLoginInfo({...loginInfo, email: text});
          }}
          value={loginInfo.email}
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
          onChangeText={text => {
            setLoginInfo({...loginInfo, password: text});
          }}
          value={loginInfo.password}
        />

        <WhiteSpace />

        <Button round style={style.primaryButton} onPress={login}>
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
