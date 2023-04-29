import {Flex, WhiteSpace} from '@ant-design/react-native';
import Header, {HeaderProps} from 'components/Header';
import ScheduleCard from 'components/ScheduleCard';
import {ScheduleCardProps} from 'components/ScheduleCard/index';
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
import {color, style} from 'style';

const UpcomingScreen = ({navigation: {navigate}}: any) => {
  const myStyle = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height: '100%',
      padding: 30,
      paddingTop: 15,
    },
  });

  const headerProps: HeaderProps = {
    title: 'Schedule',
    onTouch: () => {
      navigate('Settings');
    },
  };

  const scheduleProps: ScheduleCardProps = {
    teacher: 'Abby',
    time: '10:00 - 11:00',
    date: 'Monday, October 5',
    notes: 'This is a note',
    onEdit: () => {
      toggleEditModal();
    },
    onCancel: () => {},
    onJoin: () => {
      navigate('Meeting');
    },
  };

  const image = require('assets/calendar.png');

  const [isEditModalVisible, setEditModalVisible] = React.useState(false);

  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  return (
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
          Here is a list of the sessions you have booked. You can track when the
          meeting starts.
        </Text>
      </Flex>

      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />

      <ScrollView style={style.wh100}>
        <ScheduleCard
          teacher={scheduleProps.teacher}
          time={scheduleProps.time}
          date={scheduleProps.date}
          notes={scheduleProps.notes}
          onEdit={scheduleProps.onEdit}
          onCancel={scheduleProps.onCancel}
          onJoin={scheduleProps.onJoin}
        />
        <WhiteSpace size="lg" />

        <ScheduleCard
          teacher={scheduleProps.teacher}
          time={scheduleProps.time}
          date={scheduleProps.date}
          notes={scheduleProps.notes}
          onEdit={scheduleProps.onEdit}
          onCancel={scheduleProps.onCancel}
          onJoin={scheduleProps.onJoin}
        />

        <WhiteSpace size="lg" />

        <ScheduleCard
          teacher={scheduleProps.teacher}
          time={scheduleProps.time}
          date={scheduleProps.date}
          notes={scheduleProps.notes}
          onEdit={scheduleProps.onEdit}
          onCancel={scheduleProps.onCancel}
          onJoin={scheduleProps.onJoin}
        />

        <WhiteSpace size="lg" />

        <WhiteSpace size="lg" />
      </ScrollView>
    </Flex>
  );
};

export default UpcomingScreen;
