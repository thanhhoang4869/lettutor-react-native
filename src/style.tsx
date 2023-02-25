import {StyleSheet} from 'react-native';

const primaryColor = '#1677ff';

export const color = {
  facebookColor: '#3b5998',
  googleColor: '#db3236',
  grey: '#d3d3d3',
  darkGrey: '#434343',
  lightGrey: '#f2f2f2',
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
  pl5: {
    paddingLeft: 20,
  },
  pl4: {
    paddingLeft: 15,
  },
  pl3: {
    paddingLeft: 10,
  },
  pl2: {
    paddingLeft: 5,
  },
  w100: {
    width: '100%',
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

  modal: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
  },

  modalText: {
    color: primaryColor,
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: color.primaryColor,
    color: 'black',
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
    borderRadius: 50,
  },

  primaryButtonNoWidth: {
    borderRadius: 50,
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
  pageTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  //loginPageEnd
});
