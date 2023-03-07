import {Flex, WhiteSpace} from '@ant-design/react-native';
import TopicCard from 'components/TopicCard';
import React from 'react';
import {ScrollView, StyleSheet, Dimensions, Text, View} from 'react-native';
import {Divider, Icon, Image} from 'react-native-elements';
import {color, style} from 'style';
import Pdf from 'react-native-pdf';

const TopicDetailScreen = ({navigation: {navigate}}: any) => {
  const myStyle = StyleSheet.create({
    headline: {
      fontWeight: 'bold',
      fontSize: 16,
      color: color.primaryColor,
    },
    pdf: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

  const source = {
    uri: 'https://www.africau.edu/images/default/sample.pdf',
    cache: true,
  };

  return (
    <>
      <ScrollView style={{backgroundColor: 'white'}}>
        <Image
          source={{
            uri: 'https://hub.fullsail.edu/assets/ext/share/key-careers-in-art-animation-and-design-a-beginners-guide-share.jpg',
          }}
          style={{
            width: '100%',
            height: 200,
          }}
        />
        <View style={style.container}>
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

          <ScrollView>
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
              style={myStyle.pdf}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

export default TopicDetailScreen;
