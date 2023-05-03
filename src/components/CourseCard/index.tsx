import {Card, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {style} from 'style';

import {Image} from 'react-native-elements';

export interface CourseCardProps {
  props: CourseCardChildProps;
}

export interface CourseCardChildProps {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  topicNumber: number;
  level: string;
  onTouch: () => void;
}

const CourseCard = ({props}: CourseCardProps) => {
  return (
    <TouchableOpacity onPress={props.onTouch}>
      <Card style={style.card}>
        <Image
          source={{
            uri: props.imageUrl,
          }}
          style={{
            width: '100%',
            height: 150,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <Card.Body>
          <View
            style={{
              padding: 5,
              paddingLeft: 20,
            }}>
            <Text style={myStyle.courseName}>{props.name}</Text>

            <WhiteSpace />

            <Text>{props.description}</Text>

            <WhiteSpace />

            <Text style={style.textBlack}>
              {props.level} &bull; {props.topicNumber} topics
            </Text>

            <WhiteSpace />
          </View>
        </Card.Body>
      </Card>
    </TouchableOpacity>
  );
};

const myStyle = StyleSheet.create({
  courseName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});

export default CourseCard;
