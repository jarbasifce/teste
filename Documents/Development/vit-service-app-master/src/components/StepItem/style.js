import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  line: {
    width: '100%',
    height: 4,
    backgroundColor: '#d4d4d4',
    marginTop: 12
  },
  lineActive: {
    backgroundColor: '#d6001b',
  },
  circle: {
    width: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 24,
    minHeight: 24,
    backgroundColor: '#bbb',
    borderRadius: 24,
    transform: [{ translateY: -14 }]
  },
  circleActive: {
    backgroundColor: '#f00',
  },
  circleLabel: {
    color: 'white',
    fontWeight: 'bold'
  }
});