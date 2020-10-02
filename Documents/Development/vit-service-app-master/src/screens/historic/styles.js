import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  titleConatainer: {
    width: '100%',
    backgroundColor: '#d6001b',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: '#e2e2e2',
    fontFamily: 'OpenSans-Regular',
  },
  content: {},
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    paddingVertical: 15,
    backgroundColor: 'white'
  },
  imageStore: {
    width: 59,
    height: 59,
    borderRadius: 59 / 2,
  },
  orderDescription: {
    width: Width - 105,
    paddingHorizontal: 10,
  },
  nomeStore: {
    color: '#3c3c59',
    fontSize: 13,
  },
  dataOrder: {
    color: '#3c3c59',
    fontSize: 11,
  },
  dataStatus: {
    textAlign: 'center',
    color: '#3c3c59',
    borderColor: '#3c3c59',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 1,
    paddingHorizontal: 6,
    fontSize: 11,
    minWidth: 80,
  },
  footer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  btnSchedule: {
    width: '100%',
    height: 54,
    borderRadius: 4,
    backgroundColor: '#d6001b',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TXTSchedule: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
