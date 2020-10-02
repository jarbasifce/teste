import { StyleSheet, Dimensions } from 'react-native';

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
    alignItems: 'flex-end',
  },
  headingLabel: {
    fontSize: 23,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'OpenSans-Regular',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  accountLabel: {
    marginTop: 24,
    fontWeight: 'bold',
    fontSize: 19,
    width: '100%',
    textAlign: 'center',
    color: '#404040',
  },
  box: {
    flex: 1,
    minHeight: 240,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 9,
    paddingTop: 8,
  },
  boxItem: {
    flexDirection: 'row',
    maxHeight: 48,
    minHeight: 48,
    backgroundColor: 'white',
    borderColor: '#d1d1d1',
    borderRadius: 48,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  boxItemSelected: {
    borderColor: '#f00'
  },
  addrTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#636363',
  },
  addrInfo: {
    fontSize: 12,
    marginTop: 2,
  },
  addrDeleteContainer: {
    flex: 1,
    minWidth: '40%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderWidth: 1,
  },
  form: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#d1d1d1',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 9,
    paddingTop: 8
  },
  input: {
    width: '95%',
    borderColor: '#999',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 4,
  },
  btnSaveAddress: {
    width: '95%',
    height: 54,
    backgroundColor: '#d6001b',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  txtBTN: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
});
