import { Dimensions } from 'react-native';

const percentageCalculation = (max, val) => max * (val / 100);

const fontCalculation = (height, width, val) => {
  const widthDimension = height > width ? width : height;
  const aspectRatioBasedHeight = (16 / 9) * widthDimension;
  return percentageCalculation(
    Math.sqrt(aspectRatioBasedHeight ** 2 + widthDimension ** 2),
    val,
  );
};

export const responsiveFontSize = (f) => {
  const { height, width } = Dimensions.get('window');
  return fontCalculation(height, width, f);
};
