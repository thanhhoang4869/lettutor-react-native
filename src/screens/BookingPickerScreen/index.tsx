/* eslint-disable react-hooks/exhaustive-deps */
import {Flex, WhiteSpace} from '@ant-design/react-native';
import {useRoute} from '@react-navigation/native';
import Loading from 'components/Loading';
import {Button, Input} from 'galio-framework';
import moment from 'moment';
import React, {useEffect} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
import scheduleService from 'services/scheduleService';
import tutorService, {ScheduleParams} from 'services/tutorService';
import {color, style} from 'style';
import dateTimeUtils from 'utils/dateTimeUtils';

interface BookingPickerRouteParams {
  tutorId: string;
  tutorName: string;
}

const BookingPickerScreen = ({navigation: {navigate}}: any) => {
  const route = useRoute();
  const params = route.params as BookingPickerRouteParams;
  const tutorId = params?.tutorId;
  const tutorName = params?.tutorName;

  const [selectedSchedule, setSelectedSchedule] = React.useState<any>({});

  const [isConfirmModalVisible, setConfirmModalVisible] = React.useState(false);
  const toggleConfirmModal = () => {
    setConfirmModalVisible(!isConfirmModalVisible);
  };
  const [schedule, setSchedule] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [selectedDate, setSelectedDate] = React.useState(moment());

  const [note, setNote] = React.useState('');

  const fetchSchedule = async (period: any) => {
    setLoading(true);
    const scheduleParams: ScheduleParams = {
      tutorId: tutorId,
      startTimestamp: period.start,
      endTimestamp: period.end,
    };
    try {
      const response = await tutorService.fetchTutorSchedule(scheduleParams);
      if (response.status === 200) {
        setSchedule(response.data.scheduleOfTutor);
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (error: any) {
      console.log(error);
    }

    setLoading(false);
  };

  const fetchScheduleOnDateChange = async (date: moment.Moment) => {
    setSelectedDate(date);
    const period = dateTimeUtils.toPeriodTimeStamp(date);
    fetchSchedule(period);
  };

  const renderBookingInfo = () => {
    return (
      selectedDate.format('DD/MM/YYYY') +
      '  ' +
      dateTimeUtils.toLetTutorTimeString(+selectedSchedule?.startTimestamp) +
      ' - ' +
      dateTimeUtils.toLetTutorTimeString(+selectedSchedule?.endTimestamp)
    );
  };

  const bookSchedule = async () => {
    const scheduleParams = {
      scheduleDetailIds: [selectedSchedule.scheduleDetails[0]?.id],
      note: note,
    };

    console.log(scheduleParams);

    try {
      const response = await scheduleService.bookSchedule(scheduleParams);
      if (response.status === 200) {
        console.log(response.data);
        toggleConfirmModal();
        Alert.alert('Success', 'Booking success', [
          {
            text: 'OK',
            onPress: () => {
              navigate('Schedule');
            },
          },
        ]);
      } else {
        toggleConfirmModal();
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const period = dateTimeUtils.toPeriodTimeStampOfDay(moment());
    console.log(period);

    fetchSchedule(period);
  }, []);

  const renderSchedule = () => {
    const scheduleSorted = schedule.sort((s: any, sNext: any) => {
      return s.startTimestamp - sNext.startTimestamp;
    });

    return scheduleSorted.map((s: any, index: number) => {
      return (
        <React.Fragment key={index}>
          <Flex>
            <RadioButton value={s} disabled={s.isBooked} />
            <Text
              style={{
                color: s.isBooked ? color.darkGrey : color.primaryColor,
              }}>
              {dateTimeUtils.toLetTutorTimeString(s.startTimestamp)} -{' '}
              {dateTimeUtils.toLetTutorTimeString(s.endTimestamp)}
            </Text>
          </Flex>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {loading && <Loading />}
      <View style={styles.container}>
        {/* booking modal start */}
        <View>
          <Modal isVisible={isConfirmModalVisible}>
            <Flex style={style.modal} direction="column" align="start">
              <Text style={{margin: 5, ...style.modalTitle}}>
                Confirm booking
              </Text>

              <WhiteSpace size="lg" />

              <Text
                style={{
                  marginLeft: 5,
                  ...style.textBoldPrimary,
                }}>
                {renderBookingInfo()}
              </Text>

              <WhiteSpace />

              <Text
                style={{
                  marginLeft: 5,
                  marginTop: 5,
                }}>
                Balance: 9970 lessons left
              </Text>

              <WhiteSpace />

              <Text
                style={{
                  marginLeft: 5,
                  marginTop: 5,
                }}>
                Price: 1 lesson
              </Text>

              <WhiteSpace size="xl" />

              <Flex align="center">
                <Icon
                  name="report"
                  size={25}
                  type="material-icons"
                  color={color.primaryColor}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}>
                  Notes
                </Text>
              </Flex>

              <WhiteSpace size="lg" />

              <Input
                value={note}
                onChangeText={(text: string) => {
                  setNote(text);
                }}
                cursorColor={color.primaryColor}
                multiline={true}
                style={style.textArea}
              />

              <WhiteSpace size="lg" />

              <Flex justify="between" style={{width: '100%', marginLeft: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    toggleConfirmModal();
                  }}>
                  <Text style={style.textBold}>Cancel</Text>
                </TouchableOpacity>
                <Button
                  style={style.primaryButtonNoWidth}
                  onPress={bookSchedule}>
                  Confirm
                </Button>
              </Flex>
            </Flex>
          </Modal>
        </View>
        {/* booking modal end */}

        <Text style={styles.pageTitle}>{tutorName}'s schedule</Text>

        <CalendarStrip
          calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: 'white',
          }}
          style={{height: 100, paddingTop: 20, paddingBottom: 10}}
          calendarHeaderStyle={{color: 'white'}}
          calendarColor={color.primaryColor}
          dateNumberStyle={{color: 'white'}}
          disabledDateOpacity={0}
          dateNameStyle={{color: 'white'}}
          highlightDateNumberStyle={{color: 'yellow'}}
          highlightDateNameStyle={{color: 'yellow'}}
          disabledDateNameStyle={{color: 'grey'}}
          disabledDateNumberStyle={{color: 'grey'}}
          iconContainer={{flex: 0.1}}
          selectedDate={selectedDate}
          onDateSelected={date => {
            fetchScheduleOnDateChange(date);
          }}
          minDate={moment()}
          datesBlacklist={[
            {
              start: moment().subtract(8, 'days'),
              end: moment().subtract(1, 'days'),
            },
          ]}
        />

        <WhiteSpace size="lg" />
        {!loading && schedule.length > 0 && (
          <View style={style.container}>
            <RadioButton.Group
              onValueChange={(value: any) => {
                setSelectedSchedule(value);
              }}
              value={selectedSchedule}>
              <ScrollView style={{height: 250, width: '100%'}}>
                {renderSchedule()}
              </ScrollView>
            </RadioButton.Group>

            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />

            <Button style={styles.button} onPress={toggleConfirmModal}>
              Book class
            </Button>
          </View>
        )}

        {schedule.length === 0 && (
          <Image
            source={require('assets/nodata.png')}
            style={{
              marginTop: 20,
              width: '100%',
              height: '30%',
            }}
          />
        )}
      </View>
    </>
  );
};

export default BookingPickerScreen;

const styles = StyleSheet.create({
  container: {flex: 1, height: '100%', backgroundColor: 'white'},
  pageTitle: {
    margin: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    marginLeft: -1,
    backgroundColor: color.primaryColor,
    borderRadius: 50,
    alignSelf: 'flex-end',
  },
});
