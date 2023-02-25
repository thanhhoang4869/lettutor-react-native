import {Flex, WhiteSpace} from '@ant-design/react-native';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color, style} from 'style';

import FieldChip from 'components/FieldChip';
import Header, {HeaderProps} from 'components/Header';
import SearchBar, {SearchBarProps} from 'components/SearchBar';
import TutorCard from 'components/TutorCard';
import {Button} from 'galio-framework';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {DataTable, RadioButton} from 'react-native-paper';

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

    text: {
      fontSize: 16,
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

  const [value, setValue] = React.useState('eng');

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const items = [
    {
      key: 1,
      name: 'Page 1',
    },
    {
      key: 2,
      name: 'Page 2',
    },
    {
      key: 3,
      name: 'Page 3',
    },
    {
      key: 4,
      name: 'Page 4',
    },
    {
      key: 5,
      name: 'Page 5',
    },
  ];
  const [page, setPage] = React.useState(0);
  const numberOfItemsPerPage = 3;
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

  return (
    <>
      <View>
        <Modal isVisible={isModalVisible}>
          <Flex style={style.modal} direction="column" align="start">
            <Text style={{margin: 5, ...style.modalTitle}}>
              Filter search tutor
            </Text>

            <WhiteSpace size="xl" />

            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Speciality
            </Text>

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

            <WhiteSpace size="lg" />

            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Nationality
            </Text>

            <WhiteSpace />

            <RadioButton.Group
              onValueChange={newValue => setValue(newValue)}
              value={value}>
              <Flex>
                <RadioButton value="eng" />
                <Text>English</Text>
              </Flex>
              <Flex>
                <RadioButton value="vie" />
                <Text>Vietnamese</Text>
              </Flex>
            </RadioButton.Group>

            <WhiteSpace />

            <Flex justify="between" style={{width: '100%'}}>
              <TouchableOpacity
                onPress={() => {
                  toggleModal();
                }}>
                <Text style={style.modalText}>Reset</Text>
              </TouchableOpacity>
              <Button style={style.primaryButtonNoWidth} onPress={toggleModal}>
                Apply
              </Button>
            </Flex>
          </Flex>
        </Modal>
      </View>

      <Flex direction="column" align="start" style={myStyle.container}>
        <Header title={headerProps.title} onTouch={headerProps.onTouch} />

        <WhiteSpace />

        <Flex align="center" style={{width: '100%'}} justify="between">
          <SearchBar placeHolder={searchBarProps.placeHolder} />

          <TouchableOpacity onPress={toggleModal}>
            <Icon
              name="filter"
              //filter-check
              type="material-community"
              color={color.primaryColor}
            />
          </TouchableOpacity>
        </Flex>

        <WhiteSpace />
        <WhiteSpace />

        <Text style={myStyle.text}>Total: 5 results</Text>

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

          <DataTable.Pagination
            style={{
              justifyContent: 'flex-end',
              marginRight: -12,
            }}
            page={page}
            numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
            onPageChange={tarPage => setPage(tarPage)}
            label={`${from + 1}-${to} of ${items.length}`}
            showFastPaginationControls
            numberOfItemsPerPage={numberOfItemsPerPage}
            selectPageDropdownLabel={'Rows per page'}
          />

          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
        </ScrollView>
      </Flex>
    </>
  );
}
