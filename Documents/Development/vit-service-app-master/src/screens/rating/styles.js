import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;

export default StyleSheet.create({
  conatainer: {
    flex: 1,
  },
  titleConatainer: {
    width: '100%',
    backgroundColor: '#d6001b',
    paddingHorizontal: 30,
  },
  treatmentTXT: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'OpenSans-Regular',
    transform: [{ translateY: -5 }]
  },
  treatmentSubTXT: {
    fontFamily: 'OpenSans-Regular',
    color: '#fff',
    fontSize: 12,
    transform: [{ translateY: -5 }]
  },
  banner: {
    width: Width * 0.35,
    height: 114,
    borderRadius: 20,
  },
  content: {
    alignItems: 'center',
  },
  storeInfo: {
    width: Width,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 32,
  },
  description: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 8
  },
  storeName: {
    width: '100%',
    color: '#030f29',
    fontFamily: 'OpenSans-Regular',
    fontSize: 21,
    marginBottom: 2,
  },
  storeSchedule: {
    color: 'rgba(3, 15, 41, 0.4)',
    fontFamily: 'OpenSans-Regular',
    fontSize: 17,
    marginTop: 1,
    marginBottom: 2,
  },
  commentTXT: {
    color: '#545454',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  comment: {
    color: '#000',
    textAlignVertical: 'top',
    backgroundColor: '#eee',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    width: Width - 30,
    marginBottom: 15,
    paddingHorizontal: 12
  },
  classificationTXT: {
    color: '#030f29',
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
  },
  starts: {
    flexDirection: 'row',
  },
  star: {
    margin: 10,
  },
  btnComment: {
    width: Width - 30,
    height: 52,
    borderRadius: 4,
    backgroundColor: '#d6001b',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  btnCommentTxt: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    fontWeight: '600',
  },
  servicesContainer: {
    width: Width * 0.9,
    marginVertical: 10,
  },
  service: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    marginVertical: 5,
  },
  servicesTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
});
