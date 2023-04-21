import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import style from './style';

const Loading = () => {
  return (
    <View style={style.loadingContainer}>
      <ActivityIndicator size="large" color="#FFF" />
    </View>
  );
};

export default Loading;
