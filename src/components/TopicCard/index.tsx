import {Card} from '@ant-design/react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {style} from 'style';

export interface TopicCardProps {
  number: number;
  title: string;
  onTouch: () => void;
}

const TopicCard = ({title, number, onTouch}: TopicCardProps) => {
  const myStyle = StyleSheet.create({
    courseName: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'black',
    },
  });

  return (
    <TouchableOpacity onPress={onTouch}>
      <Card style={style.card}>
        <View
          style={{
            padding: 10,
            paddingTop: 15,
            paddingLeft: 20,
          }}>
          <Text style={myStyle.courseName}>
            {number}. {title}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default TopicCard;
