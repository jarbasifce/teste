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
    color: '#fff',
    fontFamily: 'OpenSans-Regular',
    transform: [{ translateY: -8 }],
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  pageContent: {
    flex: 1,
    width: '92%',
    alignSelf: 'center',
  },
  pageFlex: {
    flex: 1,
    marginTop: 10,
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
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#777',
    marginTop: 10,
  },
  value: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#000',
    borderBottomColor: '#333',
    paddingBottom: 4,
    borderBottomWidth: 0.2,
  },
  btn: {
    marginTop: 20,
    height: 54,
    backgroundColor: '#d6001b',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  labelBtn: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  serviceContainer: {
    alignItems: 'center',
  },
  serviceItem: {
    maxHeight: 52,
    minHeight: 52,
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    borderRadius: 4,
    marginBottom: 2,
  },
  serviceItemQty: {
    color: '#777',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '20%',
  },
  serviceItemQtyLabel: {
    fontWeight: 'bold',
  },
  serviceItemInfo: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    minWidth: '80%',
  },
  serviceName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  serviceMeta: {
    flexDirection: 'row',
  },
  serviceDuration: {
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  payInfo: {
    alignItems: 'flex-end',
    marginTop: 8,
    borderBottomColor: '#333',
    borderBottomWidth: 0.2,
    paddingBottom: 12,
  },
  payItem: {
    flexDirection: 'row',
    minWidth: '50%',
  },
  payItemLeft: {
    alignItems: 'flex-end',
    minWidth: '50%',
  },
  payItemRight: {
    alignItems: 'flex-end',
    minWidth: '30%',
  },
});
