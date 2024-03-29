import {Flex, WhiteSpace} from '@ant-design/react-native';
import React, {useContext} from 'react';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {color, style} from 'style';

import {Button} from 'galio-framework';
import {Icon} from 'react-native-elements';
import {ApplicationContext} from 'context/ApplicationContext';

import Loading from 'components/Loading';
import {useTranslation} from 'react-i18next';

export default function SettingScreen({
  navigation: {navigate},
}: any): JSX.Element {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = React.useState(false);

  const {logout, account} = useContext(ApplicationContext);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    navigate('Login');
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <ScrollView style={myStyle.container}>
        <Flex direction="column" align="start">
          <Text style={style.pageTitle}>{t('setting_screen.title')}</Text>

          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />

          <TouchableOpacity
            onPress={() => {
              navigate('Account');
            }}>
            <Flex>
              <Image
                source={{
                  uri: account?.avatar,
                }}
                style={{width: 70, height: 70, borderRadius: 50}}
              />
              <Flex direction="column" align="start" style={{marginLeft: 20}}>
                <Text style={myStyle.name}>{account.name}</Text>
                <Text>{account.email}</Text>
              </Flex>
            </Flex>
          </TouchableOpacity>

          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />

          <Flex direction="column" style={style.w100} align="start">
            {/* <Button
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
            </Button> */}

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
                <Text style={myStyle.buttonText}>
                  {t('setting_screen.booking_history')}
                </Text>
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
                <Text style={myStyle.buttonText}>
                  {t('setting_screen.advanced_setting')}
                </Text>
              </Flex>
            </Button>

            <WhiteSpace size="lg" />
            <Button
              style={myStyle.button}
              onPress={() => {
                Linking.openURL('https://lettutor.com/').catch(err =>
                  Alert.alert("Couldn't load page", err),
                );
              }}>
              <Flex justify="start" style={style.w100}>
                <Icon
                  name="globe"
                  type="simple-line-icon"
                  color="black"
                  style={style.ml5}
                />
                <Text style={myStyle.buttonText}>
                  {t('setting_screen.our_website')}
                </Text>
              </Flex>
            </Button>

            <Button
              style={myStyle.button}
              onPress={() => {
                Linking.openURL('https://www.facebook.com/lettutorvn').catch(
                  err => Alert.alert("Couldn't load page", err),
                );
              }}>
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

            <Button style={myStyle.logOutButton} onPress={handleLogout}>
              {t('setting_screen.logout')}
            </Button>
          </Flex>
        </Flex>
      </ScrollView>
    </>
  );
}

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
