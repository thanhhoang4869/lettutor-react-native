import {Flex, WhiteSpace} from '@ant-design/react-native';
import {useIsFocused} from '@react-navigation/native';
import HistoryCard from 'components/HistoryCard';
import {HistoryCardChildProps} from 'components/HistoryCard';
import Loading from 'components/Loading';
import {Button, Input} from 'galio-framework';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import Modal from 'react-native-modal';
import {DataTable} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import scheduleService, {FetchHistoryParams} from 'services/scheduleService';
import {color, style} from 'style';
import dateTimeUtils from 'utils/dateTimeUtils';

const BookingHistoryScreen = ({navigation: {navigate}}: any) => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const image = require('assets/history.png');

  const [isReviewModalVisible, setReviewModalVisible] = React.useState(false);

  const toggleReviewModal = () => {
    setReviewModalVisible(!isReviewModalVisible);
  };

  const [studyHistory, setStudyHistory] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const params: FetchHistoryParams = {
        page: 1,
        perPage: 10,
        dateTimeLte: dateTimeUtils.getCurrentTimeStamp(),
        sortBy: 'desc',
        orderBy: 'meeting',
      };

      const response = await scheduleService.fetchHistory(params);

      if (response.status === 200) {
        setStudyHistory(response.data.data);
      } else {
        setLoading(false);
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      Alert.alert('Error', 'Something went wrong');
    }

    setLoading(false);
  };

  const renderHistory = () => {
    return studyHistory?.rows?.map((item: any, index: number) => {
      const historyProps: HistoryCardChildProps = {
        id: item.id,
        tutor: item.scheduleDetailInfo?.scheduleInfo?.tutorInfo || {},
        date: item.scheduleDetailInfo?.scheduleInfo?.date,
        startPeriodTimestamp: item.scheduleDetailInfo?.startPeriodTimestamp,
        endPeriodTimestamp: item.scheduleDetailInfo?.endPeriodTimestamp,
        meetingLink: item.studentMeetingLink,
        notes: item.studentRequest,
        onEdit: () => {},
        onCancel: () => {},
        onReview: () => {},
      };

      return (
        <React.Fragment key={index}>
          <HistoryCard props={historyProps} />
          <WhiteSpace size="lg" />
        </React.Fragment>
      );
    });
  };

  useEffect(() => {
    fetchHistory();
  }, [isFocused]);

  return (
    <>
      {loading && <Loading />}

      {studyHistory?.rows?.length > 0 && (
        <Flex direction="column" align="start" style={myStyle.container}>
          {/* review modal start */}
          <View>
            <Modal isVisible={isReviewModalVisible}>
              <Flex style={style.modal} direction="column" align="start">
                <Text style={{margin: 5, ...style.modalTitle}}>
                  Review this lesson
                </Text>

                <WhiteSpace size="lg" />

                <Flex justify="center" style={style.w100}>
                  <AirbnbRating
                    count={5}
                    reviews={['Terrible', 'Bad', 'Fair', 'Good', 'Excellent']}
                    defaultRating={5}
                    size={30}
                    reviewSize={16}
                    reviewColor={color.primaryColor}
                  />
                </Flex>

                <WhiteSpace size="lg" />

                <Input
                  multiline={true}
                  cursorColor={color.primaryColor}
                  style={style.textArea}
                />

                <WhiteSpace size="lg" />

                <Flex
                  justify="between"
                  style={{
                    width: '100%',
                    marginLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleReviewModal();
                    }}>
                    <Text style={style.textBold}>Cancel</Text>
                  </TouchableOpacity>
                  <Button
                    style={style.primaryButtonNoWidth}
                    onPress={toggleReviewModal}>
                    Submit
                  </Button>
                </Flex>
              </Flex>
            </Modal>
          </View>
          {/* review modal end */}

          <Text style={style.pageTitle}>{t('history_screen.title')}</Text>

          <WhiteSpace size="xl" />

          <Flex
            align="center"
            style={{
              width: '100%',
              paddingRight: 50,
            }}>
            <Image
              resizeMode={'contain'}
              source={image}
              style={{
                width: 50,
                height: 50,
                marginRight: 20,
              }}
            />

            <Text style={style.textBold}>
              {t('history_screen.description')}
            </Text>
          </Flex>

          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />

          {studyHistory?.rows?.length > 0 ? (
            <ScrollView
              style={{
                height: '80%',
                width: '100%',
              }}>
              {renderHistory()}

              <WhiteSpace size="lg" />

              <DataTable.Pagination
                style={{
                  justifyContent: 'flex-end',
                  marginRight: -12,
                }}
                page={0}
                numberOfPages={5}
                onPageChange={tarPage => {}}
                // label={getPagingLabel()}
                showFastPaginationControls
                numberOfItemsPerPage={12}
                selectPageDropdownLabel={'Rows per page'}
              />
              <WhiteSpace size="lg" />
            </ScrollView>
          ) : (
            <Image
              source={require('assets/nodata.png')}
              style={{
                marginTop: 20,
                width: 300,
                height: 300,
              }}
            />
          )}
        </Flex>
      )}
    </>
  );
};

const myStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 30,
    paddingTop: 15,
  },
});

export default BookingHistoryScreen;
