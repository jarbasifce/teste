import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 4) / 10);
const imageWitdh = Math.round((dimensions.width * 4) / 10);

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: imageHeight,
    width: imageWitdh,
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Poppins-bold',
    color: '#d6001b',
    marginBottom: 20,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 15,
  },
  suport: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-bold',
    color: '#d6001b',
    marginTop: 40,
  },
  fone: {
    fontSize: 15,
    marginLeft: 10,
  },
  email: {
    fontSize: 15,
    marginLeft: 10,
  },
  option: {
    flexDirection: 'row',
    margin: 5,
  },
});
