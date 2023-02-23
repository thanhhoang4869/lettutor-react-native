import {Flex, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {color, style} from 'style';

import {SearchBarProps} from 'components/SearchBar';
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

  const searchBarProps: SearchBarProps = {
    placeHolder: 'Search for tutors',
  };

  return (
    <Flex direction="column" align="start" style={myStyle.container}>
      <Flex justify="between" style={{width: '100%'}}>
        <Text style={style.pageTitle}>Home</Text>
        <TouchableOpacity
          onPress={() => {
            navigate('Settings');
          }}>
          <Image
            source={{
              uri: 'https://oiir.illinois.edu/sites/prod/files/Profile%20Picture_1.png',
            }}
            style={{width: 40, height: 40}}
          />
        </TouchableOpacity>
      </Flex>

      <WhiteSpace size="lg" />

      <Flex
        style={myStyle.welcomeBadge}
        direction="column"
        align="center"
        justify="center">
        <Text style={myStyle.welcomeBadgeText}>Welcome to LetTutor!</Text>
        <WhiteSpace />
        <Button
          style={myStyle.welcomeBadgeButton}
          onPress={() => navigate('Tutor')}>
          <Text style={myStyle.welcomeBadgeButtonText}>Book a lesson</Text>
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
