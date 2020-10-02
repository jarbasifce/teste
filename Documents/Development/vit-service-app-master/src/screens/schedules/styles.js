import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from '../../helpers/fontSizeHelper';

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
    color: '#fff',
    fontFamily: 'OpenSans-Regular',
    transform: [{ translateY: -8 }],
  },
  banner: {
    width: Width,
    height: 114,
  },
  description: {
    height: 80,
    width: Width,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.16)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  infoStore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storeName: {
    width: '55%',
    color: '#030f29',
    fontFamily: 'OpenSans-Regular',
    fontWeight: '600',
    fontSize: 21,
    marginBottom: 2,
  },
  stars: {
    width: '45%',
    flexDirection: 'row',
    marginLeft: 15,
  },
  star: {
    margin: 5,
  },
  txtDescriptionTimes: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
    marginVertical: 4,
  },
  btnDay: {
    width: 60,
    height: 80,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 6
  },
  btnDayActive: {
    borderWidth: 1,
    backgroundColor: '#d6001b',
    borderColor: '#d6001b',
  },
  TXTDayOfMonth: {
    fontSize: responsiveFontSize(3.3),
    fontWeight: 'bold',
  },
  TXTDay: {
    fontSize: responsiveFontSize(2.1),
    textTransform: 'capitalize',
  },
  horary: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  innerHorary: {
    alignItems: 'center',
  },
  btnHoraryTXT: {
    fontSize: 17,
    marginVertical: 12,
  },
  btnHoraryTXTActive: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#fff',
  },
  containerHours: {
    flex: 1,
    width: '100%',
  },
  btnHorary: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 3,
  },
  btnHoraryActive: {
    backgroundColor: '#d6001b',
  },
  footer: {
    alignItems: 'center',
  },
  btnSchedule: {
    width: '96%',
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
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  selectHorary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 10,
    marginHorizontal: 8,
  },
  selectHoraryTXT: {
    fontSize: responsiveFontSize(1.8),
    marginLeft: 5,
  },
  workingHoraryTXT: {
    fontSize: responsiveFontSize(1.4),
    paddingLeft: 4,
  },
  workingTimeContainer: {
    flexDirection: "row",
    width: '100%',
    justifyContent: 'space-evenly'
  },
  content: {
    flex: 1,
  },
  hoursContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyHoursTXT: {
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(2),
    color: '#999',
  },
});
