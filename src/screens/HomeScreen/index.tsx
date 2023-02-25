import {Flex, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {color} from 'style';

import Header, {HeaderProps} from 'components/Header';
import TutorHomeCard from 'components/TutorHomeCard';
import {Button} from 'galio-framework';
import {Icon} from 'react-native-elements';

export default function HomeScreen({navigation: {navigate}}: any): JSX.Element {
  const myStyle = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 30,
      paddingTop: 15,
    },
    cardContent: {
      height: 70,
    },
    cardContentText: {
      marginLeft: 16,
    },
    starText: {
      marginRight: 5,
      fontWeight: 'bold',
    },
    welcomeBadge: {
      backgroundColor: color.primaryColor,
      width: '160%',
      height: '30%',
      marginLeft: -100,
      marginRight: -100,
    },
    welcomeBadgeText: {
      color: 'white',
    },
    welcomeBadgeHeader: {
      color: 'white',
      fontSize: 18,
    },
    welcomeBadgeCourseName: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
    },
    welcomeBadgeButton: {
      backgroundColor: 'white',
      color: color.primaryColor,
      borderRadius: 50,
    },
    welcomeBadgeButtonText: {
      color: color.primaryColor,
      fontWeight: '500',
    },
  });

  const headerProps: HeaderProps = {
    title: 'Home',
    onTouch: () => {
      navigate('Settings');
    },
  };

  return (
    <Flex direction="column" align="start" style={myStyle.container}>
      <Header title={headerProps.title} onTouch={headerProps.onTouch} />

      <WhiteSpace size="lg" />

      <Flex
        style={myStyle.welcomeBadge}
        direction="column"
        align="center"
        justify="center">
        <Text style={myStyle.welcomeBadgeText}>Upcoming Lesson</Text>
        <WhiteSpace />
        <Text style={myStyle.welcomeBadgeCourseName}>English for Business</Text>
        <WhiteSpace />
        <Text style={myStyle.welcomeBadgeText}>2023-02-24 at 18:30</Text>
        <WhiteSpace />
        <Button style={myStyle.welcomeBadgeButton}>
          <Text style={myStyle.welcomeBadgeButtonText}>Join lesson</Text>
        </Button>
      </Flex>

      <WhiteSpace size="lg" />

      <Flex direction="row" justify="between" style={{width: '100%'}}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            // textDecorationLine: 'underline',
          }}>
          Recommended Tutors
        </Text>

        <TouchableOpacity onPress={() => navigate('Tutor')}>
          <Flex align="center">
            <Text
              style={{
                color: color.primaryColor,
              }}>
              See all
            </Text>

            <Icon
              name="arrow-right"
              type="antd"
              color={color.primaryColor}
              style={{marginLeft: -5, marginRight: -5}}
            />
          </Flex>
        </TouchableOpacity>
      </Flex>

      <WhiteSpace size="lg" />

      <ScrollView
        style={{
          height: '60%',
          width: '100%',
        }}>
        <TutorHomeCard />
        <WhiteSpace size="lg" />

        <TutorHomeCard />
        <WhiteSpace size="lg" />

        <TutorHomeCard />
        <WhiteSpace size="lg" />

        <TutorHomeCard />
        <WhiteSpace size="lg" />

        <TutorHomeCard />
        <WhiteSpace size="lg" />

        <TutorHomeCard />
        <WhiteSpace size="lg" />

        <TutorHomeCard />

        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
      </ScrollView>
    </Flex>
  );
}
