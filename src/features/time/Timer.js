import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { RoundedButton } from '../../components/RoundedButton';
import { Countdown } from '../../components/Countdown';
import { Timing } from './Timing.js';
import { marginSizes, paddingSizes, fontSizes } from '../../utils/size.js';
import { colors } from '../../utils/color.js';

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, stopTimer, cancelTimer }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME); // int
  const [isStarted, setIsStarted] = useState(false); //bool
  const [progress, setProgess] = useState(1); // float

  const checkProgess = (percentage) => {
    setProgess(percentage);
  };
  const changeTime = (min) => {
    setMinutes(min);
    setProgess(1);
    setIsStarted(false);
  };
  const onVibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 500);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };
  const endTimer = () => {
    onVibrate();
    setMinutes(DEFAULT_TIME);
    setProgess(1);
    setIsStarted(false);
    stopTimer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minuteTimes={minutes}
          isPaused={!isStarted}
          onProgress={checkProgess}
          onEnd={endTimer}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Forcusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View>
        <ProgressBar
          progress={progress}
          color="#6666ff"
          style={styles.progressBar}
        />
      </View>
      <View style={styles.buttomWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttomWrapper}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton size={50} title="Skip" onPress={() => cancelTimer()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    paddingBottom: paddingSizes.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.m,
  },
  task: {
    color: colors.white,
    fontSize: fontSizes.l,
    fontWeight: 'bold',
  },
  buttomWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    height: 10,
  },
  clearSubject: {
    padding: paddingSizes.m,
  },
});
