/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import env from 'env.json';
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from 'openai';
import {color, style} from 'style';
import {Flex, WhiteSpace} from '@ant-design/react-native';
import {Icon, Image} from 'react-native-elements';
import {Input} from 'galio-framework';

import {useContext} from 'react';
import {AccountContext} from 'context/AccountContext';
import {useIsFocused} from '@react-navigation/native';

const MessageScreen = () => {
  const {account} = useContext(AccountContext);
  const [messages, setMessages] = useState<any>([]);
  const [myMessages, setMyMessages] = useState<any>([]);
  const [textMessage, setTextMessage] = useState<string>('');

  const isFocused = useIsFocused();

  const configuration = new Configuration({
    apiKey: env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const getChatGPTResponse = async () => {
    try {
      const chat = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: myMessages,
      });
      const response = chat.data.choices[0].message;
      setMessages([
        ...messages,
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content: response?.content,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = () => {
    setTextMessage('');

    setMessages([
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: textMessage,
      },
    ]);

    setMyMessages([
      ...myMessages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: textMessage,
      },
    ]);
  };

  useEffect(() => {
    if (messages?.length === 0 && isFocused) {
      setMessages([
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content: 'Hi, I am ChatGPT Assistant. How can I help you?',
        },
      ]);
    }
  }, [isFocused]);

  useEffect(() => {
    getChatGPTResponse();
  }, [myMessages]);

  const renderChat = () => {
    return messages?.map((message: any, index: any) => {
      if (message.role === ChatCompletionRequestMessageRoleEnum.User) {
        return (
          <React.Fragment key={index}>
            <Flex style={style.w100} align="start">
              <Image
                source={{
                  uri: account?.avatar,
                }}
                style={myStyle.avatar}
              />
              <View style={myStyle.chatContainer}>
                <Text style={myStyle.myChat}>{account?.name}</Text>
                <Text>{message.content}</Text>
              </View>
            </Flex>
            <WhiteSpace size="xl" />
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={index}>
            <Flex style={style.w100} align="start">
              <Image
                source={{
                  uri: gptAvatar,
                }}
                style={myStyle.avatar}
              />
              <View style={myStyle.chatContainer}>
                <Text style={myStyle.gptChat}>GPT</Text>
                <Text>{message.content}</Text>
              </View>
            </Flex>
            <WhiteSpace size="xl" />
          </React.Fragment>
        );
      }
    });
  };

  const gptAvatar =
    'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/chatgpt-icon.png';

  return (
    <Flex style={style.modal} direction="column" align="start">
      <Flex justify="between" align="start" style={myStyle.header}>
        <Flex>
          <Image
            source={{
              uri: gptAvatar,
            }}
            style={{width: 40, height: 40}}
          />
          <Text style={{marginLeft: 15, ...style.modalTitle}}>
            ChatGPT Assistant
          </Text>
        </Flex>
      </Flex>

      <WhiteSpace size="lg" />

      <ScrollView style={myStyle.scrollView}>{renderChat()}</ScrollView>

      <Flex justify="between" style={style.w100}>
        <Input
          value={textMessage}
          onChangeText={(text: string) => setTextMessage(text)}
          cursorColor={color.primaryColor}
          multiline={true}
          placeholder="Type your message here"
          style={{
            width: '125%',
          }}
        />

        <TouchableOpacity onPress={sendMessage}>
          <Icon name="send" type="material" color={color.primaryColor} />
        </TouchableOpacity>
      </Flex>
    </Flex>
  );
};

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
  scrollView: {
    height: '80%',
    width: '100%',
    marginBottom: 10,
  },
  header: {
    width: '100%',
    height: '10%',
  },
  avatar: {width: 40, height: 40, borderRadius: 50, marginRight: 20},
  chatContainer: {
    width: '80%',
  },
});

export default MessageScreen;
