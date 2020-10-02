import { StyleSheet } from 'react-native';
import { responsiveFontSize } from '../../helpers/fontSizeHelper';

const Style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    marginBottom: 4
  },
  leftSide: {
    flex: 1,
    paddingLeft: 12,
    paddingTop: 8,
    marginBottom: 4,
  },
  storeTitle: {
    color: '#29404e',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.9),
    lineHeight: 22,
    marginBottom: 6,
  },
  storeInfo: {
    flexDirection: 'row',
    maxHeight: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  storeInfoLabel: {
    color: '#3f3f3f',
    fontSize: responsiveFontSize(1.7),
    lineHeight: 16,
    paddingRight: 20,
  },
  storeLogo: {
    width: 100,
    height: '100%',
    backgroundColor: '#d3d3d3',
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    transform: [{ translateX: -1 }]
  },
  storeInfoIcon: {
    width: 20,
    textAlign: 'center',
    paddingRight: 4,
  },
  storeLogoContainer: {
    borderLeftWidth: .5,
    borderLeftColor: '#d3d3d3'
  }
});

export default Style;
