import {Flex, WhiteSpace} from '@ant-design/react-native';
import FieldChip from 'components/FieldChip';
import {Button, Input} from 'galio-framework';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import {color, style} from 'style';

const BecomeTutorScreen = () => {
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

    button: {
      backgroundColor: color.primaryColor,
      width: '95%',
      marginBottom: 40,
    },
  });

  const [countries, setCountries] = useState([
    {label: 'Vietnam', value: 'vie'},
    {label: 'England', value: 'eng'},
  ]);

  const [langs, setLangs] = useState([
    {label: 'Vietnamese', value: 'viel'},
    {label: 'English', value: 'engl'},
  ]);

  return (
    <ScrollView style={myStyle.container} nestedScrollEnabled={true}>
      <Text style={style.pageTitle}>Become a Tutor</Text>

      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />

      <Flex direction="column" align="center">
        <Image
          source={{
            uri: 'https://oiir.illinois.edu/sites/prod/files/Profile%20Picture_1.png',
          }}
          style={{
            width: 80,
            height: 80,
          }}
        />

        <WhiteSpace size="lg" />

        <Text style={myStyle.name}>John Doe</Text>
        <Text style={myStyle.email}>john.doe@gmail.com</Text>
      </Flex>

      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />

      <Text style={myStyle.field}>Nationality</Text>

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
        buttonStyle={style.dropdown2BtnStyle}
        buttonTextStyle={style.dropdown2BtnTxtStyle}
        dropdownIconPosition={'right'}
        dropdownStyle={style.dropdown2DropdownStyle}
        rowStyle={style.dropdown2RowStyle}
        rowTextStyle={style.dropdown2RowTxtStyle}
      />

      <WhiteSpace />
      <WhiteSpace />

      <Text style={myStyle.field}>Language</Text>

      <WhiteSpace />
      <SelectDropdown
        data={langs}
        onSelect={(selectedItem, index) => {
          // Alert.alert(selectedItem.value);
        }}
        defaultButtonText={'Select language'}
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
        buttonStyle={style.dropdown2BtnStyle}
        buttonTextStyle={style.dropdown2BtnTxtStyle}
        dropdownIconPosition={'right'}
        dropdownStyle={style.dropdown2DropdownStyle}
        rowStyle={style.dropdown2RowStyle}
        rowTextStyle={style.dropdown2RowTxtStyle}
      />

      <WhiteSpace />
      <WhiteSpace />

      <Text style={myStyle.field}>Specialities</Text>

      <WhiteSpace />

      <ScrollView horizontal={true}>
        <FieldChip label="IELTS" color={color.darkGrey} />
        <Text style={{marginRight: 5}} />
        <FieldChip label="TOEIC" color={color.darkGrey} />
        <Text style={{marginRight: 5}} />
        <FieldChip label="English for Kids" color={color.darkGrey} />
        <Text style={{marginRight: 5}} />
        <FieldChip label="Business English" color={color.darkGrey} />
        <Text style={{marginRight: 5}} />
        <FieldChip label="Communication English" color={color.darkGrey} />
      </ScrollView>

      <WhiteSpace />
      <WhiteSpace />

      <Text style={myStyle.field}>Education</Text>
      <Input
        color={'#444'}
        placeholderTextColor={color.grey}
        style={{borderColor: color.grey}}
        cursorColor={color.primaryColor}
      />

      <WhiteSpace />
      <WhiteSpace />

      <Text style={myStyle.field}>Experience</Text>
      <Input
        color={'#444'}
        placeholderTextColor={color.grey}
        style={{borderColor: color.grey}}
        cursorColor={color.primaryColor}
      />

      <WhiteSpace />
      <WhiteSpace />

      <Text style={myStyle.field}>Interest</Text>
      <Input
        color={'#444'}
        placeholderTextColor={color.grey}
        style={{borderColor: color.grey}}
        cursorColor={color.primaryColor}
      />

      <WhiteSpace />
      <WhiteSpace />

      <Text style={myStyle.field}>Link to your CV</Text>
      <Input
        color={'#444'}
        placeholder="https://"
        placeholderTextColor={color.grey}
        style={{borderColor: color.grey}}
        cursorColor={color.primaryColor}
      />

      <WhiteSpace />

      <Button round style={myStyle.button}>
        Submit
      </Button>
    </ScrollView>
  );
};

export default BecomeTutorScreen;
