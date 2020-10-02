import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from '../../helpers/fontSizeHelper';

const { width } = Dimensions.get('window');
const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 3) / 10);
const imageWitdh = Math.round((dimensions.width * 3) / 10);

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#d6001b',
  },
  heading: {
    width,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headingLeft: {
    width: width * 0.3,
    alignItems: 'center',
  },
  headingRight: {
    width: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingLogo: {
    height: imageHeight,
    width: imageWitdh,
    borderRadius: 128,
    backgroundColor: 'white'
  },
  headingProfileButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#2a414f',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -15 }],
  },
  headingProfileButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(1.5),
  },
  headingGreetingsText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  menu: {
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  accountLabel: {
    marginLeft: 30,
    marginTop: 51,
    fontWeight: 'bold',
    fontSize: 19,
    color: '#404040',
  },
  menuBox: {
    backgroundColor: 'white',
    marginTop: 9,
  },
  menuItem: {
    flexDirection: 'row',
    paddingLeft: 30,
    height: 56,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
  },
  menuItemIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    paddingRight: 10,
    marginRight: 14,
  },
  bottomMenu: {
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
