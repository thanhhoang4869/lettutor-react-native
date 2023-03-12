import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Flex, WhiteSpace} from '@ant-design/react-native';
import {Input} from 'galio-framework';
import {FAB, Icon, Image} from 'react-native-elements';
import Modal from 'react-native-modal';
import {color, style} from 'style';

const MeetingScreen = () => {
  const myStyle = StyleSheet.create({
    gptChat: {
      color: color.primaryColor,
      fontWeight: 'bold',
    },
    myChat: {
      color: 'black',
      fontWeight: 'bold',
    },
    container: {
      height: '100%',
      width: '100%',
    },
    fab: {
      marginRight: 16,
      marginBottom: 100,
      shadowColor: 'white',
      shadowOffset: {
        width: 8,
        height: 8,
      },
      shadowOpacity: 0.8,
      shadowRadius: 5.32,

      elevation: 8,
    },
  });

  const [isChatModalVisible, setChatModalVisible] = React.useState(false);
  const toggleChatModal = () => {
    setChatModalVisible(!isChatModalVisible);
  };

  return (
    <View style={myStyle.container}>
      {/* chat modal start */}
      <Modal isVisible={isChatModalVisible}>
        <Flex style={style.modal} direction="column" align="start">
          <Flex justify="between" style={style.w100}>
            <Flex>
              <Image
                source={{
                  uri: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/chatgpt-icon.png',
                }}
                style={{width: 40, height: 40}}
              />
              <Text style={{marginLeft: 15, ...style.modalTitle}}>
                ChatGPT Assistant
              </Text>
            </Flex>

            <TouchableOpacity onPress={toggleChatModal}>
              <Icon name="close" type="antdesign" color="black" />
            </TouchableOpacity>
          </Flex>

          <WhiteSpace size="lg" />

          <ScrollView
            style={{
              height: 250,
              width: '100%',
            }}>
            <View>
              <Text style={myStyle.gptChat}>GPT</Text>
              <Text>
                {"Hi, I'm ChatGPT. I'm here to help you with your lesson."}
              </Text>
            </View>

            <WhiteSpace />

            <View>
              <Text style={myStyle.myChat}>You</Text>
              <Text>Link to the book ABC please!</Text>
            </View>

            <WhiteSpace />

            <View>
              <Text style={myStyle.gptChat}>GPT</Text>
              <Text>Here you go: https://www.google.com</Text>
            </View>

            <WhiteSpace />

            <View>
              <Text style={myStyle.gptChat}>GPT</Text>
              <Text>
                {"Hi, I'm ChatGPT. I'm here to help you with your lesson."}
              </Text>
            </View>

            <WhiteSpace />

            <View>
              <Text style={myStyle.myChat}>You</Text>
              <Text>Link to the book ABC please!</Text>
            </View>

            <WhiteSpace />

            <View>
              <Text style={myStyle.gptChat}>GPT</Text>
              <Text>Here you go: https://www.google.com</Text>
            </View>

            <WhiteSpace />
          </ScrollView>

          <WhiteSpace size="xl" />

          <Flex style={style.w100} justify="between">
            <Input
              cursorColor={color.primaryColor}
              multiline={true}
              placeholder="Type your message here"
              style={{
                width: '120%',
              }}
            />

            <TouchableOpacity>
              <Icon name="send" type="material" color={color.primaryColor} />
            </TouchableOpacity>
          </Flex>
        </Flex>
      </Modal>
      {/* chat modal end */}

      <ImageBackground
        style={{
          height: '100%',
        }}
        source={require('assets/jitsi.png')}
        resizeMode="cover"
      />
      <FAB
        placement="right"
        iconPosition="bottom"
        color={color.primaryColor}
        icon={{
          name: 'robot-love',
          type: 'material-community',
          color: 'white',
        }}
        style={myStyle.fab}
        onPress={() => toggleChatModal()}
      />
    </View>
  );
};

export default MeetingScreen;
