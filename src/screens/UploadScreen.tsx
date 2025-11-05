import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Platform } from '../types';
import { uploadFile } from '../services/storageService';
import { createPost } from '../services/firestoreService';
import { validateCaption, validateFileType, validateFileSize } from '../utils/validation';
import { formatFileSize } from '../utils/formatters';
import { spacing, borderRadius } from '../theme/spacing';
import { textStyles } from '../theme/typography';
import { CAPTION_MAX_LENGTH, SUPPORTED_IMAGE_TYPES, SUPPORTED_VIDEO_TYPES } from '../utils/constants';

export const UploadScreen: React.FC = () => {
  const { user, userProfile } = useAuth();
  const { colors } = useTheme();

  const [selectedFile, setSelectedFile] = useState<Asset | null>(null);
  const [caption, setCaption] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [captionError, setCaptionError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleSelectFile = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        quality: 1,
        selectionLimit: 1,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', 'Failed to select file');
        return;
      }

      const asset = result.assets?.[0];
      if (!asset) return;

      // Validate file type
      if (!validateFileType(asset.type || '')) {
        Alert.alert(
          'Unsupported File Type',
          'Please select JPG, PNG, MP4, or MOV files only.'
        );
        return;
      }

      // Validate file size based on user tier
      const tier = userProfile?.tier || 'basic';
      const fileSize = asset.fileSize || 0;
      const validation = validateFileSize(fileSize, asset.type || '', tier);

      if (!validation.isValid) {
        if (tier === 'basic') {
          setShowLimitModal(true);
        } else {
          Alert.alert('Error', validation.error || 'File size validation failed');
        }
        return;
      }

      setSelectedFile(asset);
    } catch (error) {
      Alert.alert('Error', 'Failed to select file');
    }
  };

  const togglePlatform = (platform: Platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user || selectedPlatforms.length === 0) {
      return;
    }

    // Validate caption
    const captionValidation = validateCaption(caption);
    if (captionValidation) {
      setCaptionError(captionValidation);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Upload file to Firebase Storage
      const fileUrl = await uploadFile(
        user.uid,
        selectedFile.uri!,
        selectedFile.fileName || 'file',
        (progress) => setUploadProgress(progress)
      );

      // Determine file type
      const fileType = SUPPORTED_IMAGE_TYPES.includes(selectedFile.type || '')
        ? 'image'
        : 'video';

      // Create post in Firestore
      await createPost(
        user.uid,
        caption,
        fileUrl,
        selectedFile.fileName || 'file',
        fileType,
        selectedFile.fileSize || 0,
        selectedPlatforms
      );

      Alert.alert('Success', 'Post uploaded successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setSelectedFile(null);
            setCaption('');
            setSelectedPlatforms([]);
            setUploadProgress(0);
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('Upload Failed', error.message || 'Please try again');
    } finally {
      setUploading(false);
    }
  };

  const isUploadDisabled =
    !selectedFile || selectedPlatforms.length === 0 || uploading || !!captionError;

  const charactersRemaining = CAPTION_MAX_LENGTH - caption.length;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: colors.textPrimary }]}>Upload Content</Text>

      {/* File Picker */}
      <TouchableOpacity
        style={[
          styles.filePicker,
          { borderColor: colors.border, backgroundColor: colors.surface },
          selectedFile && styles.filePickerWithFile,
        ]}
        onPress={handleSelectFile}
        disabled={uploading}
      >
        {selectedFile ? (
          <View style={styles.filePreview}>
            {selectedFile.type?.startsWith('image') ? (
              <Image source={{ uri: selectedFile.uri }} style={styles.previewImage} />
            ) : (
              <View style={styles.videoPreview}>
                <Text style={styles.videoIcon}>🎥</Text>
              </View>
            )}
            <Text style={[styles.fileName, { color: colors.textPrimary }]}>
              {selectedFile.fileName}
            </Text>
            <Text style={[styles.fileSize, { color: colors.textSecondary }]}>
              {formatFileSize(selectedFile.fileSize || 0)}
            </Text>
            {!uploading && (
              <Button title="Change" onPress={handleSelectFile} variant="secondary" />
            )}
          </View>
        ) : (
          <View style={styles.filePickerEmpty}>
            <Text style={styles.fileIcon}>📁</Text>
            <Text style={[styles.filePickerText, { color: colors.textSecondary }]}>
              Tap to select image or video
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Caption Input */}
      <Input
        label="Caption (Optional)"
        value={caption}
        onChangeText={(text) => {
          setCaption(text);
          setCaptionError(validateCaption(text));
        }}
        error={captionError}
        multiline
        numberOfLines={4}
        maxLength={CAPTION_MAX_LENGTH}
        placeholder="Add a caption..."
        editable={!uploading}
        style={styles.captionInput}
      />
      <Text
        style={[
          styles.characterCounter,
          { color: charactersRemaining < 0 ? colors.error : colors.textSecondary },
        ]}
      >
        {charactersRemaining} / {CAPTION_MAX_LENGTH}
      </Text>

      {/* Platform Selection */}
      <Text style={[styles.sectionLabel, { color: colors.textPrimary }]}>
        Select Platforms
      </Text>
      <View style={styles.platformsContainer}>
        {(['youtube', 'instagram', 'facebook'] as Platform[]).map((platform) => (
          <TouchableOpacity
            key={platform}
            style={[
              styles.platformCheckbox,
              { borderColor: colors.border, backgroundColor: colors.surface },
              selectedPlatforms.includes(platform) && {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => togglePlatform(platform)}
            disabled={uploading}
          >
            <Text
              style={[
                styles.platformText,
                { color: colors.textPrimary },
                selectedPlatforms.includes(platform) && { color: '#ffffff' },
              ]}
            >
              {platform === 'youtube' && '📺 YouTube'}
              {platform === 'instagram' && '📷 Instagram'}
              {platform === 'facebook' && '👤 Facebook'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Upload Progress */}
      {uploading && (
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                { width: `${uploadProgress}%`, backgroundColor: colors.primary },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            Uploading... {Math.round(uploadProgress)}%
          </Text>
        </View>
      )}

      {/* Upload Button */}
      <Button
        title={uploading ? 'Uploading...' : 'Upload'}
        onPress={handleUpload}
        disabled={isUploadDisabled}
        loading={uploading}
        style={styles.uploadButton}
      />

      {/* File Size Limit Modal */}
      <Modal visible={showLimitModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
              File Size Limit Exceeded
            </Text>
            <Text style={[styles.modalText, { color: colors.textSecondary }]}>
              Basic users can upload images up to 10MB and videos up to 100MB.
            </Text>
            <Button
              title="Upgrade to Premium"
              onPress={() => {
                setShowLimitModal(false);
                Alert.alert('Coming Soon', 'Payment integration will be added in a future update');
              }}
              style={styles.modalButton}
            />
            <Button
              title="Cancel"
              onPress={() => setShowLimitModal(false)}
              variant="secondary"
            />
          </View>
        </View>
      </Modal>
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
  filePicker: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    marginBottom: spacing.lg,
  },
  filePickerWithFile: {
    borderStyle: 'solid',
  },
  filePickerEmpty: {
    alignItems: 'center',
  },
  fileIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  filePickerText: {
    ...textStyles.body,
  },
  filePreview: {
    alignItems: 'center',
    width: '100%',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.small,
    marginBottom: spacing.md,
  },
  videoPreview: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.small,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  videoIcon: {
    fontSize: 64,
  },
  fileName: {
    ...textStyles.body,
    marginBottom: spacing.xs,
  },
  fileSize: {
    ...textStyles.small,
    marginBottom: spacing.md,
  },
  captionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  characterCounter: {
    ...textStyles.small,
    textAlign: 'right',
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    ...textStyles.bodyBold,
    marginBottom: spacing.sm,
  },
  platformsContainer: {
    marginBottom: spacing.lg,
  },
  platformCheckbox: {
    borderWidth: 1,
    borderRadius: borderRadius.small,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  platformText: {
    ...textStyles.body,
  },
  progressContainer: {
    marginBottom: spacing.lg,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    ...textStyles.small,
    textAlign: 'center',
  },
  uploadButton: {
    marginTop: spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
  },
  modalTitle: {
    ...textStyles.h2,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  modalText: {
    ...textStyles.body,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  modalButton: {
    marginBottom: spacing.sm,
  },
});
