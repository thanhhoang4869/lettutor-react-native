import {Card, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {style} from 'style';

import {Image} from 'react-native-elements';

export interface CourseCardProps {
  onTouch: () => void;
}

const CourseCard = ({onTouch}: CourseCardProps) => {
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
        <Image
          source={{
            uri: 'https://hub.fullsail.edu/assets/ext/share/key-careers-in-art-animation-and-design-a-beginners-guide-share.jpg',
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
            <Text style={myStyle.courseName}>Life in The Internet Age</Text>

            <WhiteSpace />

            <Text>
              Let's discuss how technology is changing the way we live
            </Text>

            <WhiteSpace />

            <Text style={style.textBlack}>Intermediate &bull; 9 lessons</Text>

            <WhiteSpace />
          </View>
        </Card.Body>
      </Card>
    </TouchableOpacity>
  );
};

export default CourseCard;
