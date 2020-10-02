import { StyleSheet, Dimensions } from 'react-native';
// import { responsiveFontSize } from '../../helpers/fontSizeHelper';

const dimensions = Dimensions.get('window');

const imageHeight = Math.round((dimensions.width * 3) / 18);
const imageWitdh = Math.round((dimensions.width * 3) / 18);

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'scroll',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: '3.55%',
    marginVertical: '0.75%',
    marginBottom: 12,
  },
  categorieTxt: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    paddingVertical: 2,
    color: '#5e5e5e',
  },
  cardImage: {
    width: imageWitdh,
    height: imageHeight,
  },
  logo: {
    height: imageHeight * 1.5,
    width: imageWitdh * 1.5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  banner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
