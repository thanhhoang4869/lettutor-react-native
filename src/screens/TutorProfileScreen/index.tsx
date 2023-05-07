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
import {Divider, Icon, Image} from 'react-native-elements';
import Modal from 'react-native-modal';
import {AirbnbRating} from 'react-native-ratings';
import VideoPlayer from 'react-native-video-player';
import {color, style} from 'style';
import {useRoute} from '@react-navigation/native';
import tutorService from 'services/tutorService';
import {Alert} from 'react-native';
import Loading from 'components/Loading';
import {ApplicationContext} from 'context/ApplicationContext';
import userService from 'services/userService';
import {useTranslation} from 'react-i18next';

interface TutorProfileRouteParams {
  tutorId: string;
}

const TutorProfileScreen = ({navigation: {navigate}}: any) => {
  const {t} = useTranslation();

  const route = useRoute();
  const params = route.params as TutorProfileRouteParams;
  const tutorId = params?.tutorId;

  const {specialties} = useContext(ApplicationContext);

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
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [reportContent, setReportContent] = React.useState('');
  const [reviews, setReviews] = React.useState<any>([]);
  const [reviewLoading, setReviewLoading] = React.useState(false);

  const fetchTutor = async () => {
    setLoading(true);
    try {
      const tutorResponse = await tutorService.fetchTutorById(tutorId);
      if (tutorResponse.status === 200) {
        const tutorInfo = tutorResponse.data;
        setTutor(tutorInfo);
        setIsFavorite(tutorInfo?.isFavorite);
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

    return specialtiesArr.map((specialty: any, index: number) => {
      return (
        <React.Fragment key={index}>
          <View style={{margin: 5, marginLeft: 0}}>
            <FieldChip
              value={specialty.key || specialty}
              label={specialty.name || specialty.englishName || specialty}
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
          <TouchableOpacity
            onPress={() => {
              navigate('CourseDetail', {courseId: course.id});
            }}>
            <Text style={style.textPrimary}>View</Text>
          </TouchableOpacity>
        </Flex>
      ));
    }
    return <Text>No courses</Text>;
  };

  const manageFavorite = async () => {
    try {
      const response = await userService.manageFavoriteTutor({tutorId});
      if (response.status === 200) {
        setIsFavorite(!isFavorite);
      } else {
        Alert.alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const reportTutor = async () => {
    try {
      const option = {
        tutorId,
        content: reportContent,
      };
      const response = await tutorService.reportTutor(option);
      if (response.status === 200) {
        toggleReportModal();
        Alert.alert('Reported successfully');
      } else {
        Alert.alert('Something went wrong. Please try again later.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderReviews = () => {
    const total = reviews?.count;
    const reviewsArr = reviews?.rows;

    if (total > 0) {
      return reviewsArr.map((review: any, index: any) => (
        <View
          key={index}
          style={{
            marginTop: 10,
            marginBottom: 10,
          }}>
          <ReviewCard
            name={review.firstInfo.name}
            rating={review.rating}
            content={review.content}
          />

          {index === 20 - 1 ? null : <Divider />}
        </View>
      ));
    } else {
      return (
        <Image
          source={require('assets/nodata.png')}
          style={{
            marginTop: 20,
            width: '100%',
            height: 250,
          }}
        />
      );
    }
  };

  const fetchReviews = async () => {
    try {
      const reviewParams = {
        tutorId,
        page: 1,
        perPage: 20,
      };

      const response = await tutorService.getReviewByTutorId(reviewParams);
      if (response.status === 200) {
        setReviews(response.data.data);
      } else {
        Alert.alert("Can't get reviews");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTutor();
    fetchReviews();
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
                  {t('tutor_detail_screen.report_modal.title')}
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
                    {t('tutor_detail_screen.report_modal.description')}
                  </Text>
                </Flex>

                <WhiteSpace size="lg" />

                <Input
                  value={reportContent}
                  onChangeText={text => setReportContent(text)}
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
                    <Text style={style.textBold}>
                      {t('tutor_detail_screen.report_modal.cancel')}
                    </Text>
                  </TouchableOpacity>
                  <Button
                    style={style.primaryButtonNoWidth}
                    onPress={reportTutor}>
                    {t('tutor_detail_screen.report_modal.submit')}
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
                <Flex justify="between" style={style.w100}>
                  <Text style={style.modalTitle}>
                    {t('tutor_detail_screen.review_modal.title')}
                  </Text>
                  <Text style={style.textBold}>
                    {t('tutor_detail_screen.review_modal.total')}:{' '}
                    {reviews?.count}
                  </Text>
                </Flex>

                <WhiteSpace size="xl" />

                <ScrollView
                  style={{
                    width: '100%',
                    height: 300,
                  }}>
                  {renderReviews()}
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
                    <Text style={style.textBold}>
                      {t('tutor_detail_screen.review_modal.back')}
                    </Text>
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

                    {tutor?.rating > 0 ? (
                      <Flex direction="row">
                        <Text
                          style={{
                            ...style.textBold,
                            marginRight: 5,
                          }}>
                          {tutor?.rating?.toFixed(2)}
                        </Text>
                        <Icon
                          name="star"
                          type="material-community"
                          color="gold"
                          size={25}
                        />
                      </Flex>
                    ) : (
                      <Text>No ratings</Text>
                    )}
                  </Flex>

                  <Flex justify="between">
                    <Text style={style.textBold}>{tutor?.profession}</Text>
                    <TouchableOpacity onPress={manageFavorite}>
                      <Icon
                        name={isFavorite ? 'heart' : 'heart-outline'}
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
                {t('tutor_detail_screen.book_tutor')}
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
                    <Text style={style.textBoldPrimary}>
                      {t('tutor_detail_screen.message')}
                    </Text>
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
                    <Text style={style.textBoldPrimary}>
                      {t('tutor_detail_screen.review')}
                    </Text>
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
                    <Text style={style.textBoldPrimary}>
                      {t('tutor_detail_screen.report')}
                    </Text>
                  </Flex>
                </TouchableOpacity>
              </Flex>

              <WhiteSpace size="lg" />

              <Text style={style.textBlack}>{tutor?.bio}</Text>

              <WhiteSpace size="lg" />

              <Text style={style.textBoldPrimary}>
                {t('tutor_detail_screen.experience')}
              </Text>
              <WhiteSpace />
              <Text>{tutor?.experience}</Text>
              <WhiteSpace size="lg" />

              {/* <Text style={style.textBoldPrimary}>Languages</Text>
              <WhiteSpace />
              <Text>{tutor?.languages}</Text>

              <WhiteSpace size="lg" /> */}

              <Text style={style.textBoldPrimary}>
                {t('tutor_detail_screen.specialties')}
              </Text>
              <WhiteSpace />
              <Flex direction="row" wrap="wrap">
                {tutor?.specialties && renderSpecialties()}
              </Flex>

              <WhiteSpace />

              <Text style={style.textBoldPrimary}>
                {t('tutor_detail_screen.education')}
              </Text>
              <WhiteSpace />
              <Text>{tutor?.education}</Text>
              <WhiteSpace size="lg" />

              <Text style={style.textBoldPrimary}>
                {t('tutor_detail_screen.courses')}
              </Text>
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
