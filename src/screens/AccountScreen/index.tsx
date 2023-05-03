import {Flex, WhiteSpace} from '@ant-design/react-native';
import FieldChip from 'components/FieldChip';
import {Button, Input} from 'galio-framework';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Icon, Image} from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';

import {useContext} from 'react';
import {ApplicationContext} from 'context/ApplicationContext';

import {color, style} from 'style';
import userService from 'services/userService';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

const AccountScreen = () => {
  const [open, setOpen] = useState(false);

  const {account, setAccount, learnTopics, testPreps} =
    useContext(ApplicationContext);

  const [levels, setLevels] = useState([
    {label: 'Pre A1 - Beginner', value: 'BEGINNER'},
    {label: 'A1 - Higher Beginner', value: 'HIGHER_BEGINNER'},
    {label: 'A2 - Pre Intermediate', value: 'PRE_INTERMEDIATE'},
    {label: 'B1 - Intermediate', value: 'INTERMEDIATE'},
    {label: 'B2 - Upper Intermediate', value: 'UPPER_INTERMEDIATE'},
    {label: 'C1 - Advanced', value: 'ADVANCED'},
    {label: 'C2 - Proficiency', value: 'PROFICIENCY'},
  ]);

  const [name, setName] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [userLevel, setUserLevel] = useState<any>();
  const [userLearnTopics, setUserLearnTopics] = useState<string[]>([]);
  const [userTestPreps, setUserTestPreps] = useState<string[]>([]);
  const [isRefresh, setIsRefresh] = useState(true);

  const isFocused = useIsFocused();

  const fetchUserInfo = async () => {
    try {
      const response = await userService.fetchUserInfo();

      if (response.status === 200) {
        const userInfo = response.data.user;
        setName(userInfo?.name);
        setBirthday(userInfo?.birthday);
        setPhone(userInfo?.phone);
        setEmail(userInfo?.email);
        setUserLevel(userInfo?.level);

        let learnTopicsArr: string[] = [];

        userInfo?.learnTopics?.forEach((topic: any) => {
          learnTopicsArr = [...learnTopicsArr, topic.id];
        });

        setUserLearnTopics(learnTopicsArr);

        let testPrepsArr: string[] = [];

        userInfo?.testPreparations?.forEach((preps: any) => {
          testPrepsArr = [...testPrepsArr, preps.id];
        });

        setUserTestPreps(testPrepsArr);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isFocused && isRefresh) {
      setIsRefresh(false);
      fetchUserInfo();
    }
  }, [isFocused, isRefresh]);

  const formatBirthday = (): string => {
    return moment(birthday).format('DD/MM/YYYY');
  };

  const onSelectLearnTopic = (isSelected: boolean, id: string) => {
    if (isSelected) {
      const newLearnTopics = userLearnTopics.filter(topic => topic !== id);
      setUserLearnTopics(newLearnTopics);
    } else {
      setUserLearnTopics([...userLearnTopics, id]);
    }
  };

  const onSelectTestPrep = (isSelected: boolean, id: string) => {
    if (isSelected) {
      const newTestPreps = userTestPreps.filter(prep => prep !== id);
      setUserTestPreps(newTestPreps);
    } else {
      setUserTestPreps([...userTestPreps, id]);
    }
  };

  const renderLearnTopics = () => {
    return learnTopics.map((topic: any, index: number) => {
      const isSelected = userLearnTopics.includes(topic.id);
      return (
        <React.Fragment key={index}>
          <View style={{margin: 5, marginLeft: 0}}>
            <FieldChip
              onSelected={() => onSelectLearnTopic(isSelected, topic.id)}
              value={topic.id}
              label={topic.name}
              color={isSelected ? color.primaryColor : color.darkGrey}
            />
          </View>
        </React.Fragment>
      );
    });
  };

  const renderTestPreps = () => {
    return testPreps.map((prep: any, index: number) => {
      const isSelected = userTestPreps.includes(prep.id);
      return (
        <React.Fragment key={index}>
          <View style={{margin: 5, marginLeft: 0}}>
            <FieldChip
              onSelected={() => onSelectTestPrep(isSelected, prep.id)}
              value={prep.id}
              label={prep.name}
              color={isSelected ? color.primaryColor : color.darkGrey}
            />
          </View>
        </React.Fragment>
      );
    });
  };

  const updateProfile = async () => {
    if (!name || !birthday || !phone || !userLevel) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const user = {
      name,
      birthday: moment(birthday).format('YYYY-MM-DD'),
      phone,
      level: userLevel,
      learnTopics: userLearnTopics,
      testPreparations: userTestPreps,
    };

    try {
      const response = await userService.updateProfile(user);

      if (response.status === 200) {
        Alert.alert('Success', 'Your profile has been updated', [
          {
            text: 'OK',
            onPress: () => {
              setAccount(response.data.user);
              setIsRefresh(true);
            },
          },
        ]);
      } else {
        ToastAndroid.show(
          'Something went wrong. Please try again later',
          ToastAndroid.SHORT,
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={myStyle.container} nestedScrollEnabled={true}>
      <Text style={style.pageTitle}>Profile</Text>

      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />

      <Flex direction="column" align="center">
        <TouchableOpacity>
          <Image
            source={{
              uri: account?.avatar,
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
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

        <Text style={myStyle.name}>{account.name}</Text>
        <Text style={myStyle.email}>{email}</Text>
      </Flex>

      <WhiteSpace size="xl" />

      <Text style={myStyle.field}>Name</Text>
      <Input
        value={name}
        onChangeText={(text: string) => setName(text)}
        color={'#444'}
        placeholder="Enter your name"
        placeholderTextColor={color.grey}
        style={{borderColor: color.grey}}
        cursorColor={color.primaryColor}
      />

      <WhiteSpace />

      <Text style={myStyle.field}>Phone</Text>
      <Input
        bgColor={color.lightGrey}
        editable={false}
        value={phone}
        style={{borderColor: color.grey}}
      />

      <WhiteSpace />

      <Text style={myStyle.field}>Birthday</Text>

      <WhiteSpace />

      <Input
        value={formatBirthday()}
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
        date={birthday ? new Date(birthday) : new Date()}
        onConfirm={inDate => {
          setOpen(false);
          setBirthday(inDate.toString());
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <WhiteSpace />

      <Text style={myStyle.field}>Level</Text>

      <WhiteSpace />

      <SelectDropdown
        data={levels}
        onSelect={(selectedItem, index) => {
          setUserLevel(selectedItem.value);
        }}
        defaultButtonText={
          userLevel
            ? levels.filter(item => item.value === userLevel)[0]?.label
            : 'Select your English level'
        }
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

      <WhiteSpace size="lg" />

      <Text style={myStyle.field}>Learn topics</Text>

      <WhiteSpace />

      <Flex direction="row" wrap="wrap">
        {renderLearnTopics()}
      </Flex>

      <WhiteSpace size="lg" />

      <Text style={myStyle.field}>Test preparations</Text>

      <WhiteSpace />

      <Flex direction="row" wrap="wrap">
        {renderTestPreps()}
      </Flex>

      <WhiteSpace size="xl" />

      <Button round style={myStyle.button} onPress={updateProfile}>
        Save
      </Button>
    </ScrollView>
  );
};

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

export default AccountScreen;
