import {Flex, WhiteSpace} from '@ant-design/react-native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import VideoPlayer from 'react-native-video-player';
import {color, style} from 'style';
import {Button} from 'galio-framework';
import FieldChip from 'components/FieldChip';
import {Chip} from '@react-native-material/core';

const TutorProfileScreen = () => {
  const myStyle = StyleSheet.create({
    cardContent: {
      height: 70,
    },
    cardContentText: {
      marginLeft: 16,
    },
    starText: {
      marginRight: 5,
      fontWeight: 'bold',
    },
    card: {
      shadowColor: '#000',
      shadowOffset: {
        width: 8,
        height: 8,
      },
      shadowOpacity: 0.27,
      shadowRadius: 3.65,
      elevation: 5,
      // borderRadius: 10,
    },
    tutorName: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'black',
    },
  });
  return (
    <ScrollView>
      <VideoPlayer
        video={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        videoWidth={1600}
        videoHeight={900}
        thumbnail={{
          uri: 'https://www.animaker.com/static_2.0/img/youtubeintromaker/YouTube_Intro_maker_og.webp',
        }}
      />

      <View style={style.container}>
        <Flex align="start">
          <Image
            source={{
              uri: 'https://oiir.illinois.edu/sites/prod/files/Profile%20Picture_1.png',
            }}
            style={{width: 70, height: 70}}
          />
          <View style={{width: '75%', marginLeft: 20}}>
            <Flex justify="between">
              <Text style={myStyle.tutorName}>Abby</Text>
              <Flex>
                <Text style={myStyle.starText}>5.00</Text>
                <Icon name="star" type="material-community" color="#F1cf35" />
              </Flex>
            </Flex>

            <Flex justify="between">
              <Text style={style.textBold}>Teacher</Text>
              <TouchableOpacity>
                <Icon
                  name="heart-outline"
                  type="material-community"
                  color="red"
                />
              </TouchableOpacity>
            </Flex>

            <Text>{'English (the)'}</Text>
          </View>
        </Flex>

        <WhiteSpace />

        <Button style={style.primaryButton}>Book this tutor</Button>

        <WhiteSpace />

        <Flex justify="around">
          <TouchableOpacity>
            <Flex direction="column" justify="center">
              <Icon
                name="message-text"
                size={25}
                type="material-community"
                color={color.primaryColor}
              />
              <Text style={style.textBoldPrimary}>Message</Text>
            </Flex>
          </TouchableOpacity>

          <TouchableOpacity>
            <Flex direction="column" justify="center">
              <Icon
                name="rate-review"
                size={25}
                type="material-icons"
                color={color.primaryColor}
              />
              <Text style={style.textBoldPrimary}>Reviews</Text>
            </Flex>
          </TouchableOpacity>

          <TouchableOpacity>
            <Flex direction="column" justify="center">
              <Icon
                name="report"
                size={25}
                type="material-icons"
                color={color.primaryColor}
              />
              <Text style={style.textBoldPrimary}>Report</Text>
            </Flex>
          </TouchableOpacity>
        </Flex>

        <WhiteSpace size="lg" />

        <Text style={style.textBlack}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          impedit nam culpa quasi voluptatibus eius illo voluptate veniam
          tempore, quos accusantium perspiciatis sint eaque qui aut similique
          ipsum, iure dolor.
        </Text>

        <WhiteSpace size="lg" />

        <Text style={style.textBoldPrimary}>Schedule</Text>
        <WhiteSpace />
        <Text>{'M-W-F (18:30)'}</Text>

        <WhiteSpace size="lg" />

        <Text style={style.textBoldPrimary}>Experience</Text>
        <WhiteSpace />
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum
          dolor sit amet consectetur adipisicing elit.
        </Text>
        <WhiteSpace size="lg" />

        <Text style={style.textBoldPrimary}>Languages</Text>
        <WhiteSpace />
        <Flex>
          <FieldChip label="english" color={color.primaryColor} />
        </Flex>

        <WhiteSpace size="lg" />
        {/* 
        <Text style={style.textBoldPrimary}>Education</Text>
        <WhiteSpace />
        <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
        <WhiteSpace size="lg" /> */}

        <Text style={style.textBoldPrimary}>Specialities</Text>
        <WhiteSpace />
        <Flex>
          <FieldChip label="IELTS" color={color.primaryColor} />
          <Text style={style.mr2} />
          <FieldChip label="TOEIC" color={color.primaryColor} />
          <Text style={style.mr2} />
          <FieldChip label="Business English" color={color.primaryColor} />
        </Flex>
        <WhiteSpace size="lg" />
      </View>
    </ScrollView>
  );
};

export default TutorProfileScreen;
