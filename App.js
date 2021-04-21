import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FocusHistory } from './src/features/focus/FocusHistory';
import { Focus } from './src/features/focus/Focus.js';
import { Timer } from './src/features/time/Timer.js';
import { colors } from './src/utils/color.js';

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };
  const onClear = () => {
    setFocusHistory([]);
  };

  const saveForcusHistory = async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (err) {
      console.log(err);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveForcusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {!focusSubject ? (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      ) : (
        <Timer
          focusSubject={focusSubject}
          stopTimer={() => {
            setFocusSubject(null);
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETED);
          }}
          cancelTimer={() => {
            setFocusSubject(null);
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
});
