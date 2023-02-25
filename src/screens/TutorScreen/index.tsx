import {Flex, WhiteSpace} from '@ant-design/react-native';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color, style} from 'style';

import FieldChip from 'components/FieldChip';
import SearchBar, {SearchBarProps} from 'components/SearchBar';
import TutorCard from 'components/TutorCard';
import {Icon} from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import {Button} from 'galio-framework';
import Modal from 'react-native-modal';
import Header, {HeaderProps} from 'components/Header';

export default function TutorScreen({
  navigation: {navigate},
}: any): JSX.Element {
  const myStyle = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      paddingTop: 15,
      paddingLeft: 30,
      paddingRight: 30,
      paddingBottom: 30,
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
  });

  const searchBarProps: SearchBarProps = {
    placeHolder: 'Search for tutors',
  };

  const headerProps: HeaderProps = {
    title: 'Tutors',
    onTouch: () => {
      navigate('Settings');
    },
  };

  const [countries, setCountries] = useState([
    {label: 'Vietnam', value: 'vie'},
    {label: 'England', value: 'eng'},
  ]);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Flex direction="column" align="start" style={myStyle.container}>
      <Header title={headerProps.title} onTouch={headerProps.onTouch} />

      <WhiteSpace />

      <SearchBar placeHolder={searchBarProps.placeHolder} />

      {/* 
      <Flex direction="column" style={{height: '20%', width: '100%'}}>
        <SearchBar placeHolder={searchBarProps.placeHolder} />

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

        <WhiteSpace size="lg" />

        <ScrollView horizontal={true}>
          <FieldChip label="All" color={color.primaryColor} />
          <Text style={{marginRight: 5}} />
          <FieldChip label="English for Kids" color={color.darkGrey} />
          <Text style={{marginRight: 5}} />
          <FieldChip label="Business English" color={color.darkGrey} />
          <Text style={{marginRight: 5}} />
          <FieldChip label="Communication" color={color.darkGrey} />
        </ScrollView>
      </Flex> */}

      <WhiteSpace />
      <WhiteSpace />

      <ScrollView
        style={{
          height: '80%',
          width: '100%',
        }}>
        <TutorCard />
        <WhiteSpace size="lg" />

        <TutorCard />
        <WhiteSpace size="lg" />

        <TutorCard />
        <WhiteSpace size="lg" />

        <TutorCard />
        <WhiteSpace size="lg" />

        <TutorCard />
        <WhiteSpace size="lg" />

        <TutorCard />
        <WhiteSpace size="lg" />

        <TutorCard />

        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
      </ScrollView>
    </Flex>
  );
}
