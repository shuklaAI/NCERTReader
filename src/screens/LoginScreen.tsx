import React, { useState, useEffect } from 'react';
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
import { validateEmail } from '../utils/validation';
import { getAuthErrorMessage } from '../services/authService';
import { spacing } from '../theme/spacing';
import { textStyles } from '../theme/typography';
import { APP_NAME } from '../utils/constants';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { login, user } = useAuth();
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If user is already logged in, navigate to Home
  useEffect(() => {
    if (user) {
      navigation.navigate('Main' as never);
    }
  }, [user, navigation]);

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handleLogin = async () => {
    // Clear previous errors
    setFormError(null);

    // Validate email
    const emailValidation = validateEmail(email);
    if (emailValidation) {
      setEmailError(emailValidation);
      return;
    }

    // Check password is not empty
    if (!password) {
      setFormError('Password is required');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      // Navigation will happen automatically via useEffect when user state updates
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code);
      setFormError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* App Logo/Name */}
        <View style={styles.header}>
          <Text style={[styles.appName, { color: colors.primary }]}>
            {APP_NAME}
          </Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>
            One Click Content Uploader
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.form}>
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
            onChangeText={setPassword}
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
            title="Login"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.loginButton}
          />
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, { color: colors.textSecondary }]}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup' as never)}>
            <Text style={[styles.signupLink, { color: colors.primary }]}>
              Sign up
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
    marginBottom: spacing.xl * 2,
  },
  appName: {
    ...textStyles.h1,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  tagline: {
    ...textStyles.body,
  },
  form: {
    marginBottom: spacing.lg,
  },
  loginButton: {
    marginTop: spacing.md,
  },
  errorText: {
    ...textStyles.small,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    ...textStyles.body,
  },
  signupLink: {
    ...textStyles.bodyBold,
  },
});
