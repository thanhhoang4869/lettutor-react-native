import {Flex, WhiteSpace} from '@ant-design/react-native';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider, Icon, Image} from 'react-native-elements';
import {ScreenHeight} from 'react-native-elements/dist/helpers';
import Pdf from 'react-native-pdf';
import {color, style} from 'style';

const TopicDetailScreen = () => {
  const route = useRoute();
  const params = route.params as any;
  const topic = params.topic || [];

  const source = {
    uri: topic.nameFile,
    cache: true,
  };

  return (
    <View>
      <Image
        source={{
          uri: topic.courseImage,
        }}
        style={{
          width: '100%',
          height: 200,
        }}
      />
      <View
        style={{
          backgroundColor: 'white',
          padding: 30,
          height: ScreenHeight - 200,
        }}>
        <Text style={style.pageTitle}>{topic.courseName}</Text>
        <WhiteSpace size="lg" />
        <Flex>
          <Icon
            name="file-o"
            type="font-awesome"
            size={16}
            style={{marginRight: 10}}
            color={color.primaryColor}
          />

          <Text style={myStyle.headline}>
            Topic {topic.number}. {topic.name}
          </Text>
        </Flex>
        <WhiteSpace size="lg" />
        <Divider />
        <WhiteSpace size="lg" />

        <Pdf
          trustAllCerts={false}
          source={source}
          fitPolicy={0}
          style={myStyle.pdf}
        />
      </View>
    </View>
  );
};

const myStyle = StyleSheet.create({
  headline: {
    fontWeight: 'bold',
    fontSize: 16,
    color: color.primaryColor,
  },
  pdf: {
    flex: 1,
    width: '100%',
    borderColor: color.grey,
    borderWidth: 1,
  },
});

export default TopicDetailScreen;
