import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { fontSize, paddingSizes, marginSizes } from '../utils/size.js';
import { colors } from '../utils/color';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, style]}
      onPress={props.onPress}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors.white,
    },
    text: {
      color: colors.white,
      fontSize: size / 3,
    },
  });
