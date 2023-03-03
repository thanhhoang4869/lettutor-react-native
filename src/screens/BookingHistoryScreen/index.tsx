import {Flex, WhiteSpace} from '@ant-design/react-native';
import HistoryCard from 'components/HistoryCard';
import {HistoryCardProps} from 'components/HistoryCard';
import {Button, Input} from 'galio-framework';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import Modal from 'react-native-modal';
import {AirbnbRating} from 'react-native-ratings';
import {color, style} from 'style';

const BookingHistoryScreen = ({navigation: {navigate}}: any) => {
  const myStyle = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height: '100%',
      padding: 30,
      paddingTop: 15,
    },
  });

  const scheduleProps: HistoryCardProps = {
    teacher: 'Abby',
    time: '10:00 - 11:00',
    date: 'Monday, October 5',
    notes: 'This is a note',
    onEdit: () => {
      toggleReviewModal();
    },
    onCancel: () => {},
  };

  const image = require('assets/history.png');

  const [isReviewModalVisible, setReviewModalVisible] = React.useState(false);

  const toggleReviewModal = () => {
    setReviewModalVisible(!isReviewModalVisible);
  };

  return (
    <Flex direction="column" align="start" style={myStyle.container}>
      {/* review modal start */}
      <View>
        <Modal isVisible={isReviewModalVisible}>
          <Flex style={style.modal} direction="column" align="start">
            <Text style={{margin: 5, ...style.modalTitle}}>
              Review this lesson
            </Text>

            <WhiteSpace size="lg" />

            <Flex
              justify="center"
              style={{
                width: '100%',
              }}>
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

      <Text style={style.pageTitle}>Booking History</Text>

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
          Here is a list of previous lessons. You can view feedbacks from your
          tutors and write reviews.
        </Text>
      </Flex>

      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />

      <ScrollView
        style={{
          height: '80%',
          width: '100%',
        }}>
        <HistoryCard
          teacher={scheduleProps.teacher}
          time={scheduleProps.time}
          date={scheduleProps.date}
          notes={scheduleProps.notes}
          onEdit={scheduleProps.onEdit}
          onCancel={scheduleProps.onCancel}
        />
        <WhiteSpace size="lg" />

        <HistoryCard
          teacher={scheduleProps.teacher}
          time={scheduleProps.time}
          date={scheduleProps.date}
          notes={scheduleProps.notes}
          onEdit={scheduleProps.onEdit}
          onCancel={scheduleProps.onCancel}
        />

        <WhiteSpace size="lg" />

        <HistoryCard
          teacher={scheduleProps.teacher}
          time={scheduleProps.time}
          date={scheduleProps.date}
          notes={scheduleProps.notes}
          onEdit={scheduleProps.onEdit}
          onCancel={scheduleProps.onCancel}
        />

        <WhiteSpace size="lg" />

        <WhiteSpace size="lg" />
      </ScrollView>
    </Flex>
  );
};

export default BookingHistoryScreen;
