import {Flex, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {color, style} from 'style';

import TutorCard from 'components/TutorCard';
import {SearchBarProps} from 'components/SearchBar';
import SearchBar from 'components/SearchBar';
import FieldChip from 'components/FieldChip';

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
      <Text style={style.pageTitle}>Tutors</Text>

      <WhiteSpace />

      <SearchBar placeHolder={searchBarProps.placeHolder} />

      <WhiteSpace />

      <ScrollView horizontal={true}>
        <FieldChip label="All" color={color.primaryColor} />
        <Text style={{marginRight: 5}} />
        <FieldChip label="English for Kids" color={color.darkGrey} />
        <Text style={{marginRight: 5}} />
        <FieldChip label="Business English" color={color.darkGrey} />
        <Text style={{marginRight: 5}} />
        <FieldChip label="Communication" color={color.darkGrey} />
      </ScrollView>

      <WhiteSpace />
      <WhiteSpace />

      <ScrollView
        style={{
          height: '80%',
          width: '100%',
        }}>
        <TutorCard />
        <WhiteSpace size="lg" />

        <TutorCard />
        <WhiteSpace size="lg" />

        <TutorCard />
        <WhiteSpace size="lg" />

        <TutorCard />
        <WhiteSpace size="lg" />

        <TutorCard />
        <WhiteSpace size="lg" />

        <TutorCard />
        <WhiteSpace size="lg" />

        <TutorCard />

        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
      </ScrollView>
    </Flex>
  );
}
