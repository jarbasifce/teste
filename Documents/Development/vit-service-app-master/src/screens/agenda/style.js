import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  scheduleInfo: {
    width: '65%',
  },
  itemSchedule: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  itemService: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
  },
  itemName: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
    color: '#999999',
  },
  empytContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empytTxt: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  imageStore: {
    width: 59,
    height: 59,
    borderRadius: 59 / 2,
  },
});
