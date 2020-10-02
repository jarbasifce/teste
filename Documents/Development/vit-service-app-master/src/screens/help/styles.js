import { StyleSheet, Platform } from 'react-native';
import { responsiveFontSize } from '../../helpers/fontSizeHelper';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  title: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#d6001b',
  },
  paragraph: {
    fontSize: responsiveFontSize(2),
    textAlign: 'justify',
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins-Regular',
  },
});
