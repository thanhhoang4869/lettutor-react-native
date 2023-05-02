import {Card, Flex, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color, style} from 'style';

import {Divider, Icon, Image} from 'react-native-elements';
import {AirbnbRating} from 'react-native-ratings';
import dateTimeUtils from 'utils/dateTimeUtils';
import moment from 'moment';

export interface HistoryCardChildProps {
  id: string;
  tutor: any;
  date: string;
  startPeriodTimestamp: number;
  endPeriodTimestamp: number;
  meetingLink: string;
  notes: string;
  onEdit: () => void;
  onCancel: () => void;
  onReview: () => void;
}

export interface HistoryCardProps {
  props: HistoryCardChildProps;
}

const HistoryCard = ({props}: HistoryCardProps) => {
  const renderDateTime = () => {
    const start = dateTimeUtils.toLetTutorTimeString(
      props.startPeriodTimestamp,
    );
    const end = dateTimeUtils.toLetTutorTimeString(props.endPeriodTimestamp);

    const getDate = dateTimeUtils.timeStampToDateString(
      props.startPeriodTimestamp,
    );
    const dateFormat = moment(getDate).format('DD MMM');
    return `${dateFormat}  ${start} - ${end}`;
  };

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
                  uri: props.tutor?.avatar,
                }}
                style={{width: 50, height: 50, borderRadius: 50}}
              />
              <Text style={myStyle.tutorName}>{props.tutor?.name}</Text>
            </Flex>

            <TouchableOpacity onPress={props.onEdit}>
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
            {renderDateTime()}
          </Text>

          <WhiteSpace />

          <Text>{props.notes ? `Notes: ${props.notes}` : 'No notes'}</Text>

          <WhiteSpace size="lg" />

          <Divider />

          <WhiteSpace size="lg" />

          <Text style={style.textBoldBlack}>Tutor's review</Text>
          <WhiteSpace />
          <Text>Tutor has not reviewed</Text>
          {/* <Text>Comment: Good job!</Text>
          <Flex>
            <Text>Student's skills: </Text>
            <AirbnbRating
              count={5}
              isDisabled={true}
              defaultRating={5}
              size={15}
              showRating={false}
            />
          </Flex> */}
        </View>
      </Card.Body>
    </Card>
  );
};

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

export default HistoryCard;
