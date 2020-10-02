import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const horizontalMargin = width * 0.0335;
const verticalMargin = width * 0.0075;
const cardWidth = width * 0.392;
const cardHeight = height * 0.15;

const Style = (props) =>
  StyleSheet.create({
    container: {
      minWidth: props.width || cardWidth,
      minHeight: props.height || cardHeight,
      backgroundColor: props.backgroud || '#ffffff',
      marginHorizontal: props.horizontalMargin || horizontalMargin,
      marginVertical: props.marginVertical || verticalMargin,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
    },
    insideContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Style;
