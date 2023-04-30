/* eslint-disable react-hooks/exhaustive-deps */
import {Flex, WhiteSpace} from '@ant-design/react-native';
import Header, {HeaderProps} from 'components/Header';
import Loading from 'components/Loading';
import ScheduleCard, {ScheduleCardChildProps} from 'components/ScheduleCard';
import {Button, Input} from 'galio-framework';
import React, {useEffect} from 'react';
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
import userService, {FetchSchedulesParams} from 'services/userService';
import {color, style} from 'style';
import dateTimeUtils from 'utils/dateTimeUtils';
import {useIsFocused} from '@react-navigation/native';

const UpcomingScreen = ({navigation: {navigate}}: any) => {
  const image = require('assets/calendar.png');
  const isFocused = useIsFocused();

  const headerProps: HeaderProps = {
    title: 'Schedule',
    onTouch: () => {
      navigate('Settings');
    },
  };

  const [isEditModalVisible, setEditModalVisible] = React.useState(false);

  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const [schedules, setSchedules] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const params: FetchSchedulesParams = {
        page: 1,
        perPage: 10,
        dateTimeGte: dateTimeUtils.getCurrentTimeStamp(),
        sortBy: 'asc',
        orderBy: 'meeting',
      };

      const response = await userService.fetchSchedules(params);

      if (response.status === 200) {
        setSchedules(response.data.data);
      } else {
        setLoading(false);
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (e) {
      setLoading(false);

      Alert.alert('Error', 'Something went wrong');
    }

    setLoading(false);
  };

  const renderSchedule = () => {
    return schedules?.rows?.map((schedule: any, index: number) => {
      const scheduleInfo: ScheduleCardChildProps = {
        id: schedule.id,
        tutor: schedule.scheduleDetailInfo?.scheduleInfo?.tutorInfo || {},
        date: schedule.scheduleDetailInfo?.scheduleInfo?.date,
        startPeriodTimestamp: schedule.scheduleDetailInfo?.startPeriodTimestamp,
        endPeriodTimestamp: schedule.scheduleDetailInfo?.endPeriodTimestamp,
        meetingLink: schedule.studentMeetingLink,
        notes: schedule.studentRequest,
        onEdit: () => {
          toggleEditModal();
        },
        onCancel: () => {},
        onJoin: () => {},
      };

      return (
        <React.Fragment key={index}>
          <ScheduleCard props={scheduleInfo} />
          <WhiteSpace size="lg" />
        </React.Fragment>
      );
    });
  };

  useEffect(() => {
    fetchSchedule();
  }, [isFocused]);

  return (
    <>
      {loading && <Loading />}

      <Flex direction="column" align="start" style={myStyle.container}>
        {/* rp modal start */}
        <View>
          <Modal isVisible={isEditModalVisible}>
            <Flex style={style.modal} direction="column" align="start">
              <Text style={{margin: 5, ...style.modalTitle}}>Edit notes</Text>

              <WhiteSpace size="lg" />

              <Input
                cursorColor={color.primaryColor}
                multiline={true}
                style={style.textArea}
                value="This is a note"
              />

              <WhiteSpace size="lg" />

              <Flex justify="between" style={{width: '100%', marginLeft: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    toggleEditModal();
                  }}>
                  <Text style={style.textBold}>Cancel</Text>
                </TouchableOpacity>
                <Button
                  style={style.primaryButtonNoWidth}
                  onPress={() => {
                    toggleEditModal();
                  }}>
                  OK
                </Button>
              </Flex>
            </Flex>
          </Modal>
        </View>
        {/* rp modal end */}

        <Header title={headerProps.title} onTouch={headerProps.onTouch} />

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
            Here is a list of the sessions you have booked. You can track when
            the meeting starts.
          </Text>
        </Flex>

        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        {schedules?.rows?.length > 0 ? (
          <ScrollView style={style.wh100}>
            {renderSchedule()}

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
          </ScrollView>
        ) : (
          <Text>No upcoming schedule</Text>
        )}
      </Flex>
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

export default UpcomingScreen;
