/* eslint-disable react-hooks/exhaustive-deps */
import {Flex, WhiteSpace} from '@ant-design/react-native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color, style} from 'style';

import {useIsFocused} from '@react-navigation/native';
import CourseCard, {CourseCardChildProps} from 'components/CourseCard';
import FieldChip from 'components/FieldChip';
import Header, {HeaderProps} from 'components/Header';
import SearchBar, {SearchBarProps} from 'components/SearchBar';
import {Button} from 'galio-framework';
import {Icon, Image} from 'react-native-elements';
import Modal from 'react-native-modal';
import {DataTable} from 'react-native-paper';
import courseService from 'services/courseService';
import Loading from 'components/Loading';
import {useTranslation} from 'react-i18next';

export default function CourseScreen({
  navigation: {navigate},
}: any): JSX.Element {
  const {t} = useTranslation();

  const searchBarProps: SearchBarProps = {
    placeHolder: t('course_screen.placeholder'),
    value: '',
    onSearch: function (): void {
      fetchCourses();
    },
    onChangeText: function (text: string): void {
      setCourseName(text);
    },
  };

  const headerProps: HeaderProps = {
    title: t('course_screen.title'),
    onTouch: () => {
      navigate('Settings');
    },
  };

  const isFocused = useIsFocused();

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isLoading, setIsLoading] = React.useState(false);

  const [courses, setCourses] = React.useState<any>([]);
  const [totalCourses, setTotalCourses] = React.useState(0);
  const [page, setPage] = React.useState(0);

  const [courseName, setCourseName] = React.useState('');
  const [categories, setCategories] = React.useState<any>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [selectedLevel, setSelectedLevel] = React.useState<string>('');

  const numberOfItemsPerPage = 5;

  const getPagingLabel = () => {
    const from = page * numberOfItemsPerPage + 1;
    const to = Math.min((page + 1) * numberOfItemsPerPage, totalCourses);
    return `${from}-${to} ${t('course_screen.of')} ${totalCourses}`;
  };

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const pagingOptions: any = {
        page: page + 1,
        size: numberOfItemsPerPage,
        q: courseName,
      };
      if (selectedCategory) {
        pagingOptions['categoryId[]'] = selectedCategory;
      }
      if (selectedLevel) {
        pagingOptions['level[]'] = selectedLevel;
      }
      const response = await courseService.fetchCourses(pagingOptions);
      if (response.status === 200) {
        setCourses(response.data?.data?.rows);
        setTotalCourses(response.data?.data?.count);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCoursesReset = async () => {
    setIsLoading(true);
    try {
      const pagingOptions = {
        page: page + 1,
        size: numberOfItemsPerPage,
      };
      const response = await courseService.fetchCourses(pagingOptions);
      if (response.status === 200) {
        setCourses(response.data?.data?.rows);
        setTotalCourses(response.data?.data?.count);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourseCategories = async () => {
    try {
      const response = await courseService.fetchCourseCategories();
      if (response.status === 200) {
        setCategories(response.data?.rows);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearFilter = () => {
    setSelectedCategory('');
    setCourseName('');
    setSelectedLevel('');
    setSelectedCategory('');
  };

  const clearFilterAndApply = () => {
    clearFilter();
    fetchCoursesReset();
  };

  useEffect(() => {
    if (isFocused) {
      fetchCourses();
    }
  }, [isFocused, page]);

  useEffect(() => {
    fetchCourseCategories();
  }, []);

  const renderCourses = () => {
    return courses.map((course: any, index: any) => {
      const courseProps: CourseCardChildProps = {
        id: course.id,
        name: course.name,
        imageUrl: course.imageUrl,
        description: course.description,
        topicNumber: course.topics.length,
        level: course.level,
        onTouch: () => {
          navigate('CourseDetail', {course});
        },
      };
      return (
        <React.Fragment key={index}>
          <CourseCard props={courseProps} />
          <WhiteSpace size="lg" />
        </React.Fragment>
      );
    });
  };

  const renderCategories = () => {
    return categories.map((category: any, index: any) => {
      const isSelected = selectedCategory === category.id;
      return (
        <React.Fragment key={index}>
          <FieldChip
            value={category.id}
            label={category.title}
            color={isSelected ? color.primaryColor : color.darkGrey}
            onSelected={() => {
              setSelectedCategory(category.id);
            }}
          />
          <Text style={{marginRight: 5}} />
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <View>
        <Modal isVisible={isModalVisible}>
          <Flex style={style.modal} direction="column" align="start">
            <Flex style={{width: '100%'}} justify="between" direction="row">
              <Text style={{margin: 5, ...style.modalTitle}}>
                {t('course_screen.filter.title')}
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
              {t('course_screen.filter.category')}
            </Text>

            <WhiteSpace size="lg" />

            <ScrollView horizontal={true}>{renderCategories()}</ScrollView>

            <WhiteSpace size="xl" />

            <Text
              style={{
                fontWeight: 'bold',
              }}>
              {t('course_screen.filter.level')}
            </Text>

            <WhiteSpace />

            <ScrollView horizontal={true}>
              <FieldChip
                label="Beginner"
                value="1"
                onSelected={() => {
                  setSelectedLevel('1');
                }}
                color={
                  selectedLevel === '1' ? color.primaryColor : color.darkGrey
                }
              />
              <Text style={{marginRight: 5}} />
              <FieldChip
                label="Upper-Beginner"
                value="2"
                onSelected={() => {
                  setSelectedLevel('2');
                }}
                color={
                  selectedLevel === '2' ? color.primaryColor : color.darkGrey
                }
              />
              <Text style={{marginRight: 5}} />
              <FieldChip
                label="Pre-Intermediate"
                value="3"
                onSelected={() => {
                  setSelectedLevel('3');
                }}
                color={
                  selectedLevel === '3' ? color.primaryColor : color.darkGrey
                }
              />
              <Text style={{marginRight: 5}} />
              <FieldChip
                label="Intermediate"
                value="4"
                onSelected={() => {
                  setSelectedLevel('4');
                }}
                color={
                  selectedLevel === '4' ? color.primaryColor : color.darkGrey
                }
              />
              <Text style={{marginRight: 5}} />
              <FieldChip
                label="Upper-Intermediate"
                value="5"
                onSelected={() => {
                  setSelectedLevel('5');
                }}
                color={
                  selectedLevel === '5' ? color.primaryColor : color.darkGrey
                }
              />
              <Text style={{marginRight: 5}} />
              <FieldChip
                label="Pre-Advanced"
                value="6"
                onSelected={() => {
                  setSelectedLevel('6');
                }}
                color={
                  selectedLevel === '6' ? color.primaryColor : color.darkGrey
                }
              />
              <Text style={{marginRight: 5}} />
              <FieldChip
                label="Advanced"
                value="7"
                onSelected={() => {
                  setSelectedLevel('7');
                }}
                color={
                  selectedLevel === '7' ? color.primaryColor : color.darkGrey
                }
              />
              <Text style={{marginRight: 5}} />
              <FieldChip
                label="Very Advanced"
                value="8"
                onSelected={() => {
                  setSelectedLevel('8');
                }}
                color={
                  selectedLevel === '8' ? color.primaryColor : color.darkGrey
                }
              />
              <Text style={{marginRight: 5}} />
            </ScrollView>

            <WhiteSpace size="xl" />

            <Flex justify="between" style={{width: '100%'}}>
              <TouchableOpacity
                onPress={() => {
                  clearFilter();
                }}>
                <Text style={style.modalText}>
                  {t('course_screen.filter.reset')}
                </Text>
              </TouchableOpacity>
              <Button
                style={style.primaryButtonNoWidth}
                onPress={() => {
                  toggleModal();
                  fetchCourses();
                }}>
                {t('course_screen.filter.apply')}
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
            placeHolder={searchBarProps.placeHolder}
            value={courseName}
            onSearch={searchBarProps.onSearch}
            onChangeText={searchBarProps.onChangeText}
          />

          <TouchableOpacity onPress={toggleModal}>
            <Icon
              name="filter"
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
          <Text style={myStyle.text}>
            {t('course_screen.total')}: {totalCourses}{' '}
            {t('course_screen.course')}
          </Text>
          <TouchableOpacity onPress={clearFilterAndApply}>
            <Text style={style.modalText}>{t('course_screen.reset')}</Text>
          </TouchableOpacity>
        </Flex>

        <WhiteSpace size="lg" />

        {isLoading && <Loading />}

        {!isLoading && courses.length > 0 ? (
          <ScrollView style={myStyle.scrollView}>
            {renderCourses()}

            <DataTable.Pagination
              style={{
                justifyContent: 'flex-end',
                marginRight: -12,
              }}
              page={page}
              numberOfPages={Math.ceil(totalCourses / numberOfItemsPerPage)}
              onPageChange={tarPage => setPage(tarPage)}
              label={getPagingLabel()}
              showFastPaginationControls
              numberOfItemsPerPage={numberOfItemsPerPage}
              selectPageDropdownLabel={'Rows per page'}
            />

            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
          </ScrollView>
        ) : (
          <Image
            source={require('assets/nodata.png')}
            style={{
              marginTop: 20,
              width: 350,
              height: 300,
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

  scrollView: {
    height: '80%',
    width: '100%',
  },
});
