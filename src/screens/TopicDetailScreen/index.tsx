import {Flex, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Divider, Icon, Image} from 'react-native-elements';
import {ScreenHeight} from 'react-native-elements/dist/helpers';
import Pdf from 'react-native-pdf';
import {color, style} from 'style';

const TopicDetailScreen = ({navigation: {navigate}}: any) => {
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

  const source = {
    uri: 'https://dl.ebooksworld.ir/books/Spring.in.Action.6th.Edition.Craig.Walls.Manning.9781617297571.EBooksWorld.ir.pdf',
    cache: true,
  };

  return (
    <View>
      <Image
        source={{
          uri: 'https://hub.fullsail.edu/assets/ext/share/key-careers-in-art-animation-and-design-a-beginners-guide-share.jpg',
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
        <Text style={style.pageTitle}>Life in the Internet Age</Text>
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
            Topic 1. Introduction to the Internet
          </Text>
        </Flex>
        <WhiteSpace size="lg" />
        <Divider />
        <WhiteSpace size="lg" />

        <Pdf
          trustAllCerts={false}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          fitPolicy={0}
          style={myStyle.pdf}
        />
      </View>
    </View>
  );
};

export default TopicDetailScreen;
