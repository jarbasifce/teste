import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: -16,
    paddingHorizontal: 4,
    flex: 1,
    borderRadius: 16,
    flexDirection: 'row',
    maxHeight: 16,
    minHeight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  badgeTXT: {
    color: 'white',
    fontWeight: 'bold',
  },
});
