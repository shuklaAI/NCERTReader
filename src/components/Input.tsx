import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, borderRadius } from '../theme/spacing';
import { textStyles } from '../theme/typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string | null;
  containerStyle?: ViewStyle;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  secureTextEntry = false,
  showPasswordToggle = false,
  ...textInputProps
}) => {
  const { colors } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const hasError = !!error;
  const isSecure = secureTextEntry && !isPasswordVisible;

  const inputContainerStyle = {
    borderColor: hasError ? colors.error : isFocused ? colors.primary : colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.small,
    paddingHorizontal: spacing.sm + spacing.xs,
    paddingVertical: spacing.sm + spacing.xs,
    backgroundColor: colors.surface,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  };

  const inputTextStyle = {
    flex: 1,
    color: colors.textPrimary,
    ...textStyles.body,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colors.textPrimary }]}>
          {label}
        </Text>
      )}
      <View style={inputContainerStyle}>
        <TextInput
          style={inputTextStyle}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={isSecure}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />
        {showPasswordToggle && secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.toggleButton}
          >
            <Text style={{ color: colors.textSecondary }}>
              {isPasswordVisible ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {hasError && (
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...textStyles.bodyBold,
    marginBottom: spacing.xs,
  },
  errorText: {
    ...textStyles.small,
    marginTop: spacing.xs,
  },
  toggleButton: {
    padding: spacing.xs,
  },
});
