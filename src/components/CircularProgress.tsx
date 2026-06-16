import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  progress: number; // 0 – 1
  color?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

/**
 * Pure-View circular progress ring built with two rotated half-circles.
 * No SVG dependency required.
 */
export default function CircularProgress({
  size,
  strokeWidth,
  progress,
  color = Colors.primary,
  backgroundColor = Colors.surface,
  children,
}: CircularProgressProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const radius = size / 2;
  const innerSize = size - strokeWidth * 2;
  const degrees = clampedProgress * 360;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background ring */}
      <View
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: radius,
            borderWidth: strokeWidth,
            borderColor: backgroundColor,
          },
        ]}
      />

      {/* Right half clip */}
      <View style={{ position: 'absolute', width: radius, height: size, left: radius, overflow: 'hidden' }}>
        <View
          style={{
            width: size,
            height: size,
            borderRadius: radius,
            borderWidth: strokeWidth,
            borderColor: color,
            left: -radius,
            borderLeftColor: 'transparent',
            borderBottomColor: 'transparent',
            transform: [{ rotate: `${-135 + (degrees > 180 ? 180 : degrees)}deg` }],
          }}
        />
      </View>

      {/* Left half clip */}
      {degrees > 180 && (
        <View style={{ position: 'absolute', width: radius, height: size, left: 0, overflow: 'hidden' }}>
          <View
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              borderWidth: strokeWidth,
              borderColor: color,
              left: 0,
              borderLeftColor: 'transparent',
              borderBottomColor: 'transparent',
              transform: [{ rotate: `${-135 + (degrees - 180)}deg` }],
            }}
          />
        </View>
      )}

      {/* Center content */}
      <View
        style={[
          styles.center,
          {
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ring: {
    position: 'absolute',
  },
  center: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
