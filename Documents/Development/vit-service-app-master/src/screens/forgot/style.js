import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');
export const headerLogo = height * 0.23;
export const headerLogosmall = height * 0.15;

export default StyleSheet.create({
  containe: {
    flex: 1,
    backgroundColor: '#d6001b',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1.3,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    justifyContent: 'space-between',
  },
  footer: {
    paddingHorizontal: 23,
    paddingVertical: 20,
  },
  logo: {
    width: headerLogo,
    height: headerLogo,
  },
  txtForgot: {
    color: '#d6001b',
    fontSize: 23,
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
  txt: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#999999',
    marginBottom: 13,
  },
  input: {
    height: 49,
    backgroundColor: '#f4f8fb',
    marginBottom: 5,
  },
  btnForgot: {
    width: '100%',
    height: 52,
    borderRadius: 4,
    backgroundColor: '#d6001b',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  btnForgotTxt: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
});
