import {Card, Flex, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color, style} from 'style';

import {Button} from 'galio-framework';
import {Icon, Image} from 'react-native-elements';
import dateTimeUtils from 'utils/dateTimeUtils';
import moment from 'moment';
import jwt_decode from 'jwt-decode';
import {useTranslation} from 'react-i18next';

export interface ScheduleCardProps {
  props: ScheduleCardChildProps;
}

export interface ScheduleCardChildProps {
  id: string;
  tutor: any;
  date: string;
  startPeriodTimestamp: number;
  endPeriodTimestamp: number;
  meetingLink: string;
  notes: string;
  onEdit: () => void;
  onCancel: () => void;
  onJoin: (params: any) => void;
}

const ScheduleCard = ({props}: ScheduleCardProps) => {
  const {t} = useTranslation();
  const renderDateTime = () => {
    const start = dateTimeUtils.toLetTutorTimeString(
      props.startPeriodTimestamp,
    );
    const end = dateTimeUtils.toLetTutorTimeString(props.endPeriodTimestamp);
    const getDate = dateTimeUtils.timeStampToDateString(
      props.startPeriodTimestamp,
    );
    const dateFormat = moment(getDate).format('DD-MM-YYYY');
    return `${dateFormat}  ${start} - ${end}`;
  };

  const joinMeeting = async () => {
    const studentMeetingLink = props.meetingLink;
    const token = studentMeetingLink.split('=')[1];
    const jitsiParams = jwt_decode(token) as any;

    props.onJoin(jitsiParams);
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
              <Icon name="edit" color={color.primaryColor} />
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

          <Text>
            {props.notes
              ? `${t('schedule_card.note')}: ${props.notes}`
              : t('schedule_card.no_note')}
          </Text>

          <WhiteSpace />

          <Flex style={style.w100}>
            <Button
              round
              onPress={props.onCancel}
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
                {t('schedule_card.cancel')}
              </Text>
            </Button>

            <Button
              round
              style={{
                width: '45%',
                backgroundColor: color.primaryColor,
              }}
              onPress={joinMeeting}>
              {t('schedule_card.join')}
            </Button>
          </Flex>
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

  tutorName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 15,
    color: 'black',
  },
});

export default ScheduleCard;
