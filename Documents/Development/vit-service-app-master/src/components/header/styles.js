import { StyleSheet, Platform } from 'react-native';

export default () =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#d6001b',
      height: Platform.OS === 'android' ? 60 : 80,
    },
    icon: {
      width: '20%',
      alignItems: 'center',
      flexDirection: 'row',
    },
    backArrowButton: {
      flex: 1,
      maxWidth: 52,
      minWidth: 52,
      flexDirection: 'row',
      justifyContent: 'center',
      marginHorizontal: 28.26,
      transform: [{ translateX: -15 }],
    },
    barsButton: {
      flex: 1,
      maxWidth: 52,
      minWidth: 52,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      // transform: [{ translateX: props.hideBackArrow ? -15 : 15 }],
    },
    title: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
  });
