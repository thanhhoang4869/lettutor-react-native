import JitsiMeet from '@vidit-me/react-native-jitsi-meet';

const startJitsi = async (params: any) => {
  const account = params.userCall;
  const room = params.room;

  console.log('account', account);
  console.log('room', room);
  const conferenceOptions = {
    room: room,
    userInfo: {
      displayName: account?.name,
      email: account?.email,
      avatar:
        account?.avatar ||
        'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
    },
    featureFlags: {
      'live-streaming.enabled': false,
    },
  };

  await JitsiMeet.launchJitsiMeetView(conferenceOptions);
};

const jitsiService = {
  startJitsi,
};

export default jitsiService;
