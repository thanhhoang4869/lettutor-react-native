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
import {color, style} from 'style';
import dateTimeUtils from 'utils/dateTimeUtils';
import {useIsFocused} from '@react-navigation/native';
import scheduleService, {FetchSchedulesParams} from 'services/scheduleService';
import jitsiService from 'services/jitsiService';
import {useTranslation} from 'react-i18next';

const UpcomingScreen = ({navigation: {navigate}}: any) => {
  const image = require('assets/calendar.png');
  const isFocused = useIsFocused();

  const {t} = useTranslation();

  const headerProps: HeaderProps = {
    title: t('schedule_screen.title'),
    onTouch: () => {
      navigate('Settings');
    },
  };

  const [isEditModalVisible, setEditModalVisible] = React.useState(false);

  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const joinMeeting = async (params: any) => {
    await jitsiService.startJitsi(params);
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

      const response = await scheduleService.fetchSchedules(params);

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
        onJoin: joinMeeting,
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
              <Text style={{margin: 5, ...style.modalTitle}}>
                {t('schedule_screen.modal.edit_note')}
              </Text>

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
                  <Text style={style.textBold}>
                    {t('schedule_screen.modal.cancel')}
                  </Text>
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

          <Text style={style.textBold}>{t('schedule_screen.description')}</Text>
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
