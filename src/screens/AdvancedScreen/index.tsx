import {Flex, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text} from 'react-native';
import {RadioButton, Switch} from 'react-native-paper';
import storageService from 'services/storageService';
import {style} from 'style';
import i18n from '../../localization/i18n';

const AdvancedScreen = () => {
  const {t} = useTranslation();

  const [language, setLanguage] = React.useState(i18n.language);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const changeAppLanguage = (newLang: string) => {
    setLanguage(newLang);
    storageService.storeString('language', newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <Flex direction="column" align="start" style={myStyle.container}>
      <Text style={style.pageTitle}>{t('advanced_screen.title')}</Text>

      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />

      <Text style={myStyle.option}>{t('advanced_screen.language')}</Text>

      <WhiteSpace />

      <RadioButton.Group
        onValueChange={newValue => changeAppLanguage(newValue)}
        value={language}>
        <Flex>
          <RadioButton value="en" />
          <Text>English</Text>
        </Flex>
        <Flex>
          <RadioButton value="vi" />
          <Text>Tiếng Việt</Text>
        </Flex>
      </RadioButton.Group>

      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />

      <Text style={myStyle.option}>{t('advanced_screen.display')}</Text>

      <WhiteSpace />

      <Flex justify="between" style={{width: '100%'}}>
        <Text style={style.ml3}>{t('advanced_screen.dark')}</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </Flex>
    </Flex>
  );
};

const myStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    padding: 30,
    paddingTop: 15,
  },

  option: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default AdvancedScreen;
