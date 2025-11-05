import { ref, uploadBytesResumable, getDownloadURL, UploadTask } from 'firebase/storage';
import { storage } from './firebase';
import { STORAGE_PATHS } from '../utils/constants';

// Upload file to Firebase Storage
export const uploadFile = async (
  userId: string,
  uri: string,
  fileName: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    // Fetch the file from local URI
    const response = await fetch(uri);
    const blob = await response.blob();

    // Create storage reference
    const timestamp = Date.now();
    const storageRef = ref(storage, `${STORAGE_PATHS.posts}/${userId}/${timestamp}_${fileName}`);

    // Upload file with progress tracking
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Track upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          // Handle upload errors
          console.error('Upload error:', error);
          reject(new Error('Upload failed. Please check your connection and try again.'));
        },
        async () => {
          // Upload completed successfully, get download URL
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(new Error('Failed to get download URL'));
          }
        }
      );
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error('Upload failed. Please check your connection and try again.');
  }
};
