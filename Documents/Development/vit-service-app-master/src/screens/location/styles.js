import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from '../../helpers/fontSizeHelper';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  constiner: {
    flex: 1,
  },
  heading: {
    backgroundColor: '#d3011c',
    flex: 1,
    zIndex: 11,
    maxHeight: 32,
    minHeight: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  headingLabel: {
    fontSize: 25,
    fontWeight: '600',
    color: '#e2e2e2',
    fontFamily: 'OpenSans-Regular',
    marginBottom: 10
  },
  content: {
    flex: 1,
    alignItems: 'center'
  },
  createButton: {
    flex: 1,
    marginTop: 24,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 48,
    borderRadius: 6,
    backgroundColor: '#d6001b'
  },
  createButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 0.25,
    fontSize: 15,
    marginLeft: 8
  },
  accountLabel: {
    marginLeft: 32,
    marginTop: 24,
    fontWeight: 'bold',
    fontSize: 19,
    width: '100%',
    color: '#404040',
  },
  box: {
    flex: 1,
    minHeight: 240,
    width: "100%",
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 9
  },
  boxItem: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 30,
    maxHeight: 80,
    minHeight: 80,
    backgroundColor: 'white',
    borderBottomColor: '#fff',
    borderBottomWidth: 1
  },
  boxItemSub: {
    flex: 1,
    minWidth: '60%',
    flexDirection: 'column',
  },
  addrTitle: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: 'bold',
    marginTop: 8,
    color: '#404040'
  },
  addrInfo: {
    fontSize: responsiveFontSize(1.4),
    marginTop: 2
  },
  addrDeleteContainer: {
    flex: 1,
    minWidth: '40%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addrDeleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    minHeight: 36,
    maxHeight: 36,
    borderRadius: 32,
    borderColor: '#a1a1a1',
    borderWidth: 1
  }
});
