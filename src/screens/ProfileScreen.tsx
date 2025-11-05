import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/Button';
import { spacing, borderRadius } from '../theme/spacing';
import { textStyles } from '../theme/typography';
import { tierColors } from '../theme/colors';

export const ProfileScreen: React.FC = () => {
  const { user, userProfile, logout } = useAuth();
  const { theme, colors, toggleTheme } = useTheme();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          setLoggingOut(true);
          try {
            await logout();
          } catch (error) {
            Alert.alert('Error', 'Failed to logout. Please try again.');
          } finally {
            setLoggingOut(false);
          }
        },
      },
    ]);
  };

  const handleUpgrade = () => {
    Alert.alert(
      'Coming Soon',
      'Payment integration will be added in a future update. Premium features include unlimited file uploads and more!'
    );
  };

  const tier = userProfile?.tier || 'basic';
  const isPremium = tier === 'premium';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: colors.textPrimary }]}>Profile</Text>

      {/* User Info Section */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.userName, { color: colors.textPrimary }]}>
          {userProfile?.displayName || 'User'}
        </Text>
        <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
          {userProfile?.email || user?.email}
        </Text>

        {/* Tier Badge */}
        <View
          style={[
            styles.tierBadge,
            { backgroundColor: isPremium ? tierColors.premium : tierColors.basic },
          ]}
        >
          <Text style={styles.tierText}>{isPremium ? 'Premium' : 'Basic'}</Text>
        </View>
      </View>

      {/* Settings Section */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Settings</Text>

        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Dark Mode</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#ffffff"
          />
        </View>
      </View>

      {/* Premium Section */}
      {!isPremium && (
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Upgrade to Premium
          </Text>
          <Text style={[styles.premiumText, { color: colors.textSecondary }]}>
            Unlock premium features:
          </Text>
          <View style={styles.benefitsList}>
            <Text style={[styles.benefit, { color: colors.textPrimary }]}>
              ✓ Unlimited file size uploads
            </Text>
            <Text style={[styles.benefit, { color: colors.textPrimary }]}>
              ✓ Advanced analytics (coming soon)
            </Text>
            <Text style={[styles.benefit, { color: colors.textPrimary }]}>
              ✓ Scheduled posting (coming soon)
            </Text>
          </View>
          <Button title="Upgrade to Premium" onPress={handleUpgrade} />
        </View>
      )}

      {/* Premium Member Section */}
      {isPremium && (
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text
            style={[styles.sectionTitle, { color: tierColors.premium }]}
          >
            Premium Member
          </Text>
          <Text style={[styles.premiumText, { color: colors.textSecondary }]}>
            You have access to all premium features:
          </Text>
          <View style={styles.benefitsList}>
            <Text style={[styles.benefit, { color: colors.success }]}>
              ✓ Unlimited file size uploads
            </Text>
            <Text style={[styles.benefit, { color: colors.success }]}>
              ✓ Advanced analytics (coming soon)
            </Text>
            <Text style={[styles.benefit, { color: colors.success }]}>
              ✓ Scheduled posting (coming soon)
            </Text>
          </View>
        </View>
      )}

      {/* Logout Button */}
      <Button
        title="Logout"
        onPress={handleLogout}
        variant="secondary"
        loading={loggingOut}
        disabled={loggingOut}
        style={styles.logoutButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    ...textStyles.h1,
    marginBottom: spacing.lg,
  },
  section: {
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  userName: {
    ...textStyles.h2,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...textStyles.body,
    marginBottom: spacing.md,
  },
  tierBadge: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm + spacing.xs,
    borderRadius: borderRadius.small,
  },
  tierText: {
    ...textStyles.small,
    color: '#ffffff',
    fontWeight: '600',
  },
  sectionTitle: {
    ...textStyles.h3,
    marginBottom: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    ...textStyles.body,
  },
  premiumText: {
    ...textStyles.body,
    marginBottom: spacing.md,
  },
  benefitsList: {
    marginBottom: spacing.md,
  },
  benefit: {
    ...textStyles.body,
    marginBottom: spacing.xs,
  },
  logoutButton: {
    marginTop: spacing.md,
  },
});
