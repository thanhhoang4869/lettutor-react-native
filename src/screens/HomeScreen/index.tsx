/* eslint-disable react-hooks/exhaustive-deps */
import {Flex, WhiteSpace} from '@ant-design/react-native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {color} from 'style';

import {useIsFocused} from '@react-navigation/native';
import Header, {HeaderProps} from 'components/Header';
import Loading from 'components/Loading';
import TutorCard from 'components/TutorCard';
import {Button} from 'galio-framework';
import moment from 'moment';
import {Icon} from 'react-native-elements';
import jwt_decode from 'jwt-decode';

import {useTranslation} from 'react-i18next';

import scheduleService from 'services/scheduleService';
import tutorService from 'services/tutorService';
import dateTimeUtils from 'utils/dateTimeUtils';
import jitsiService from 'services/jitsiService';
import userService from 'services/userService';

export default function HomeScreen({navigation: {navigate}}: any): JSX.Element {
  const {t, i18n} = useTranslation();

  const headerProps: HeaderProps = {
    title: t('home_screen.title'),
    onTouch: () => {
      navigate('Settings');
    },
  };

  const [isLoading, setIsLoading] = useState(false);
  const [tutors, setTutors] = useState([{}]);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [upcomingLesson, setUpcomingLesson] = useState<any>({});
  const [timerCount, setTimer] = useState(60);

  const isFocused = useIsFocused();

  const getTutors = async () => {
    setIsLoading(true);

    const options = {
      page: 1,
      perPage: 5,
    };

    try {
      const response = await tutorService.fetchTutorList(options);

      if (response.status === 200) {
        setTutors(response.data.rows);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const getTutorsNoLoading = async () => {
    const options = {
      page: 1,
      perPage: 5,
    };

    try {
      const response = await tutorService.fetchTutorList(options);

      if (response.status === 200) {
        setTutors(response.data.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalStudyTime = async () => {
    try {
      const response = await scheduleService.getTotalStudyTime();

      if (response.status === 200) {
        setTotalStudyTime(response.data.total);
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUpcomingLesson = async () => {
    console.log(dateTimeUtils.getCurrentTimeStamp());
    try {
      const response = await scheduleService.getUpcomingLessons({
        dateTime: dateTimeUtils.getCurrentTimeStamp(),
      });

      if (response.status === 200) {
        const upcomingList = response.data?.data;
        upcomingList.sort((a: any, b: any) => {
          return (
            a.scheduleDetailInfo.startPeriodTimestamp -
            b.scheduleDetailInfo.startPeriodTimestamp
          );
        });
        const upcoming = response.data?.data[0];
        const startTime = upcoming?.scheduleDetailInfo?.startPeriodTimestamp;
        const current = dateTimeUtils.getCurrentTimeStamp();
        const diff = startTime - current;

        if (diff === 0) {
          getUpcomingLesson();
          return;
        }
        setTimer(diff / 1000);
        setUpcomingLesson(upcoming);
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const startJitsi = async () => {
    const studentMeetingLink = upcomingLesson?.studentMeetingLink;
    const token = studentMeetingLink.split('=')[1];
    const jitsiParams = jwt_decode(token) as any;

    await jitsiService.startJitsi(jitsiParams);
  };

  const manageFavorite = async (tutorId: string) => {
    try {
      const response = await userService.manageFavoriteTutor({tutorId});
      if (response.status === 200) {
        getTutorsNoLoading();
      } else {
        Alert.alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getUpcomingLesson();
      getTotalStudyTime();
      getTutors();
    }
  }, [isFocused]);

  useEffect(() => {
    if (timerCount === 0) {
      getUpcomingLesson();
    }
  }, [timerCount]);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [upcomingLesson]);

  const renderTimer = () => {
    const day = Math.floor(timerCount / 86400);
    const hour = Math.floor((timerCount % 86400) / 3600);
    const minute = Math.floor(((timerCount % 86400) % 3600) / 60);
    const second = Math.floor(((timerCount % 86400) % 3600) % 60);

    return `${day}d ${hour}h ${minute}m ${second}s`;
  };

  const renderTotalStudyTime = () => {
    const hours = Math.floor(totalStudyTime / 60);
    const minutes = totalStudyTime % 60;

    return `${hours}h ${minutes}m`;
  };

  const renderTutorCards = () => {
    return tutors.map((tutor: any, index: number) => {
      return (
        <React.Fragment key={index}>
          <TutorCard
            tutor={tutor}
            onManageFavorite={manageFavorite}
            onTouch={() => navigate('TutorProfile', {tutorId: tutor.userId})}
          />
          <WhiteSpace size="lg" />
        </React.Fragment>
      );
    });
  };

  const renderUpcomingLesson = () => {
    const scheduleDetailInfo = upcomingLesson?.scheduleDetailInfo;
    const startTime = scheduleDetailInfo?.startPeriodTimestamp;
    const endTime = scheduleDetailInfo?.endPeriodTimestamp;

    const start = dateTimeUtils.toLetTutorTimeString(startTime);
    const end = dateTimeUtils.toLetTutorTimeString(endTime);

    const getDate = dateTimeUtils.timeStampToDateString(startTime);
    const dateFormat = moment(getDate).format('DD-MM');

    return `${dateFormat} at ${start} - ${end}`;
  };

  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && tutors?.length > 0 && (
        <Flex direction="column" align="start" style={myStyle.container}>
          <Header title={headerProps.title} onTouch={headerProps.onTouch} />

          <WhiteSpace size="lg" />

          <Flex
            style={myStyle.welcomeBadge}
            direction="column"
            align="center"
            justify="center">
            <Text style={myStyle.welcomeBadgeText}>
              {upcomingLesson
                ? t('home_screen.banner.upcoming_lesson')
                : t('home_screen.banner.no_upcoming_lesson')}
            </Text>
            <WhiteSpace />
            {upcomingLesson ? (
              <>
                <Text style={myStyle.welcomeBadgeCourseTime}>
                  {renderUpcomingLesson()}
                </Text>
                <WhiteSpace />
                <Text style={myStyle.welcomeBadgeCountdown}>
                  {renderTimer()}
                </Text>
                <WhiteSpace />
                <Button style={myStyle.welcomeBadgeButton} onPress={startJitsi}>
                  <Text style={myStyle.welcomeBadgeButtonText}>
                    {t('home_screen.banner.join_lesson')}
                  </Text>
                </Button>
              </>
            ) : null}

            <WhiteSpace />
            <Text style={myStyle.welcomeBadgeText}>
              {t('home_screen.banner.total_study_time')}:{' '}
              {renderTotalStudyTime()}
            </Text>
          </Flex>

          <WhiteSpace size="lg" />

          <Flex direction="row" justify="between" style={{width: '100%'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {t('home_screen.recommended_tutors')}
            </Text>

            <TouchableOpacity onPress={() => navigate('Tutor')}>
              <Flex align="center">
                <Text
                  style={{
                    color: color.primaryColor,
                  }}>
                  {t('home_screen.see_all')}
                </Text>

                <Icon
                  name="arrow-right"
                  type="antd"
                  color={color.primaryColor}
                  style={{marginLeft: -5, marginRight: -5}}
                />
              </Flex>
            </TouchableOpacity>
          </Flex>

          <WhiteSpace size="lg" />

          <ScrollView style={myStyle.scrollView}>
            {renderTutorCards()}

            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
          </ScrollView>
        </Flex>
      )}
    </>
  );
}

const myStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    paddingTop: 15,
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
  welcomeBadge: {
    backgroundColor: color.primaryColor,
    width: '160%',
    height: '30%',
    marginLeft: -100,
    marginRight: -100,
  },
  welcomeBadgeText: {
    color: 'white',
  },
  welcomeBadgeHeader: {
    color: 'white',
    fontSize: 18,
  },
  welcomeBadgeCourseTime: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  welcomeBadgeCountdown: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 16,
  },
  welcomeBadgeButton: {
    backgroundColor: 'white',
    color: color.primaryColor,
    borderRadius: 50,
  },
  welcomeBadgeButtonText: {
    color: color.primaryColor,
    fontWeight: '500',
  },
  scrollView: {
    width: '100%',
    height: '60%',
  },
});
