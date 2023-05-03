import {Flex, WhiteSpace} from '@ant-design/react-native';
import {useRoute} from '@react-navigation/native';
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

  const route = useRoute();
  const params = route.params as any;
  const course = params.course || [];

  const renderLevel = () => {
    switch (+course.level) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Upper Beginner';
      case 3:
        return 'Pre Intermediate';
      case 4:
        return 'Intermediate';
      case 5:
        return 'Upper Intermediate';
      case 6:
        return 'Pre Advanced';
      case 7:
        return 'Advanced';
      case 8:
        return 'Very Advanced';
    }
  };

  const renderTopics = () => {
    return course.topics?.map((topic: any, index: number) => {
      topic.courseName = course.name;
      topic.courseImage = course.imageUrl;
      topic.number = index + 1;
      return (
        <React.Fragment key={index}>
          <TopicCard
            number={index + 1}
            title={topic.name}
            onTouch={() => {
              navigate('TopicDetail', {topic});
            }}
          />
          <WhiteSpace size="lg" />
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <ScrollView style={{backgroundColor: 'white'}}>
        <Image
          source={{
            uri: course.imageUrl,
          }}
          style={{
            width: '100%',
            height: 200,
          }}
        />
        <View style={style.container}>
          <Text style={style.pageTitle}>{course.name}</Text>
          <WhiteSpace />
          <Text>{course.description}</Text>

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
              <Text>{course.reason}</Text>
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
                <Text style={style.textBlack}>What you will learn</Text>
              </Flex>
              <WhiteSpace />
              <Text>{course.purpose}</Text>
            </View>
          </View>

          <WhiteSpace size="lg" />

          <View>
            <Text style={myStyle.headline}>Level</Text>
            <WhiteSpace />
            <Text style={style.textBlack}>{renderLevel()}</Text>
          </View>

          <WhiteSpace size="lg" />

          <View>
            <Text style={myStyle.headline}>Course length</Text>
            <WhiteSpace />
            <Text style={style.textBlack}>{course.topics.length} topics</Text>
            <WhiteSpace size="lg" />
          </View>

          {renderTopics()}
        </View>
      </ScrollView>
    </>
  );
};

export default CourseDetailScreen;
