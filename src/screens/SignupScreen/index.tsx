import React from 'react';

import {Button, Input} from 'galio-framework';
import {Alert, Image, TouchableOpacity} from 'react-native';
import {Flex, Text, WhiteSpace} from '@ant-design/react-native';
import {style, color} from 'style';
import {useAppTheme} from 'App';
import MultilangButton from 'components/MultilangButton';
import authService from 'services/authService';
import Loading from 'components/Loading';

export function SignupScreen({navigation: {navigate}}: any): JSX.Element {
  const logo = require('assets/logo.png');
  const theme = useAppTheme();

  const [signupInfo, setSignUpInfo] = React.useState({
    email: '',
    password: '',
    retypePassword: '',
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const signup = async () => {
    setIsLoading(true);

    const {email, password, retypePassword} = signupInfo;

    if (!email || !password || !retypePassword) {
      setIsLoading(false);
      Alert.alert('Please enter all the fields');
      return;
    } else if (password !== retypePassword) {
      setIsLoading(false);
      Alert.alert('Retype password does not match');
      return;
    }

    const data = {
      email,
      password,
    };

    try {
      const response = await authService.register(data);

      if (response.status === 201) {
        Alert.alert(
          'Success',
          'Registerd up successfully! Please check your email to verify your account',
        );
      } else {
        Alert.alert('Something went wrong');
      }
    } catch (error: any) {
      Alert.alert(error.response.data.message);
    }

    setIsLoading(false);
    setSignUpInfo({
      email: '',
      password: '',
      retypePassword: '',
    } as any);
  };

  return (
    <>
      {isLoading && <Loading />}
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
          onChangeText={(text: string) => {
            setSignUpInfo({...signupInfo, email: text});
          }}
          value={signupInfo.email}
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
          onChangeText={(text: string) => {
            setSignUpInfo({...signupInfo, password: text});
          }}
          value={signupInfo.password}
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
          onChangeText={(text: string) => {
            setSignUpInfo({...signupInfo, retypePassword: text});
          }}
          value={signupInfo.retypePassword}
        />

        <WhiteSpace />

        <Button round style={style.primaryButton} onPress={signup}>
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
