import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class LoginPage extends React.Component {
  render() {
    return (
      <View>
        {/* <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        /> */}
        <Text>Welcome to the app</Text>
        <Text>Login to continue</Text>
        <TouchableOpacity>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginPage;
