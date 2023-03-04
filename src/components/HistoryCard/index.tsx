import {Card, Flex, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color, style} from 'style';

import {Divider, Icon, Image} from 'react-native-elements';
import {AirbnbRating} from 'react-native-ratings';

export interface HistoryCardProps {
  teacher: string;
  date: string;
  time: string;
  notes: string;
  onEdit: () => void;
  onCancel: () => void;
}

const HistoryCard = ({
  teacher,
  date,
  time,
  notes,
  onEdit,
  onCancel,
}: HistoryCardProps) => {
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
    <Card style={style.card}>
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
              <Flex>
                <Text style={{marginRight: 5, ...style.textBoldPrimary}}>
                  Review
                </Text>
                <Icon name="edit" color={color.primaryColor} />
              </Flex>
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

          <WhiteSpace size="lg" />

          <Divider />

          <WhiteSpace size="lg" />

          <Text style={style.textBoldBlack}>Tutor's review</Text>
          <WhiteSpace />
          <Text>Lesson progress: Completed</Text>
          <Text>Comment: Good job!</Text>
          <Flex>
            <Text>Student's skills: </Text>
            <AirbnbRating
              count={5}
              isDisabled={true}
              defaultRating={5}
              size={15}
              showRating={false}
            />
          </Flex>
        </View>
      </Card.Body>
    </Card>
  );
};

export default HistoryCard;
