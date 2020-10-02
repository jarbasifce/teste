import React from 'react';
import { Image, View, Dimensions } from 'react-native';

import Carousel from '../Carousel';

const { width, height } = Dimensions.get('window');

const BannerWidth = width * 0.8;
const BannerHeight = height * 0.15;
const HorizontalMargin = width * 0.05;

const BannerCarousel = ({ images, marginBottom }) => {
  return (
    <Carousel autoplay autoplayTimeout={3000} loop index={0} pageSize={width}>
      {images.map((image, index) => (
        <View key={index} style={{ alignItems: 'center' }}>
          <Image
            style={{
              width: BannerWidth,
              height: BannerHeight,
              borderRadius: 10,
              marginHorizontal: HorizontalMargin,
              marginBottom: marginBottom || 0,
            }}
            source={{ uri: image }}
          />
        </View>
      ))}
    </Carousel>
  );
};

export default BannerCarousel;
