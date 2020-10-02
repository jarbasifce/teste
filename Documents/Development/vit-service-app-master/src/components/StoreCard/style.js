import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 8,
    minHeight: 100,
    maxHeight: 100,
    borderRadius: 12,
    backgroundColor: '#ff2e29',
    marginBottom: 12
  },
  leftSide: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 12,
    paddingTop: 8
  },
  storeTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 22,
    marginBottom: 6
  },
  storeInfo: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 16,
    alignItems: 'center',
    marginBottom: 12
  },
  storeInfoLabel: {
    color: 'white',
    fontSize: 14,
    lineHeight: 16,
    paddingRight: 20
  },
  storeLogo: {
    width: 100,
    height: '100%',
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12
  },
  storeInfoIcon: {
    width: 20,
    textAlign: 'center',
    paddingRight: 4
  }
});

export default Style; 