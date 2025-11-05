import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Platform } from '../types';
import { platformColors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { textStyles } from '../theme/typography';
import { PLATFORMS } from '../utils/constants';

interface PlatformBadgeProps {
  platform: Platform;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({ platform }) => {
  const backgroundColor = platformColors[platform];
  const platformName = PLATFORMS[platform];

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.badgeText}>{platformName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.medium,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  badgeText: {
    ...textStyles.small,
    color: '#ffffff',
    fontWeight: '600',
  },
});
