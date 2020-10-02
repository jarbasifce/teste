import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;

export default StyleSheet.create({
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
    transform: [{ translateY: -8 }]
  },
  content: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8
  },
  storeContainer: {
    width: Width - 10,
    height: 54,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 6,
    marginHorizontal: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  storeNameTXT: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#fefefe',
    marginLeft: 12
  },
  duration: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#2a414f',
    marginLeft: 4,
  },
  serviceContainer: {
    width: '100%',
    marginTop: 2,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceQTD: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
    width: '100%',
  },
  servicePriceTXT: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#444',
  },
  serviceQtdTXT: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    fontSize: 13,
    color: '#444',
  },
  serviceTXT: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#2a414f',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderTopColor: '#eee',
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 8,
    paddingBottom: 8
  },
  price: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#2a414f',
  },
  btnFinish: {
    width: '80%',
    height: 42,
    borderRadius: 4,
    backgroundColor: '#d6001b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnFinishTxt: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    letterSpacing: .35,
    fontSize: 13,
    textTransform: 'uppercase',
  },
  emptyCarContainer: {
    flex: 1,
    paddingTop: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empytCarTEXT: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#999',
  },
});
