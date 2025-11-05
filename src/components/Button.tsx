import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, borderRadius } from '../theme/spacing';
import { textStyles } from '../theme/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { colors } = useTheme();

  const isPrimary = variant === 'primary';
  const isDisabled = disabled || loading;

  const buttonStyle: ViewStyle = {
    backgroundColor: isDisabled
      ? colors.border
      : isPrimary
      ? colors.primary
      : 'transparent',
    borderWidth: isPrimary ? 0 : 1,
    borderColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.small,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...style,
  };

  const textColor: TextStyle = {
    color: isDisabled
      ? colors.textSecondary
      : isPrimary
      ? '#ffffff'
      : colors.primary,
    ...textStyles.bodyBold,
    ...textStyle,
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={isPrimary ? '#ffffff' : colors.primary}
          style={styles.loader}
        />
      )}
      <Text style={textColor}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginRight: spacing.sm,
  },
});
