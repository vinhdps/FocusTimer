import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, marginSizes, paddingSizes } from '../../utils/size';
import { colors } from '../../utils/color.js';

const HistoryItem = ({ item, index, separators }) => {
  return (
    <Text style={dynamicStyles(item.status).historyItem}>{item.subject}</Text>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {focusHistory.length != 0 && (
          <>
            <Text style={styles.title}>Thing we've focused on</Text>
            <FlatList
              style={styles.flatList}
              contentContainerStyle={styles.content}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
  },
  flatList: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.l,
  },
  clearContainer: {
    marginBottom: marginSizes.xxxl,
  },
});

const dynamicStyles = (status) =>
  StyleSheet.create({
    historyItem: {
      color: status > 1 ? colors.red : colors.green,
      fontSize: fontSizes.l,
      alignItems: 'center',
    },
  });
