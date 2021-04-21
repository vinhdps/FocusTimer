import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, paddingSizes, marginSizes } from '../../utils/size.js';
import { colors } from '../../utils/color.js';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on ?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type in here"
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => {
              addSubject(subject);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    flex: 0.6,
    padding: paddingSizes.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.l,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingTop: paddingSizes.m,
    paddingHorizontal: paddingSizes.s,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: marginSizes.m,
  },
});
