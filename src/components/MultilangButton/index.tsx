import React, {useState} from 'react';

import {Text, TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {View} from 'react-native';
import {style} from 'style';

const MultilangButton = () => {
  //language state
  const [language, setLanguage] = useState('en');

  const changeLange = () => {
    if (language === 'en') {
      setLanguage('vi');
    } else {
      setLanguage('en');
    }
  };

  return (
    <View style={style.header}>
      <TouchableOpacity
        style={style.mulButton}
        onPress={() => {
          changeLange();
        }}>
        {language === 'en' ? (
          <>
            <SvgUri width="30" height="30" source={require('assets/eng.svg')} />
            <Text style={style.ml3}>EN</Text>
          </>
        ) : (
          <>
            <SvgUri
              width="30"
              height="30"
              source={require('assets/viet.svg')}
            />
            <Text style={style.ml3}>VI</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MultilangButton;
