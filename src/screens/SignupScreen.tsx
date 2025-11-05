import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { validateEmail, validatePassword, validateDisplayName } from '../utils/validation';
import { getAuthErrorMessage } from '../services/authService';
import { spacing } from '../theme/spacing';
import { textStyles } from '../theme/typography';

export const SignupScreen: React.FC = () => {
  const navigation = useNavigation();
  const { signup } = useAuth();
  const { colors } = useTheme();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayNameError, setDisplayNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDisplayNameBlur = () => {
    setDisplayNameError(validateDisplayName(displayName));
  };

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    setPasswordError(validatePassword(password));
  };

  const handleSignup = async () => {
    // Clear previous errors
    setFormError(null);

    // Validate all fields
    const displayNameValidation = validateDisplayName(displayName);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (displayNameValidation) {
      setDisplayNameError(displayNameValidation);
      return;
    }

    if (emailValidation) {
      setEmailError(emailValidation);
      return;
    }

    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, displayName || undefined);
      // Navigation will happen automatically via AuthContext
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code);
      setFormError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email && password && !emailError && !passwordError;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Create Account
          </Text>
        </View>

        {/* Signup Form */}
        <View style={styles.form}>
          <Input
            label="Display Name (Optional)"
            value={displayName}
            onChangeText={(text) => {
              setDisplayName(text);
              setDisplayNameError(null);
            }}
            onBlur={handleDisplayNameBlur}
            error={displayNameError}
            placeholder="Enter your name"
          />

          <Input
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(null);
            }}
            onBlur={handleEmailBlur}
            error={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(null);
            }}
            onBlur={handlePasswordBlur}
            error={passwordError}
            secureTextEntry
            showPasswordToggle
            placeholder="Enter your password"
          />

          {formError && (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {formError}
            </Text>
          )}

          <Button
            title="Sign Up"
            onPress={handleSignup}
            loading={loading}
            disabled={loading || !isFormValid}
            style={styles.signupButton}
          />
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: colors.textSecondary }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
            <Text style={[styles.loginLink, { color: colors.primary }]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...textStyles.h1,
    fontSize: 28,
  },
  form: {
    marginBottom: spacing.lg,
  },
  signupButton: {
    marginTop: spacing.md,
  },
  errorText: {
    ...textStyles.small,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    ...textStyles.body,
  },
  loginLink: {
    ...textStyles.bodyBold,
  },
});
