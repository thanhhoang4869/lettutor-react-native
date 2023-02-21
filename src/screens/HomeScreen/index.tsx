import {Flex, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {color, style} from 'style';

import TutorHomeCard from 'components/TutorHomeCard';
import {SearchBarProps} from 'components/SearchBar';
import SearchBar from 'components/SearchBar';

export default function HomeScreen(): JSX.Element {
  const myStyle = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      paddingTop: 15,
      paddingLeft: 30,
      paddingRight: 30,
      paddingBottom: 30,
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
  });

  const searchBarProps: SearchBarProps = {
    placeHolder: 'Search for tutors',
  };

  return (
    <Flex direction="column" align="start" style={myStyle.container}>
      <Text style={style.pageTitle}>Home</Text>

      <WhiteSpace size="lg" />

      <ScrollView
        style={{
          height: '80%',
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
