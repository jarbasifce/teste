import React from 'react';
import { TextInput } from 'react-native';

import style from './style';

const FocusableTextInput = (props) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <TextInput
      onBlur={() => {
        setFocused(false);
        if (props.onBlur) props.onBlur();
      }}
      onFocus={() => {
        setFocused(true);
        if (props.onFocus) props.onFocus();
      }}
      {...props}
      style={{
        ...props.style,
        ...style.input, ...focused ? style.inputActive : {}
      }} />
  )
};

export default FocusableTextInput;