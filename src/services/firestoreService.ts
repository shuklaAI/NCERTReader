import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';
import { Post, Platform } from '../types';

// Add new post to Firestore
export const createPost = async (
  userId: string,
  caption: string,
  fileUrl: string,
  fileName: string,
  fileType: 'image' | 'video',
  fileSize: number,
  platforms: Platform[]
): Promise<string> => {
  try {
    const postData = {
      userId,
      caption,
      fileUrl,
      fileName,
      fileType,
      fileSize,
      platforms,
      status: 'uploaded' as const,
      uploadedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'posts'), postData);
    return docRef.id;
  } catch (error: any) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
};

// Fetch all posts for a user
export const getUserPosts = async (userId: string): Promise<Post[]> => {
  try {
    const q = query(
      collection(db, 'posts'),
      where('userId', '==', userId),
      orderBy('uploadedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);

    const posts: Post[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      id: doc.id,
      ...(doc.data() as Omit<Post, 'id'>),
    }));

    return posts;
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to load posts');
  }
};
