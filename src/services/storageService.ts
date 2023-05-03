import AsyncStorage from '@react-native-async-storage/async-storage';

const storeString = async (keyname: string, value: string) => {
  try {
    await AsyncStorage.setItem(`@${keyname}`, value);
  } catch (e) {
    console.log(e);
  }
};

const storeObject = async (keyname: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${keyname}`, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getString = async (keyname: string) => {
  try {
    const value = await AsyncStorage.getItem(`@${keyname}`);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

const getObject = async (keyname: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${keyname}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const removeItem = async (keyname: string) => {
  try {
    await AsyncStorage.removeItem(`@${keyname}`);
  } catch (e) {
    console.log(e);
  }
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};

const storageService = {
  storeString,
  storeObject,
  getString,
  getObject,
  removeItem,
  clearAll,
};

export default storageService;
