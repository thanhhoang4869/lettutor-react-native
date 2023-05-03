import {Card, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {style} from 'style';

import {Image} from 'react-native-elements';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();

  const renderLevel = () => {
    switch (props.level) {
      case '1':
        return 'Beginner';
      case '2':
        return 'Upper Beginner';
      case '3':
        return 'Pre Intermediate';
      case '4':
        return 'Intermediate';
      case '5':
        return 'Upper Intermediate';
      case '6':
        return 'Pre Advanced';
      case '7':
        return 'Advanced';
      case '8':
        return 'Very Advanced';
    }
  };
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
              {renderLevel()} &bull; {props.topicNumber}{' '}
              {t('course_card.topics')}
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
