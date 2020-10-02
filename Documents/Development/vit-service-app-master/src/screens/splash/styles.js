import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');
const headerLogo = height * 0.23;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6001b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: headerLogo,
    height: headerLogo,
  },
});
