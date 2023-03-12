import {WhiteSpace, Flex} from '@ant-design/react-native';
import React from 'react';
import {Text} from 'react-native';
import {AirbnbRating} from 'react-native-elements';
import {style} from 'style';

const ReviewCard = () => {
  return (
    <>
      <Flex direction="column" align="start" style={style.w100}>
        <Text style={style.textBold}>Thanh Hoang</Text>
        <WhiteSpace size="sm" />
        <AirbnbRating
          count={5}
          isDisabled={true}
          defaultRating={5}
          size={20}
          showRating={false}
        />
        <WhiteSpace size="sm" />
        <Text>Very excellent teacher!</Text>
      </Flex>

      <WhiteSpace size="lg" />
    </>
  );
};

export default ReviewCard;
