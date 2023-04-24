import {Flex, WhiteSpace} from '@ant-design/react-native';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {color} from 'style';

import Header, {HeaderProps} from 'components/Header';
import Loading from 'components/Loading';
import TutorCard from 'components/TutorCard';
import {Button} from 'galio-framework';
import {Icon} from 'react-native-elements';
import tutorService from 'services/tutorService';

export default function HomeScreen({navigation: {navigate}}: any): JSX.Element {
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
    welcomeBadgeCourseName: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
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

  const headerProps: HeaderProps = {
    title: 'Home',
    onTouch: () => {
      navigate('Settings');
    },
  };

  const [isLoading, setIsLoading] = React.useState(false);

  const [tutors, setTutors] = React.useState([{}]);

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

  useEffect(() => {
    getTutors();
  }, []);

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

  return (
    <>
      {isLoading && <Loading />}

      <Flex direction="column" align="start" style={myStyle.container}>
        <Header title={headerProps.title} onTouch={headerProps.onTouch} />

        <WhiteSpace size="lg" />

        <Flex
          style={myStyle.welcomeBadge}
          direction="column"
          align="center"
          justify="center">
          <Text style={myStyle.welcomeBadgeText}>Upcoming Lesson</Text>
          <WhiteSpace />
          <Text style={myStyle.welcomeBadgeCourseName}>
            English for Business
          </Text>
          <WhiteSpace />
          <Text style={myStyle.welcomeBadgeText}>2023-02-24 at 18:30</Text>
          <WhiteSpace />
          <Button
            style={myStyle.welcomeBadgeButton}
            onPress={() => navigate('Meeting')}>
            <Text style={myStyle.welcomeBadgeButtonText}>Join lesson</Text>
          </Button>
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
    </>
  );
}
