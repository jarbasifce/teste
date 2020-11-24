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
    color: '#e2e2e2',
    fontFamily: 'OpenSans-Regular',
  },
  content: {
    alignItems: 'center',
    marginTop: 5,
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
    color: '#707070',
  },
  duration: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#707070',
    marginLeft: 4,
  },
  serviceContainer: {
    width: Width - 20,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 6,
    marginTop: 2,
    marginHorizontal: 70,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceQTD: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
  },
  servicePriceTXT: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#db0004',
  },
  serviceTXT: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#707070',
  },
  details: {
    width: Width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 26,
    paddingHorizontal: 20,
  },
  price: {
    width: '49%',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#db0004',
  },
  btnFinish: {
    width: '55%',
    height: 52,
    borderRadius: 4,
    backgroundColor: '#d6001b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnFinishTxt: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  empytCarContaine: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empytCarTEXT: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: '#999',
  },
});