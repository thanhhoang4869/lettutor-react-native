import {Card, Flex, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color, style} from 'style';

import {Divider, Icon, Image} from 'react-native-elements';
import dateTimeUtils from 'utils/dateTimeUtils';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

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

  return (
    <Card style={style.card}>
      <View
        style={{
          padding: 5,
          paddingLeft: 20,
          marginTop: 10,
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
                {t('history_card.review')}
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

        <Text>
          {props.notes
            ? `${t('history_card.note')}: ${props.notes}`
            : t('history_card.no_note')}
        </Text>

        <WhiteSpace size="lg" />

        <Divider />

        <WhiteSpace size="lg" />

        <Text style={style.textBoldBlack}>
          {t('history_card.tutor_review')}
        </Text>
        <WhiteSpace />
        <Text>{t('history_card.no_review')}</Text>
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
