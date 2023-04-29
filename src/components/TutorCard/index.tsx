import {Card, Flex} from '@ant-design/react-native';
import FieldChip from 'components/FieldChip';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {AirbnbRating} from 'react-native-ratings';
import {color, style} from 'style';

import {useContext} from 'react';
import {AccountContext} from 'context/AccountContext';

export interface TutorCardProps {
  onTouch: () => void;
  tutor: any;
}

export default function TutorCard({
  onTouch,
  tutor,
}: TutorCardProps): JSX.Element {
  const {specialties} = useContext(AccountContext);

  const renderSpecialties = () => {
    const tutorSpecialties = tutor.specialties;

    const specialtiesArrTmp: string[] = tutorSpecialties.split(',');

    const specialtiesArr = specialtiesArrTmp.map((specialty: string) => {
      const specialtyObj: any = specialties.find(
        (obj: any) => obj.key === specialty,
      );
      return specialtyObj || specialty;
    });

    return specialtiesArr.map((speciality: any, index: number) => {
      return (
        <React.Fragment key={index}>
          <FieldChip
            value={speciality.key || speciality}
            label={speciality.name || speciality}
            color={color.primaryColor}
          />
          <Text style={{marginRight: 5}} />
        </React.Fragment>
      );
    });
  };

  const extra: React.ReactNode = (
    <Flex direction="row" justify="end">
      {tutor?.rating && (
        <View
          style={{
            marginRight: 10,
          }}>
          <Flex direction="row">
            <Text
              style={{
                ...style.textBold,
                marginRight: 5,
              }}>
              {tutor.rating.toFixed(2)}
            </Text>
            <Icon
              name="star"
              type="material-community"
              color="gold"
              size={25}
            />
          </Flex>
        </View>
      )}

      <TouchableOpacity>
        {tutor.isfavoritetutor ? (
          <Icon name="heart" type="material-community" color="red" />
        ) : (
          <Icon name="heart-outline" type="material-community" color="red" />
        )}
      </TouchableOpacity>
    </Flex>
  );

  const contentFooter: React.ReactNode = (
    <ScrollView horizontal={true}>
      {tutor.specialties && renderSpecialties()}
    </ScrollView>
  );

  return (
    <TouchableOpacity onPress={onTouch}>
      <Card style={style.card}>
        <Card.Header
          title={
            <Text
              style={myStyle.cardHeaderText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {tutor.name}
            </Text>
          }
          thumbStyle={{
            width: 40,
            height: 40,
            marginRight: 16,
            borderRadius: 50,
          }}
          thumb={tutor.avatar}
          extra={extra}
        />
        <Card.Body>
          <View style={myStyle.cardContent}>
            <Text
              style={myStyle.cardContentText}
              numberOfLines={5}
              ellipsizeMode="tail">
              {tutor.bio || 'No description'}
            </Text>
          </View>
        </Card.Body>
        <Card.Footer content={contentFooter} />
      </Card>
    </TouchableOpacity>
  );
}

const myStyle = StyleSheet.create({
  cardContent: {
    height: 100,
  },
  cardContentText: {
    margin: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  starText: {
    marginRight: 5,
    fontWeight: 'bold',
  },
  cardHeaderText: {
    fontSize: 18,
    color: 'black',
  },
});
