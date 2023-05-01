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
import scheduleService from 'services/scheduleService';
import tutorService from 'services/tutorService';
import dateTimeUtils from 'utils/dateTimeUtils';

export default function HomeScreen({navigation: {navigate}}: any): JSX.Element {
  const headerProps: HeaderProps = {
    title: 'Home',
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
    console.log('HomeScreen fetchTutorList');

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
    try {
      const response = await scheduleService.getUpcomingLessons({
        dateTime: dateTimeUtils.getCurrentTimeStamp(),
      });

      if (response.status === 200) {
        const upcoming = response.data?.data[0];
        const startTime = upcoming?.scheduleDetailInfo?.startPeriodTimestamp;
        const current = dateTimeUtils.getCurrentTimeStamp();
        const diff = startTime - current;
        if (diff <= 0) {
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

  useEffect(() => {
    getUpcomingLesson();
    getTotalStudyTime();
    getTutors();
  }, [isFocused]);

  useEffect(() => {
    if (timerCount <= 0) {
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
    const date = scheduleDetailInfo?.scheduleInfo?.date;

    const start = dateTimeUtils.toLetTutorTimeString(startTime);
    const end = dateTimeUtils.toLetTutorTimeString(endTime);
    const dateFormat = moment(date).format('DD MMM');

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
              {upcomingLesson ? 'Upcoming lesson' : 'No upcoming lesson'}
            </Text>
            <WhiteSpace />
            {upcomingLesson ? (
              <>
                <Text style={myStyle.welcomeBadgeCourseTime}>
                  {renderUpcomingLesson()}
                </Text>
                <WhiteSpace />
                <Text style={myStyle.welcomeBadgeCountdown}>
                  {renderTimer()} left
                </Text>
                <WhiteSpace />
                <Button
                  style={myStyle.welcomeBadgeButton}
                  onPress={() => navigate('Meeting')}>
                  <Text style={myStyle.welcomeBadgeButtonText}>
                    Join lesson
                  </Text>
                </Button>
              </>
            ) : null}

            <WhiteSpace />
            <Text style={myStyle.welcomeBadgeText}>
              Your total lesson time: {renderTotalStudyTime()}
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
              Recommended Tutors
            </Text>

            <TouchableOpacity onPress={() => navigate('Tutor')}>
              <Flex align="center">
                <Text
                  style={{
                    color: color.primaryColor,
                  }}>
                  See all
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
