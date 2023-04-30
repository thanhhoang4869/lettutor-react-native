/* eslint-disable react-hooks/exhaustive-deps */
import {Flex, WhiteSpace} from '@ant-design/react-native';
import React, {useEffect, useState} from 'react';
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
import Header, {HeaderProps} from 'components/Header';
import Loading from 'components/Loading';
import SearchBar, {SearchBarProps} from 'components/SearchBar';
import TutorCard from 'components/TutorCard';
import {Button} from 'galio-framework';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {DataTable, RadioButton} from 'react-native-paper';
import tutorService from 'services/tutorService';
import {useContext} from 'react';
import {AccountContext} from 'context/AccountContext';
import {useIsFocused} from '@react-navigation/native';

export default function TutorScreen({
  navigation: {navigate},
}: any): JSX.Element {
  const isFocused = useIsFocused();

  const {specialties} = useContext(AccountContext);

  const [selectedNationality, setSelectedNationality] = React.useState('');
  const [selectedSpec, setSelectedSpec] = React.useState('all');
  const [isFilterApplied, setIsFilterApplied] = React.useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const [tutors, setTutors] = React.useState([{}]);
  const [totalTutors, setTotalTutors] = React.useState(0);
  const [page, setPage] = React.useState(0);

  const [tutorName, setTutorName] = React.useState('');

  const numberOfItemsPerPage = 5;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getTutors = async () => {
    console.log('TutorScreen fetchTutorList');

    setIsLoading(true);

    const options = {
      page: page + 1,
      perPage: numberOfItemsPerPage,
      filters: constructFilter(),
      search: tutorName,
    };

    try {
      const response = await tutorService.fetchTutorList(options);

      if (response.status === 200) {
        setTotalTutors(response.data.count);
        setTutors(response.data.rows);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const getTutorsReset = async () => {
    setIsLoading(true);

    const options = {
      page: page + 1,
      perPage: numberOfItemsPerPage,
    };

    try {
      const response = await tutorService.fetchTutorList(options);

      if (response.status === 200) {
        setTotalTutors(response.data.count);
        setTutors(response.data.rows);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const getPagingLabel = () => {
    const from = page * numberOfItemsPerPage + 1;
    const to = Math.min((page + 1) * numberOfItemsPerPage, totalTutors);
    return `${from}-${to} of ${totalTutors}`;
  };

  const clearFilter = () => {
    setTutorName('');
    setSelectedNationality('');
    setSelectedSpec('all');
    setIsFilterApplied(false);
  };

  const applyFilter = () => {
    if (selectedSpec !== 'all' && selectedNationality !== '') {
      setIsFilterApplied(true);
    }

    getTutors();
  };

  const clearFilterAndApply = () => {
    clearFilter();
    getTutorsReset();
  };

  const constructFilter = () => {
    const filters: any = {};

    filters.nationality = {
      isNative: selectedSpec === 'eng',
      isVietnamese: selectedSpec === 'vie',
    };
    filters.specialties = [selectedSpec];

    if (selectedSpec === 'all') {
      delete filters.specialties;
    }

    if (selectedNationality === '') {
      delete filters.nationality;
    }

    return filters;
  };

  const searchBarProps: SearchBarProps = {
    placeHolder: 'Search for tutors',
    value: tutorName,
    onSearch: () => {
      getTutors();
    },
    onChangeText: (text: string) => {
      setTutorName(text);
    },
  };

  const headerProps: HeaderProps = {
    title: 'Tutors',
    onTouch: () => {
      navigate('Settings');
    },
  };

  useEffect(() => {
    getTutors();
  }, [isFocused, page]);

  const renderTutorCards = () => {
    return tutors.map((tutor: any, index: number) => {
      return (
        <React.Fragment key={index}>
          <TutorCard
            tutor={tutor}
            onTouch={() => navigate('TutorProfile', {tutorId: tutor.userId})}
          />
          <WhiteSpace size="lg" />
        </React.Fragment>
      );
    });
  };

  const renderSpecialties = () => {
    return specialties.map((specialty: any, index: number) => {
      return (
        <React.Fragment key={index}>
          <FieldChip
            value={specialty.key}
            label={specialty.name}
            onSelected={() => {
              setSelectedSpec(specialty.key);
            }}
            color={
              specialty.key === selectedSpec
                ? color.primaryColor
                : color.darkGrey
            }
          />
          <Text style={{marginRight: 5}} />
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      <View>
        <Modal isVisible={isModalVisible}>
          <Flex style={style.modal} direction="column" align="start">
            <Flex style={{width: '100%'}} justify="between" direction="row">
              <Text style={{margin: 5, ...style.modalTitle}}>
                Filter search tutor
              </Text>
              <TouchableOpacity onPress={toggleModal}>
                <Icon name="close" type="material-community" />
              </TouchableOpacity>
            </Flex>

            <WhiteSpace size="xl" />

            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Speciality
            </Text>

            <WhiteSpace size="lg" />

            <ScrollView horizontal={true}>
              <FieldChip
                value="all"
                label="All"
                color={
                  selectedSpec === 'all' ? color.primaryColor : color.darkGrey
                }
                onSelected={() => {
                  setSelectedSpec('all');
                }}
              />
              <Text style={{marginRight: 5}} />

              {renderSpecialties()}
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
              onValueChange={newValue => setSelectedNationality(newValue)}
              value={selectedNationality}>
              <Flex>
                <RadioButton value="for" />
                <Text>Foreigners</Text>
              </Flex>
              <Flex>
                <RadioButton value="eng" />
                <Text>English Native Speaker</Text>
              </Flex>
              <Flex>
                <RadioButton value="vie" />
                <Text>Vietnamese</Text>
              </Flex>
            </RadioButton.Group>

            <WhiteSpace />

            <Flex justify="between" style={{width: '100%'}}>
              <TouchableOpacity onPress={clearFilter}>
                <Text style={style.modalText}>Reset</Text>
              </TouchableOpacity>
              <Button
                style={style.primaryButtonNoWidth}
                onPress={() => {
                  toggleModal();
                  applyFilter();
                }}>
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
          <SearchBar
            value={searchBarProps.value}
            placeHolder={searchBarProps.placeHolder}
            onSearch={searchBarProps.onSearch}
            onChangeText={searchBarProps.onChangeText}
          />

          <TouchableOpacity onPress={toggleModal}>
            <Icon
              name={isFilterApplied ? 'filter-check' : 'filter'}
              type="material-community"
              color={color.primaryColor}
            />
          </TouchableOpacity>
        </Flex>

        <WhiteSpace size="lg" />

        <Flex
          style={{
            width: '100%',
          }}
          justify="between"
          direction="row">
          <Text style={myStyle.text}>Total: {totalTutors} tutors</Text>
          <TouchableOpacity onPress={clearFilterAndApply}>
            <Text style={style.modalText}>Reset</Text>
          </TouchableOpacity>
        </Flex>

        <WhiteSpace size="lg" />

        {tutors.length > 0 ? (
          <>
            <ScrollView
              style={{
                height: '80%',
                width: '100%',
              }}>
              {renderTutorCards()}

              <DataTable.Pagination
                style={{
                  justifyContent: 'flex-end',
                  marginRight: -12,
                }}
                page={page}
                numberOfPages={Math.ceil(totalTutors / numberOfItemsPerPage)}
                onPageChange={tarPage => setPage(tarPage)}
                label={getPagingLabel()}
                showFastPaginationControls
                numberOfItemsPerPage={numberOfItemsPerPage}
                selectPageDropdownLabel={'Rows per page'}
              />

              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />
            </ScrollView>
          </>
        ) : (
          <Image
            source={require('assets/nodata.png')}
            style={{
              marginTop: 20,
              width: '100%',
              height: '30%',
            }}
          />
        )}
      </Flex>
    </>
  );
}

const myStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
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
