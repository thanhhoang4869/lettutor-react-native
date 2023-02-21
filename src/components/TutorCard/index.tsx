import {Card, Flex, WhiteSpace} from '@ant-design/react-native';
import FieldChip from 'components/FieldChip';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {color, style} from 'style';

export default function TutorCard(): JSX.Element {
  const myStyle = StyleSheet.create({
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
    card: {
      shadowColor: '#000',
      shadowOffset: {
        width: 8,
        height: 8,
      },
      shadowOpacity: 0.27,
      shadowRadius: 3.65,
      elevation: 5,
      // borderRadius: 10,
    },
  });

  const extra: React.ReactNode = (
    <Flex direction="row" justify="end">
      <Flex
        direction="row"
        justify="end"
        // style={{marginRight: 10}}
      >
        <Text style={myStyle.starText}>5.00</Text>
        <Icon name="star" type="material-community" color="#F1cf35" />
      </Flex>

      {/* <TouchableOpacity>
        <Icon name="heart" type="material-community" color="red" />
      </TouchableOpacity> */}
    </Flex>
  );

  const contentFooter: React.ReactNode = (
    <Flex direction="row" justify="start">
      <FieldChip label="toeic" color={color.primaryColor} />
      <Text style={{marginRight: 5}} />
      <FieldChip label="ielts" color={color.primaryColor} />
    </Flex>
  );

  return (
    <>
      <Card style={myStyle.card}>
        <Card.Header
          title="Abby"
          thumbStyle={{width: 30, height: 30, marginRight: 16}}
          thumb="https://oiir.illinois.edu/sites/prod/files/Profile%20Picture_1.png"
          extra={extra}
        />
        <Card.Body>
          <View style={myStyle.cardContent}>
            <Text style={myStyle.cardContentText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem.
            </Text>
          </View>
        </Card.Body>
        <Card.Footer content={contentFooter} />
      </Card>
    </>
  );
}
