import {Card, Flex, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color, style} from 'style';

import {Button} from 'galio-framework';
import {Icon, Image} from 'react-native-elements';

export interface ScheduleCardProps {
  teacher: string;
  date: string;
  time: string;
  notes: string;
  onEdit: () => void;
  onCancel: () => void;
}

const ScheduleCard = ({
  teacher,
  date,
  time,
  notes,
  onEdit,
  onCancel,
}: ScheduleCardProps) => {
  const myStyle = StyleSheet.create({
    cardContent: {
      height: 70,
    },
    cardContentText: {
      marginLeft: 16,
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
    },
    tutorName: {
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft: 15,
      color: 'black',
    },
  });
  return (
    <Card>
      <Card.Body>
        <View
          style={{
            padding: 5,
            paddingLeft: 20,
          }}>
          <Flex justify="between" style={{paddingRight: 20}}>
            <Flex>
              <Image
                source={{
                  uri: 'https://oiir.illinois.edu/sites/prod/files/Profile%20Picture_1.png',
                }}
                style={{width: 50, height: 50, borderRadius: 50}}
              />
              <Text style={myStyle.tutorName}>{teacher}</Text>
            </Flex>

            <TouchableOpacity onPress={onEdit}>
              <Icon name="edit" color={color.primaryColor} />
            </TouchableOpacity>
          </Flex>
          <WhiteSpace size="xl" />

          <Text
            style={{
              fontSize: 16,
              ...style.textBoldBlack,
            }}>
            {`${date} at ${time}`}
          </Text>

          <WhiteSpace />

          <Text>Notes: {notes}</Text>

          <WhiteSpace />

          <Flex
            style={{
              width: '100%',
            }}>
            <Button
              round
              onPress={onCancel}
              style={{
                width: '45%',
                marginLeft: -2,
                backgroundColor: 'lightgrey',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                }}>
                Cancel
              </Text>
            </Button>

            <Button
              round
              style={{
                width: '45%',
                backgroundColor: color.primaryColor,
              }}>
              Join class
            </Button>
          </Flex>
        </View>
      </Card.Body>
    </Card>
  );
};

export default ScheduleCard;
