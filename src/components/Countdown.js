import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, paddingSizes, marginSizes } from '../utils/size.js';
import { colors } from '../utils/color';

const minutesToMillis = (min) => min * 60 * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minuteTimes, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);
  const [millis, setMillis] = useState(null);

  const countDown = () => {
    setMillis((millis) => {
      if (millis === 0) {
        return millis;
      }
      millis -= 1000;
      return millis;
    });
  };
  const currentMinute = Math.floor(millis / 1000 / 60) % 60;
  const currentSecond = Math.floor(millis / 1000) % 60;

  useEffect(() => {
    setMillis(minutesToMillis(minuteTimes));
  }, [minuteTimes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minuteTimes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <Text style={styles.text}>
      {formatTime(currentMinute)}:{formatTime(currentSecond)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: paddingSizes.l,
    backgroundColor: colors.purple,
  },
});
