// import React from 'react';
// import {ImageBackground, StyleSheet, View} from 'react-native';

// import {color} from 'style';

// const MeetingScreen = () => {
//   return (
//     <View style={myStyle.container}>
//       <ImageBackground
//         style={{
//           height: '100%',
//         }}
//         source={require('assets/jitsi.png')}
//         resizeMode="cover"
//       />
//     </View>
//   );
// };

// const myStyle = StyleSheet.create({
//   gptChat: {
//     color: color.primaryColor,
//     fontWeight: 'bold',
//   },
//   myChat: {
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   container: {
//     height: '100%',
//     width: '100%',
//   },
//   fab: {
//     marginRight: 16,
//     marginBottom: 100,
//     shadowColor: 'white',
//     shadowOffset: {
//       width: 8,
//       height: 8,
//     },
//     shadowOpacity: 0.8,
//     shadowRadius: 5.32,

//     elevation: 8,
//   },
// });

// export default MeetingScreen;
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
// @ts-ignore
import JitsiMeet, {JitsiMeetView} from '@vidit-me/react-native-jitsi-meet';
import {TouchableOpacity} from 'react-native-gesture-handler';

const conferenceOptions = {
  room: '3a859efb-7003-4d92-8e95-af0fd110f0ea-4d54d3d7-d2a9-42e5-97a2-5ed38af5789a',
  userInfo: {
    displayName: 'Thanhhoang4869+1',
    email: 'thanhhoang4869+1@gmail.com',
    avatar:
      'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
  },
  featureFlags: {
    'live-streaming.enabled': false,
  },
};

const MeetingScreen = () => {
  const [showJitsiView, setShowJitsiView] = useState(false);
  const startJitsiAsNativeController = async () => {
    await JitsiMeet.launchJitsiMeetView(conferenceOptions);
  };

  useEffect(() => {
    startJitsiAsNativeController();
  });

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  button: {
    width: '70%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#343a40',
  },
  buttonText: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  jitsiMeetView: {
    flex: 1,
  },
});

export default MeetingScreen;
