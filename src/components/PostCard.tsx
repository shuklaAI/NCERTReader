import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Post } from '../types';
import { PlatformBadge } from './PlatformBadge';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, borderRadius } from '../theme/spacing';
import { textStyles } from '../theme/typography';
import { formatPostTime } from '../utils/formatters';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      {/* Image/Video Preview */}
      <View style={styles.mediaContainer}>
        <Image
          source={{ uri: post.fileUrl }}
          style={styles.media}
          resizeMode="cover"
        />
        {post.fileType === 'video' && (
          <View style={styles.playIconOverlay}>
            <Text style={styles.playIcon}>▶️</Text>
          </View>
        )}
      </View>

      {/* Post Content */}
      <View style={styles.content}>
        {/* Caption */}
        {post.caption && (
          <Text
            style={[styles.caption, { color: colors.textPrimary }]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {post.caption}
          </Text>
        )}

        {/* Platform Badges */}
        <View style={styles.platformsContainer}>
          {post.platforms.map((platform) => (
            <PlatformBadge key={platform} platform={platform} />
          ))}
        </View>

        {/* Timestamp */}
        <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
          {formatPostTime(post.uploadedAt)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.medium,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  mediaContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'relative',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  playIconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playIcon: {
    fontSize: 48,
  },
  content: {
    padding: spacing.md,
  },
  caption: {
    ...textStyles.body,
    marginBottom: spacing.sm,
  },
  platformsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.xs,
  },
  timestamp: {
    ...textStyles.small,
  },
});
