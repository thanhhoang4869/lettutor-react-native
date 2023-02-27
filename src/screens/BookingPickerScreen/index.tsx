import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import {color, style} from 'style';
import {WhiteSpace, Flex} from '@ant-design/react-native';
import {Button} from 'galio-framework';
import {RadioButton} from 'react-native-paper';

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

  return (
    <View style={styles.container}>
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

        <Button style={styles.button} onPress={() => navigate('BookingDetail')}>
          Next
        </Button>
      </View>
    </View>
  );
};

export default BookingPickerScreen;
