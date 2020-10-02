import { StyleSheet } from 'react-native';

const Style = (props) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: props.selected ? '#779DB4' : '#29404e',
      maxWidth: 108,
      maxHeight: 90,
      minWidth: 108,
      minHeight: 90,
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 16,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 34,
      height: 34
    },
    label: {
      color: 'white',
      fontWeight: 'bold',
      lineHeight: 18,
      fontSize: 13,
      paddingTop: 8
    }
  });

export default Style; 