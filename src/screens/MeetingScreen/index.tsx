import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

import {color} from 'style';

const MeetingScreen = () => {
  return (
    <View style={myStyle.container}>
      <ImageBackground
        style={{
          height: '100%',
        }}
        source={require('assets/jitsi.png')}
        resizeMode="cover"
      />
    </View>
  );
};

const myStyle = StyleSheet.create({
  gptChat: {
    color: color.primaryColor,
    fontWeight: 'bold',
  },
  myChat: {
    color: 'black',
    fontWeight: 'bold',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  fab: {
    marginRight: 16,
    marginBottom: 100,
    shadowColor: 'white',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5.32,

    elevation: 8,
  },
});

export default MeetingScreen;
