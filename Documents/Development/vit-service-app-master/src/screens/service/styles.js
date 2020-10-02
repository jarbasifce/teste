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
    fontSize: responsiveFontSize(2.8),
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'OpenSans-Regular',
    transform: [{ translateY: -6 }],
  },
  banner: {
    width: Width,
    height: Width,
  },
  bannerCover: {
    overflow: 'hidden',
    width: Width,
    minHeight: 162,
    maxHeight: 162,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  description: {
    height: 80,
    width: Width,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.16)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  infoStore: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  storeName: {
    width: '55%',
    color: '#030f29',
    fontFamily: 'OpenSans-Regular',
    fontWeight: '600',
    fontSize: 21,
    marginBottom: 2,
  },
  cardProduct: {
    width: 104,
    height: 180,
    marginHorizontal: 5,
    paddingVertical: 5,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  cardName: {
    fontSize: responsiveFontSize(1.3),
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
  },
  cardPrice: {
    color: '#f05050',
    fontSize: responsiveFontSize(2),
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
  },
  priceOffLabel: {
    position: 'absolute',
    backgroundColor: '#f00',
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    color: 'white',
    fontSize: 11,
  },
  cardPriceOff: {
    color: '#3f3f3f',
    fontSize: responsiveFontSize(1),
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    textDecorationLine: 'line-through',
  },
  listProduct: {
    marginTop: 10,
    height: '100%',
  },
  stars: {
    width: '45%',
    flexDirection: 'row',
    marginLeft: 15,
  },
  star: {
    margin: 5,
  },
  activeCategory: {
    backgroundColor: '#f00',
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#f00',
    marginVertical: 2,
    borderRadius: 24,
    marginRight: 6,
  },
  category: {
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#f00',
    marginVertical: 2,
    borderRadius: 24,
    marginRight: 6,
  },
  categoryText: {
    paddingVertical: 6,
    height: '100%',
    color: '#f00',
    fontSize: 13,
  },
  activeCategoryText: {
    paddingVertical: 6,
    height: '100%',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    width: Width,
  },
  emptyText: {
    fontSize: 14,
    marginTop: 40,
    color: '#323232',
    fontFamily: 'OpenSans-Regular',
  },
  emptyView: {
    width: Width,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
