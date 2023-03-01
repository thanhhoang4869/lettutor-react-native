import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import {color, style} from 'style';
import {WhiteSpace, Flex} from '@ant-design/react-native';
import {Button, Input} from 'galio-framework';
import {RadioButton} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';

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

const BookingPickerScreen = ({navigation: {navigate}}: any) => {
  const [value, setValue] = React.useState('first');

  const [isConfirmModalVisible, setConfirmModalVisible] = React.useState(false);
  const toggleConfirmModal = () => {
    setConfirmModalVisible(!isConfirmModalVisible);
  };

  return (
    <View style={styles.container}>
      {/* rp modal start */}
      <View>
        <Modal isVisible={isConfirmModalVisible}>
          <Flex style={style.modal} direction="column" align="start">
            <Text style={{margin: 5, ...style.modalTitle}}>
              Confirm booking
            </Text>

            <WhiteSpace size="lg" />

            <Text
              style={{
                fontWeight: 'bold',
                marginLeft: 5,
              }}>
              Your booking is at: 22/02/2023 - 18:30
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
                Note for this booking
              </Text>
            </Flex>

            <WhiteSpace size="lg" />

            <Input cursorColor={color.primaryColor} style={style.textArea} />

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
                onPress={toggleConfirmModal}>
                Confirm
              </Button>
            </Flex>
          </Flex>
        </Modal>
      </View>
      {/* rp modal end */}

      <Text style={styles.pageTitle}>Booking time</Text>

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
        dateNameStyle={{color: 'white'}}
        highlightDateNumberStyle={{color: 'yellow'}}
        highlightDateNameStyle={{color: 'yellow'}}
        disabledDateNameStyle={{color: 'grey'}}
        disabledDateNumberStyle={{color: 'grey'}}
        iconContainer={{flex: 0.1}}
      />

      <WhiteSpace size="lg" />

      <View style={style.container}>
        <RadioButton.Group
          onValueChange={newValue => setValue(newValue)}
          value={value}>
          <ScrollView style={{height: 200, width: '100%'}}>
            <Flex>
              <RadioButton value="first" />
              <Text>16:30 - 18:00</Text>
            </Flex>
            <Flex>
              <RadioButton value="second" />
              <Text>16:30 - 18:00</Text>
            </Flex>
            <Flex>
              <RadioButton value="third" />
              <Text>16:30 - 18:00</Text>
            </Flex>
            <Flex>
              <RadioButton value="vie" />
              <Text>16:30 - 18:00</Text>
            </Flex>
          </ScrollView>
        </RadioButton.Group>

        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />

        <Button style={styles.button} onPress={toggleConfirmModal}>
          Book class
        </Button>
      </View>
    </View>
  );
};

export default BookingPickerScreen;
