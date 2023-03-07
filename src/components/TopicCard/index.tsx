import {Card} from '@ant-design/react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {style} from 'style';

export interface TopicCardProps {
  title: string;
  onTouch: () => void;
}

const TopicCard = ({title, onTouch}: TopicCardProps) => {
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
        <Card.Body>
          <View
            style={{
              padding: 5,
              paddingLeft: 20,
            }}>
            <Text style={myStyle.courseName}>{title}</Text>
          </View>
        </Card.Body>
      </Card>
    </TouchableOpacity>
  );
};

export default TopicCard;
