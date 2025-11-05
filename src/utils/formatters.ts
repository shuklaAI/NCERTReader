import { formatDistanceToNow, format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

// Format file size from bytes to readable format
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

// Convert Firebase Timestamp to Date
export const timestampToDate = (timestamp: Date | Timestamp): Date => {
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return timestamp.toDate();
};

// Format timestamp to relative time (e.g., "2 hours ago", "Yesterday")
export const formatRelativeTime = (timestamp: Date | Timestamp): string => {
  const date = timestampToDate(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
};

// Format timestamp to absolute date (e.g., "Jan 15, 2025")
export const formatAbsoluteDate = (timestamp: Date | Timestamp): string => {
  const date = timestampToDate(timestamp);
  return format(date, 'MMM d, yyyy');
};

// Format timestamp for display in posts
// Shows relative time if recent, otherwise shows date
export const formatPostTime = (timestamp: Date | Timestamp): string => {
  const date = timestampToDate(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  // If less than 24 hours, show relative time
  if (diffInHours < 24) {
    return formatRelativeTime(timestamp);
  }

  // If less than 7 days, show day name (e.g., "Yesterday", "Monday")
  if (diffInHours < 24 * 7) {
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return 'Yesterday';
    }
    return format(date, 'EEEE'); // Day name
  }

  // Otherwise show date
  return formatAbsoluteDate(timestamp);
};
