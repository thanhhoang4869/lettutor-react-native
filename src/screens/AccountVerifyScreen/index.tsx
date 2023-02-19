import React from 'react';

import {Button, Input} from 'galio-framework';
import {Image} from 'react-native';
import {Flex, Text, WhiteSpace} from '@ant-design/react-native';
import {style, color} from 'style';
import {useAppTheme} from 'App';
import MultilangButton from 'components/MultilangButton';

export function AccountVerifyScreen({
  navigation: {navigate},
}: any): JSX.Element {
  const logo = require('assets/logo.png');
  const theme = useAppTheme();

  return (
    <>
      <MultilangButton />

      <Flex direction="column" style={style.containerMul}>
        <Image style={style.imageStyle} resizeMode={'contain'} source={logo} />

        <Text style={style.textPrimary}>Verify your account</Text>
        <WhiteSpace />
        <Text>The verification code has been sent to your email!</Text>

        <WhiteSpace />

        <Input
          placeholder="Verification code"
          rounded
          placeholderTextColor={color.grey}
          family="AntDesign"
          icon="mail"
          cursorColor={theme?.colors?.primary}
        />

        <Button
          round
          style={style.primaryButton}
          onPress={() => {
            navigate('Login');
          }}>
          Verify
        </Button>
      </Flex>
    </>
  );
}

export default AccountVerifyScreen;
