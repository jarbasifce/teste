import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');

export const headerLogo = height * 0.20;
export const headerLogosmall = height * 0.12;

export default StyleSheet.create({
  containe: {
    flex: 1,
    backgroundColor: '#d6001b',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    flex: .7,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    justifyContent: 'flex-end',
  },
  footer: {
    paddingHorizontal: 23,
    paddingVertical: 20,
    marginBottom: 20,
  },
  logo: {
    width: headerLogo,
    height: headerLogo,
  },
  txtLogo: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
  },
  txtLogin: {
    color: '#d6001b',
    fontSize: 23,
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
  txt: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#999999',
    marginBottom: 12,
  },
  input: {
    paddingLeft: 16,
    height: 45,
    backgroundColor: '#f4f8fb',
    marginBottom: 6,
  },
  btnLogin: {
    width: '100%',
    height: 48,
    borderRadius: 4,
    backgroundColor: '#d6001b',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  btnLoginTxt: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
  forgotContainer: {
    marginTop: 5.25,
    justifyContent: 'space-between',
  },
  forgotTxt: {
    color: '#d6001b',
    textAlign: 'right',
    fontFamily: 'Roboto-Regular'
  },
  registerTxt: {
    color: '#d6001b',
    fontSize: 14,
    fontWeight: 'bold'
  },
  socialContainer: {
    height: 40,
    backgroundColor: '#707070',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
