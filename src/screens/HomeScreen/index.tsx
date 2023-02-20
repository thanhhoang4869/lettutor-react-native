import React from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {Card, Flex} from '@ant-design/react-native';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {Chip} from '@react-native-material/core';
import {color} from 'style';

export default function HomeScreen(): JSX.Element {
  const style = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 30,
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

  const extra: React.ReactNode = (
    <Flex direction="row" justify="end">
      <Flex direction="row" style={{marginRight: 10}}>
        <Text style={style.starText}>5.00</Text>
        <Icon name="star" type="material-community" color="#F1cf35" />
      </Flex>

      <TouchableOpacity>
        <Icon name="heart" type="material-community" color="red" />
      </TouchableOpacity>
    </Flex>
  );

  const contentFooter: React.ReactNode = (
    <Flex direction="row" justify="start">
      <Chip variant="outlined" label="Outlined" color={color.primaryColor} />
    </Flex>
  );

  return (
    <ScrollView style={style.container}>
      <Card>
        <Card.Header
          title="Abby"
          thumbStyle={{width: 30, height: 30, marginRight: 16}}
          thumb="https://oiir.illinois.edu/sites/prod/files/Profile%20Picture_1.png"
          extra={extra}
        />
        <Card.Body>
          <View style={style.cardContent}>
            <Text style={style.cardContentText}>
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
    </ScrollView>
  );
}
