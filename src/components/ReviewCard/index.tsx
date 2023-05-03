import {WhiteSpace, Flex} from '@ant-design/react-native';
import React from 'react';
import {Text} from 'react-native';
import {AirbnbRating} from 'react-native-elements';
import {style} from 'style';

interface ReviewCardProps {
  name: string;
  rating: number;
  content: string;
}

const ReviewCard = ({name, rating, content}: ReviewCardProps) => {
  return (
    <>
      <Flex direction="column" align="start" style={style.w100}>
        <Text style={style.textBold}>{name}</Text>
        <WhiteSpace size="sm" />
        <AirbnbRating
          count={rating}
          isDisabled={true}
          defaultRating={5}
          size={20}
          showRating={false}
        />
        <WhiteSpace size="sm" />
        <Text>{content || 'No reviews'}</Text>
      </Flex>

      <WhiteSpace size="lg" />
    </>
  );
};

export default ReviewCard;
