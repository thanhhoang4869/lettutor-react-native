/* eslint-disable react-hooks/exhaustive-deps */
import {Flex, WhiteSpace} from '@ant-design/react-native';
import FieldChip from 'components/FieldChip';
import ReviewCard from 'components/ReviewCard';
import {Button, Input} from 'galio-framework';
import React, {useContext, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import Modal from 'react-native-modal';
import {AirbnbRating} from 'react-native-ratings';
import VideoPlayer from 'react-native-video-player';
import {color, style} from 'style';
import {useRoute} from '@react-navigation/native';
import tutorService from 'services/tutorService';
import {Alert} from 'react-native';
import Loading from 'components/Loading';
import {AccountContext} from 'context/AccountContext';

interface TutorProfileRouteParams {
  tutorId: string;
}

const TutorProfileScreen = ({navigation: {navigate}}: any) => {
  const route = useRoute();
  const params = route.params as TutorProfileRouteParams;
  const tutorId = params?.tutorId;

  const {specialties} = useContext(AccountContext);

  const [isReportModalVisible, setReportModalVisible] = React.useState(false);
  const toggleReportModal = () => {
    setReportModalVisible(!isReportModalVisible);
  };

  const [isReviewModalVisible, setReviewModalVisible] = React.useState(false);
  const toggleReviewModal = () => {
    setReviewModalVisible(!isReviewModalVisible);
  };

  const [tutor, setTutor] = React.useState<any>({});
  const [courses, setCourses] = React.useState<any[]>([]);

  const [loading, setLoading] = React.useState(false);

  const fetchTutor = async () => {
    console.log(tutorId);
    setLoading(true);
    try {
      const tutorResponse = await tutorService.fetchTutorById(tutorId);
      if (tutorResponse.status === 200) {
        const tutorInfo = tutorResponse.data;
        setTutor(tutorInfo);
        setCourses(tutorInfo.User.courses);
      } else {
        setLoading(false);
        Alert.alert(tutorResponse.data.message);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const renderSpecialties = () => {
    const tutorSpecialties = tutor?.specialties;

    const specialtiesArrTmp: string[] = tutorSpecialties.split(',');

    const specialtiesArr = specialtiesArrTmp.map((specialty: string) => {
      const specialtyObj: any = specialties.find(
        (obj: any) => obj.key === specialty,
      );
      return specialtyObj || specialty;
    });

    return specialtiesArr.map((speciality: any, index: number) => {
      return (
        <React.Fragment key={index}>
          <View style={{margin: 5, marginLeft: 0}}>
            <FieldChip
              value={speciality.key || speciality}
              label={speciality.name || speciality}
              color={color.primaryColor}
            />
          </View>
        </React.Fragment>
      );
    });
  };

  const renderCourse = () => {
    if (courses?.length > 0) {
      return courses.map(course => (
        <Flex justify="between" style={style.w100} key={course.id}>
          <Text style={style.textBold}>{course.name}</Text>
          <Text style={style.textPrimary}>View</Text>
        </Flex>
      ));
    }
    return <Text>No courses</Text>;
  };

  useEffect(() => {
    fetchTutor();
  }, [tutorId]);

  return (
    <>
      {loading && <Loading />}
      {!loading && tutor && tutor.User && (
        <>
          {/* rp modal start */}
          <View>
            <Modal isVisible={isReportModalVisible}>
              <Flex style={style.modal} direction="column" align="start">
                <Text style={{margin: 5, ...style.modalTitle}}>
                  Report this tutor
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
                    Tell us what's wrong
                  </Text>
                </Flex>

                <WhiteSpace size="lg" />

                <Input
                  multiline={true}
                  cursorColor={color.primaryColor}
                  style={style.textArea}
                />

                <WhiteSpace size="lg" />

                <Flex justify="between" style={{width: '100%', marginLeft: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleReportModal();
                    }}>
                    <Text style={style.textBold}>Cancel</Text>
                  </TouchableOpacity>
                  <Button
                    style={style.primaryButtonNoWidth}
                    onPress={toggleReportModal}>
                    Submit
                  </Button>
                </Flex>
              </Flex>
            </Modal>
          </View>
          {/* rp modal end */}

          {/* review modal start */}
          <View>
            <Modal isVisible={isReviewModalVisible}>
              <Flex style={style.modal} direction="column" align="start">
                <Text style={style.modalTitle}>Reviews</Text>

                <WhiteSpace size="xl" />

                <ScrollView
                  style={{
                    height: 300,
                    width: '100%',
                  }}>
                  <ReviewCard />
                  <ReviewCard />

                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                </ScrollView>

                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />

                <Flex
                  justify="end"
                  style={{
                    width: '100%',
                    marginLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleReviewModal();
                    }}>
                    <Text style={style.textBold}>Back</Text>
                  </TouchableOpacity>
                </Flex>
              </Flex>
            </Modal>
          </View>
          {/* review modal end */}

          <ScrollView>
            <VideoPlayer
              video={{
                uri: tutor?.video,
              }}
              videoWidth={1600}
              videoHeight={900}
              thumbnail={{
                uri: 'https://app.lettutor.com/static/media/login.8d01124a.png',
              }}
            />

            <View style={style.container}>
              <Flex align="start">
                <Image
                  source={{
                    uri: tutor?.User?.avatar,
                  }}
                  style={{width: 70, height: 70, borderRadius: 50}}
                />
                <View style={{width: '75%', marginLeft: 20}}>
                  <Flex justify="between">
                    <Text style={myStyle.tutorName}>{tutor?.User?.name}</Text>
                    <AirbnbRating
                      count={tutor?.rating}
                      isDisabled={true}
                      defaultRating={5}
                      size={20}
                      showRating={false}
                    />
                  </Flex>

                  <Flex justify="between">
                    <Text style={style.textBold}>{tutor?.profession}</Text>
                    <TouchableOpacity>
                      <Icon
                        name={tutor?.isFavorite ? 'heart' : 'heart-outline'}
                        type="material-community"
                        color="red"
                      />
                    </TouchableOpacity>
                  </Flex>

                  <Text>{tutor?.User?.language}</Text>
                </View>
              </Flex>

              <WhiteSpace />

              <Button
                style={style.primaryButton}
                onPress={() => {
                  navigate('BookingPicker', {
                    tutorId: tutorId,
                    tutorName: tutor?.User?.name,
                  });
                }}>
                Book this tutor
              </Button>

              <WhiteSpace />

              <Flex justify="around">
                <TouchableOpacity>
                  <Flex direction="column" justify="center">
                    <Icon
                      name="message-text"
                      size={25}
                      type="material-community"
                      color={color.primaryColor}
                    />
                    <Text style={style.textBoldPrimary}>Message</Text>
                  </Flex>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    toggleReviewModal();
                  }}>
                  <Flex direction="column" justify="center">
                    <Icon
                      name="rate-review"
                      size={25}
                      type="material-icons"
                      color={color.primaryColor}
                    />
                    <Text style={style.textBoldPrimary}>Reviews</Text>
                  </Flex>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    toggleReportModal();
                  }}>
                  <Flex direction="column" justify="center">
                    <Icon
                      name="report"
                      size={25}
                      type="material-icons"
                      color={color.primaryColor}
                    />
                    <Text style={style.textBoldPrimary}>Report</Text>
                  </Flex>
                </TouchableOpacity>
              </Flex>

              <WhiteSpace size="lg" />

              <Text style={style.textBlack}>{tutor?.bio}</Text>

              <WhiteSpace size="lg" />

              <Text style={style.textBoldPrimary}>Experience</Text>
              <WhiteSpace />
              <Text>{tutor?.experience}</Text>
              <WhiteSpace size="lg" />

              <Text style={style.textBoldPrimary}>Languages</Text>
              <WhiteSpace />
              <Text>
                {tutor?.User?.language}, {tutor?.languages}
              </Text>

              <WhiteSpace size="lg" />

              <Text style={style.textBoldPrimary}>Specialties</Text>
              <WhiteSpace />
              <Flex direction="row" wrap="wrap">
                {tutor?.specialties && renderSpecialties()}
              </Flex>

              <WhiteSpace />

              <Text style={style.textBoldPrimary}>Education</Text>
              <WhiteSpace />
              <Text>{tutor?.education}</Text>
              <WhiteSpace size="lg" />

              <Text style={style.textBoldPrimary}>Suggested courses</Text>
              <WhiteSpace />
              <View>{renderCourse()}</View>
              <WhiteSpace size="lg" />
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default TutorProfileScreen;

const myStyle = StyleSheet.create({
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
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.27,
    shadowRadius: 3.65,
    elevation: 5,
    // borderRadius: 10,
  },
  tutorName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});
