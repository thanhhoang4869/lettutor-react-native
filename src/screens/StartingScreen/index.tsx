import {Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {style, color} from 'style';
import {Flex, WhiteSpace} from '@ant-design/react-native';
import {Button} from 'galio-framework';
import {Icon} from 'react-native-elements';

const StartingScreen = ({navigation: {navigate}}: any) => {
  const myStyle = StyleSheet.create({
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: color.primaryColor,
    },
    subtitle: {
      fontSize: 20,
    },
    imageStyle: {
      width: '100%',
      height: '100%',
      marginTop: -110,
      marginBottom: -100,
    },
    button: {
      width: '100%',
      borderRadius: 50,
      backgroundColor: color.primaryColor,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    flexText: {
      color: 'white',
      marginRight: 10,
    },
  });

  const image = require('assets/start.png');

  return (
    <Flex direction="column" style={style.container} justify="center">
      <Flex direction="column" justify="center" align="start">
        <Text style={myStyle.title}>LetTutor</Text>
        <Text style={myStyle.subtitle}>English Langugae Teaching</Text>
      </Flex>
      <Image resizeMode={'contain'} source={image} style={myStyle.imageStyle} />
      <Button
        round
        style={myStyle.button}
        onPress={() => {
          navigate('Login');
        }}>
        <Text style={myStyle.flexText}>Get started</Text>
        <Icon name="arrow-right" type="material-community" color="white" />
      </Button>
    </Flex>
  );
};

export default StartingScreen;
