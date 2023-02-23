import {Flex, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RadioButton, Switch} from 'react-native-paper';
import {style} from 'style';

const AdvancedScreen = () => {
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

  const [value, setValue] = React.useState('first');

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <Flex direction="column" align="start" style={myStyle.container}>
      <Text style={style.pageTitle}>Advanced Settings</Text>

      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />

      <Text style={myStyle.option}>Language</Text>

      <WhiteSpace />

      <RadioButton.Group
        onValueChange={newValue => setValue(newValue)}
        value={value}>
        <Flex>
          <RadioButton value="eng" />
          <Text>English</Text>
        </Flex>
        <Flex>
          <RadioButton value="vie" />
          <Text>Vietnamese</Text>
        </Flex>
      </RadioButton.Group>

      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />

      <Text style={myStyle.option}>Display</Text>

      <WhiteSpace />

      <Flex justify="between" style={{width: '100%'}}>
        <Text>Dark theme</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </Flex>
    </Flex>
  );
};

export default AdvancedScreen;
