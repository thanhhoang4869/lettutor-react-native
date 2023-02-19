import {NOT_INITIALIZED_ERROR} from '@react-navigation/core/lib/typescript/src/createNavigationContainerRef';
import {StyleSheet} from 'react-native';

const primaryColor = '#1677ff';

export const color = {
  facebookColor: '#3b5998',
  googleColor: '#db3236',
  grey: '#d3d3d3',
  primaryColor: primaryColor,
  white: 'white',
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
  ml5: {
    marginLeft: 20,
  },
  ml4: {
    marginLeft: 15,
  },
  ml3: {
    marginLeft: 10,
  },
  ml2: {
    marginLeft: 5,
  },
  //globalEnd

  //loginPage
  imageStyle: {
    alignSelf: 'center',
    width: '70%',
    marginTop: -40,
  },
  containerMul: {
    backgroundColor: 'white',
    height: '100%',
    paddingTop: 70,
    paddingHorizontal: 30,
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 30,
  },
  containerNoPaddingY: {
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: 30,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: primaryColor,
  },
  mulButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 70,
  },
  input: {
    width: '100%',
  },
  svgStyle: {
    width: 30,
    height: 30,
  },
  colorBlack: {
    color: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  //loginPageEnd
});
