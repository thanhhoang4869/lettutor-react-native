import {Card, Flex} from '@ant-design/react-native';
import FieldChip from 'components/FieldChip';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {color, style} from 'style';

export interface TutorCardProps {
  onTouch: () => void;
}

export default function TutorCard({onTouch}: TutorCardProps): JSX.Element {
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
  });

  const extra: React.ReactNode = (
    <Flex direction="row" justify="end">
      <AirbnbRating
        count={5}
        isDisabled={true}
        defaultRating={5}
        size={15}
        showRating={false}
      />

      {/* <TouchableOpacityOpacity>
        <Icon name="heart" type="material-community" color="red" />
      </TouchableOpacityOpacity> */}
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
      <TouchableOpacity onPress={onTouch}>
        <Card style={style.card}>
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
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum! Provident similique accusantium nemo autem.
              </Text>
            </View>
          </Card.Body>
          <Card.Footer content={contentFooter} />
        </Card>
      </TouchableOpacity>
    </>
  );
}
