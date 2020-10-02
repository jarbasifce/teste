import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');
export const headerLogo = height * 0.15;
export const headerLogosmall = height * 0.1;

export default StyleSheet.create({
  containe: {
    backgroundColor: '#d6001b',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    marginTop: 10,
  },
  footer: {
    paddingHorizontal: 23,
    marginTop: 10,
  },
  logo: {
    width: headerLogo,
    height: headerLogo,
  },
  txtSignup: {
    color: '#d6001b',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
  txt: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#999999',
    marginBottom: 8,
  },
  input: {
    height: 40,
    backgroundColor: '#f4f8fb',
    marginBottom: 5,
    paddingLeft: 8
  },
  termContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  termTxt: {
    color: '#f45b1d',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 12,
    marginBottom: 12
  },
  btnSignup: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#d6001b',
    paddingVertical: 19.9,
    marginBottom: 15,
  },
  btnSignupTxt: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
    fontSize: 16,
  },
  empytInput: {
    color: '#999999',
  },
  erroTxt: {
    color: '#d6001b',
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    marginBottom: 5,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#d6001b',
  },
});
