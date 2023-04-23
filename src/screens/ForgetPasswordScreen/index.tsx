import React from 'react';

import {Flex, Text, WhiteSpace} from '@ant-design/react-native';
import {useAppTheme} from 'App';
import Loading from 'components/Loading';
import MultilangButton from 'components/MultilangButton';
import {Button, Input} from 'galio-framework';
import {Alert, Image, TouchableOpacity} from 'react-native';
import userService from 'services/userService';
import {color, style} from 'style';

export function ForgetPasswordScreen({
  navigation: {navigate},
}: any): JSX.Element {
  const logo = require('assets/logo.png');
  const theme = useAppTheme();

  const [email, setEmail] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await userService.forgotPassword(email);
      if (response.status === 200) {
        setLoading(false);
        Alert.alert('Please check your email to recover your password', '', [
          {text: 'OK', onPress: () => navigate('Login')},
        ]);
      } else {
        setLoading(false);
        Alert.alert("Your email is invalid or doesn't exist");
      }
    } catch (error: any) {
      setLoading(false);
      Alert.alert("Your email is invalid or doesn't exist");
    }

    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <MultilangButton />

      <Flex direction="column" style={style.containerMul}>
        <Image style={style.imageStyle} resizeMode={'contain'} source={logo} />

        <Text>Please enter your registered email to get recovery code</Text>

        <WhiteSpace />
        <WhiteSpace />

        <Input
          placeholder="Email"
          value={email}
          rounded
          onChangeText={text => setEmail(text)}
          placeholderTextColor={color.grey}
          family="AntDesign"
          icon="mail"
          cursorColor={theme?.colors?.primary}
        />

        <WhiteSpace />

        <Button round style={style.primaryButton} onPress={handleSubmit}>
          Send recovery code
        </Button>

        <WhiteSpace />

        <TouchableOpacity onPress={() => navigate('Login')}>
          <Text style={style.textBoldPrimary}>Back to Login</Text>
        </TouchableOpacity>
      </Flex>
    </>
  );
}

export default ForgetPasswordScreen;
