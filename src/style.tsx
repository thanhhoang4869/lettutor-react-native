import {StyleSheet} from 'react-native';

const primaryColor = '#1677ff';

export const color = {
  facebookColor: '#3b5998',
  googleColor: '#db3236',
};

export const style = StyleSheet.create({
  //global
  textBoldPrimary: {
    fontWeight: 'bold',
    color: primaryColor,
  },
  textPrimary: {
    color: primaryColor,
  },
  mr5: {
    marginRight: 20,
  },
  mr4: {
    marginRight: 15,
  },
  mr3: {
    marginRight: 10,
  },
  mr2: {
    marginRight: 5,
  },
  //globalEnd

  //loginPage
  imageStyle: {
    alignSelf: 'center',
    width: '70%',
    marginTop: -40,
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 30,
  },
  button: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
  //loginPageEnd
});
