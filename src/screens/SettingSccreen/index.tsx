import {Flex, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {color, style} from 'style';

import {Button} from 'galio-framework';
import {Icon} from 'react-native-elements';

export default function SettingScreen({
  navigation: {navigate},
}: any): JSX.Element {
  const myStyle = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
      padding: 30,
      paddingTop: 15,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    button: {
      backgroundColor: 'white',
      borderColor: color.lightGrey,
      width: '95%',
      borderRadius: 50,
      shadowColor: '#000',
      shadowOffset: {
        width: 8,
        height: 8,
      },
      shadowOpacity: 0.27,
      shadowRadius: 3.65,
      elevation: 5,
    },
    logOutButton: {
      backgroundColor: color.primaryColor,
      borderRadius: 50,
      width: '95%',
    },
    buttonText: {
      marginLeft: 15,
      color: 'black',
    },
  });

  return (
    <ScrollView style={myStyle.container}>
      <Flex direction="column" align="start">
        <Text style={style.pageTitle}>Settings</Text>

        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />

        <TouchableOpacity
          onPress={() => {
            navigate('Account');
          }}>
          <Flex>
            <Image
              source={{
                uri: 'https://oiir.illinois.edu/sites/prod/files/Profile%20Picture_1.png',
              }}
              style={{width: 70, height: 70}}
            />
            <Flex direction="column" align="start" style={{marginLeft: 20}}>
              <Text style={myStyle.name}>John Doe</Text>
              <Text>john.doe@gmail.com</Text>
            </Flex>
          </Flex>
        </TouchableOpacity>

        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />

        <Flex direction="column" style={style.w100} align="start">
          <Button
            style={myStyle.button}
            onPress={() => navigate('BecomeTutor')}>
            <Flex justify="start" style={style.w100}>
              <Icon
                name="book"
                type="feather"
                color="black"
                style={style.ml5}
              />
              <Text style={myStyle.buttonText}>Become a Tutor</Text>
            </Flex>
          </Button>

          <Button
            style={myStyle.button}
            onPress={() => navigate('BookingHistory')}>
            <Flex justify="start" style={style.w100}>
              <Icon
                name="history"
                type="material-icon"
                color="black"
                style={style.ml5}
              />
              <Text style={myStyle.buttonText}>Booking History</Text>
            </Flex>
          </Button>

          <Button style={myStyle.button} onPress={() => navigate('Advance')}>
            <Flex justify="start" style={style.w100}>
              <Icon
                // name="language-outline"
                // type="ionicon"
                name="settings"
                type="feather"
                color="black"
                style={style.ml5}
              />
              <Text style={myStyle.buttonText}>Advanced Settings</Text>
            </Flex>
          </Button>

          <WhiteSpace size="lg" />
          <Button style={myStyle.button}>
            <Flex justify="start" style={style.w100}>
              <Icon
                name="globe"
                type="simple-line-icon"
                color="black"
                style={style.ml5}
              />
              <Text style={myStyle.buttonText}>Our website</Text>
            </Flex>
          </Button>

          <Button style={myStyle.button}>
            <Flex justify="start" style={style.w100}>
              <Icon
                name="social-facebook"
                type="simple-line-icon"
                color="black"
                style={style.ml5}
              />
              <Text style={myStyle.buttonText}>Facebook</Text>
            </Flex>
          </Button>
          <WhiteSpace size="lg" />

          <Button style={myStyle.logOutButton}>Logout</Button>
        </Flex>
      </Flex>
    </ScrollView>
  );
}
