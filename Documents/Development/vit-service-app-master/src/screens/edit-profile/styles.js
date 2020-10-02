import { StyleSheet } from 'react-native';
import { responsiveFontSize } from '../../helpers/fontSizeHelper';

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
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 16
  },
  headingLogo: {
    width: 128,
    height: 128,
    borderRadius: 128,
    backgroundColor: '#fff'
  },
  headingProfileButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#2a414f',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -12 }],
  },
  headingProfileButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(1.5),
  },
  form: {
    flex: 3,
    marginTop: 12,
    paddingHorizontal: 14,
  },
  titleForm: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#f4f8fb',
    marginBottom: 5,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  btnSubmit: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#d6001b',
    paddingVertical: 12.9,
    marginTop: 21,
    marginBottom: 30,
  },
  btnSubmitTxt: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
    fontSize: 16,
  },
  btnDisable: {
    backgroundColor: 'gray',
  },
  modalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  modalOverflow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#00000033'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  modalContentUp: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '60%',
    maxHeight: '70%',
    minHeight: '15%',
    borderRadius: 15,
    overflow: 'hidden'
  },
  optionModal: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#bdc3c7',
    borderTopWidth: .2,
    borderBottomColor: '#bdc3c7',
    borderBottomWidth: .2,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  optionModalTXT: {
    fontSize: 15,
    marginLeft: 10,
  },
});
