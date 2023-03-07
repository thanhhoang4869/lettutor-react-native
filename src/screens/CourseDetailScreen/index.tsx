import {Flex, WhiteSpace} from '@ant-design/react-native';
import TopicCard from 'components/TopicCard';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Divider, Icon, Image} from 'react-native-elements';
import {color, style} from 'style';

const CourseDetailScreen = ({navigation: {navigate}}: any) => {
  const myStyle = StyleSheet.create({
    headline: {
      fontWeight: 'bold',
      fontSize: 18,
      color: color.primaryColor,
    },
  });

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
          <Text>Explore advanced topics about life.</Text>

          <WhiteSpace size="lg" />

          <Divider />

          <WhiteSpace size="lg" />

          <View>
            <Text style={myStyle.headline}>Overview</Text>
            <WhiteSpace />

            <View>
              <Flex>
                <Icon
                  size={16}
                  name="info"
                  type="feather"
                  style={{marginRight: 5}}
                />
                <Text style={style.textBlack}>Why take this course</Text>
              </Flex>
              <WhiteSpace />
              <Text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut
                quam porro repellendus reiciendis.
              </Text>
            </View>

            <WhiteSpace />

            <View>
              <Flex>
                <Icon
                  size={16}
                  name="info"
                  type="feather"
                  style={{marginRight: 5}}
                />
                <Text style={style.textBlack}>What you will be able to do</Text>
              </Flex>
              <WhiteSpace />
              <Text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut
                quam porro repellendus reiciendis.
              </Text>
            </View>
          </View>

          <WhiteSpace size="lg" />

          <View>
            <Text style={myStyle.headline}>Level</Text>
            <WhiteSpace />
            <Text style={style.textBlack}>Beginner</Text>
          </View>

          <WhiteSpace size="lg" />

          <View>
            <Text style={myStyle.headline}>Course length</Text>
            <WhiteSpace />
            <Text style={style.textBlack}>3 topics</Text>
            <WhiteSpace size="lg" />
            <TopicCard
              title="1. Introduction to the Internet"
              onTouch={() => {}}
            />
            <WhiteSpace size="lg" />
            <TopicCard title="2. Gamification" onTouch={() => {}} />
            <WhiteSpace size="lg" />
            <TopicCard title="3. ChatGPT in action" onTouch={() => {}} />
          </View>

          <WhiteSpace size="lg" />
        </View>
      </ScrollView>
    </>
  );
};

export default CourseDetailScreen;
