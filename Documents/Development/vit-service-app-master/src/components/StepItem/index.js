import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import style from './style';

const StepItem = ({ stepName, stepNumber, checked, current, onPress }) => {
  return (
    <View style={style.container}>
      <Text style={{ fontSize: 15 }}>{stepName}</Text>
      <View style={{ ...style.line, ...checked || current ? style.lineActive : {} }}></View>
      <TouchableOpacity onPress={() => onPress()} style={{ ...style.circle, ...checked || current ? style.circleActive : {} }}>
        {checked ?
          <FontAwesome name="check" color="white" /> :
          <Text style={style.circleLabel} >{stepNumber}</Text>
        }
      </TouchableOpacity>
    </View >
  );
}

export default StepItem;