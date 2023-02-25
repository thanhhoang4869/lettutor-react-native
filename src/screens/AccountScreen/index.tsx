import {Flex, WhiteSpace} from '@ant-design/react-native';
import {Button, Input} from 'galio-framework';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Icon, Image} from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import {color, style} from 'style';
import FieldChip from 'components/FieldChip';

const AccountScreen = () => {
  const myStyle = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
      padding: 30,
      paddingTop: 15,
    },

    icon: {
      backgroundColor: color.lightGrey,
      position: 'absolute',
      borderRadius: 50,
      right: 0,
      bottom: 0,
    },

    field: {
      fontWeight: 'bold',
      color: '#444',
    },

    name: {
      fontSize: 16,
      color: 'grey',
      fontWeight: 'bold',
    },

    email: {
      color: 'grey',
      fontWeight: 'bold',
    },

    dropdown2BtnStyle: {
      flex: 1,
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      width: '100%',
      borderWidth: 1,
      borderColor: color.grey,
    },
    dropdown2BtnTxtStyle: {
      color: '#444',
      textAlign: 'left',
      fontSize: 14,
      marginLeft: 16,
    },
    dropdown2DropdownStyle: {backgroundColor: color.grey},
    dropdown2RowStyle: {
      backgroundColor: '#EFEFEF',
      borderBottomColor: '#C5C5C5',
    },
    dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},

    button: {
      backgroundColor: color.primaryColor,
      width: '95%',
      marginBottom: 40,
    },
  });

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [countries, setCountries] = useState([
    {label: 'Vietnam', value: 'vie'},
    {label: 'England', value: 'eng'},
  ]);

  const [levels, setLevels] = useState([
    {label: 'B1', value: 'b1'},
    {label: 'B2', value: 'b2'},
  ]);

  return (
    <ScrollView style={myStyle.container} nestedScrollEnabled={true}>
      <Text style={style.pageTitle}>Profile</Text>

      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />

      <Flex direction="column" align="center">
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://oiir.illinois.edu/sites/prod/files/Profile%20Picture_1.png',
            }}
            style={{
              width: 80,
              height: 80,
            }}
          />
          <Icon
            name="camera"
            containerStyle={myStyle.icon}
            size={20}
            color={color.darkGrey}
          />
        </TouchableOpacity>

        <WhiteSpace size="lg" />

        <Text style={myStyle.name}>John Doe</Text>
        <Text style={myStyle.email}>john.doe@gmail.com</Text>
      </Flex>

      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />

      <Text style={myStyle.field}>Birthday</Text>

      <WhiteSpace />

      <Input
        value={
          date.getDate().toString() +
          '/' +
          date.getMonth().toString() +
          '/' +
          date.getFullYear().toString()
        }
        style={{borderColor: color.grey}}
        placeholderTextColor={color.grey}
        cursorColor={color.primaryColor}
        color={'#444'}
        onTouchStart={() => setOpen(true)}
      />

      <DatePicker
        modal
        mode="date"
        maximumDate={new Date()}
        open={open}
        date={date}
        onConfirm={inDate => {
          setOpen(false);
          setDate(inDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <WhiteSpace />

      <Text style={myStyle.field}>Phone number</Text>
      <Input
        color={'#444'}
        placeholder="Phone number"
        placeholderTextColor={color.grey}
        style={{borderColor: color.grey}}
        cursorColor={color.primaryColor}
      />

      <WhiteSpace />

      <Text style={myStyle.field}>Country</Text>

      <WhiteSpace />
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          // Alert.alert(selectedItem.value);
        }}
        defaultButtonText={'Select country'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.label;
        }}
        rowTextForSelection={(item, index) => {
          return item.label;
        }}
        renderDropdownIcon={isOpened => {
          return (
            <Icon
              type="font-awesome-5"
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color={color.grey}
              size={14}
              style={{marginRight: 10}}
            />
          );
        }}
        buttonStyle={myStyle.dropdown2BtnStyle}
        buttonTextStyle={myStyle.dropdown2BtnTxtStyle}
        dropdownIconPosition={'right'}
        dropdownStyle={myStyle.dropdown2DropdownStyle}
        rowStyle={myStyle.dropdown2RowStyle}
        rowTextStyle={myStyle.dropdown2RowTxtStyle}
      />

      <WhiteSpace />
      <WhiteSpace />

      <Text style={myStyle.field}>Level</Text>

      <WhiteSpace />
      <SelectDropdown
        data={levels}
        onSelect={(selectedItem, index) => {
          // Alert.alert(selectedItem.value);
        }}
        defaultButtonText={'Select level'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.label;
        }}
        rowTextForSelection={(item, index) => {
          return item.label;
        }}
        renderDropdownIcon={isOpened => {
          return (
            <Icon
              type="font-awesome-5"
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color={color.grey}
              size={14}
              style={{marginRight: 10}}
            />
          );
        }}
        buttonStyle={myStyle.dropdown2BtnStyle}
        buttonTextStyle={myStyle.dropdown2BtnTxtStyle}
        dropdownIconPosition={'right'}
        dropdownStyle={myStyle.dropdown2DropdownStyle}
        rowStyle={myStyle.dropdown2RowStyle}
        rowTextStyle={myStyle.dropdown2RowTxtStyle}
      />

      <WhiteSpace />
      <WhiteSpace />

      <Text style={myStyle.field}>Subject</Text>

      <WhiteSpace />

      <ScrollView horizontal={true}>
        <FieldChip label="English for Kids" color={color.darkGrey} />
        <Text style={{marginRight: 5}} />
        <FieldChip label="Business English" color={color.darkGrey} />
        <Text style={{marginRight: 5}} />
        <FieldChip label="Communication English" color={color.darkGrey} />
      </ScrollView>

      <WhiteSpace />
      <WhiteSpace />

      <Text style={myStyle.field}>Test preparation</Text>

      <WhiteSpace />

      <ScrollView horizontal={true}>
        <FieldChip label="IELTS" color={color.darkGrey} />
        <Text style={{marginRight: 5}} />
        <FieldChip label="TOEIC" color={color.darkGrey} />
        <Text style={{marginRight: 5}} />
        <FieldChip label="STARTER" color={color.darkGrey} />
        <Text style={{marginRight: 5}} />
        <FieldChip label="MOVER" color={color.darkGrey} />
      </ScrollView>

      <WhiteSpace />
      <WhiteSpace />

      <Button round style={myStyle.button}>
        Save
      </Button>
    </ScrollView>
  );
};

export default AccountScreen;
