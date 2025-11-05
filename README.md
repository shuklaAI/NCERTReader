# AutoPostify – One Click Content Uploader

**AutoPostify** is a powerful yet simple content management mobile app designed to save time and streamline your social media workflow. With a clean and intuitive interface, AutoPostify allows you to upload your content once and manage it across multiple platforms like YouTube, Instagram, and Facebook – all from a single dashboard.

---

## Features

### 🎨 Simple and Intuitive UI
- **Modern, minimalistic interface** makes navigation effortless
- Login/Sign-Up with email and password authentication
- Clean dashboard showing your uploaded content in a list view with captions and selected platforms

### 📤 Upload Content with Ease
- Select images or videos directly from your device
- Add captions (up to 500 characters)
- Choose platforms (YouTube, Instagram, Facebook) to post
- Files are securely stored in Firebase Storage

### ⚡ Immediate Upload & Management
- Upload content instantly with progress tracking
- Keep track of all your uploads in one place
- Each post displays the caption, platforms, and timestamp

### 🔒 Secure Authentication & Database
- Firebase Authentication ensures secure login and user management
- Firebase Firestore stores metadata for each post
- Firebase Storage for secure file storage

### 🎯 User Tiers
- **Basic (Free)**: 10MB image limit, 100MB video limit
- **Premium**: Unlimited file size uploads (payment integration coming soon)

### 🌓 Light & Dark Mode
- Toggle between light and dark themes
- Preference persists across app restarts

---
###Screenshot
1. Login Screen
<img width="958" height="638" alt="image" src="https://github.com/user-attachments/assets/6c1b9024-bd63-4483-95f6-76f35ed789b2" />
Login Screen

Clean, centered layout with app branding
Email and password inputs
Primary blue login button
Link to signup at bottom
<img width="966" height="639" alt="image" src="https://github.com/user-attachments/assets/e4892d3f-103e-496f-ac0c-0e1a43f6e313" />
Login Screen Dark

Dark background (#111827)
Lighter blue primary (#3b82f6)
Dark gray inputs (#1f2937)
White text on dark background

2. Signup Screen
<img width="960" height="641" alt="image" src="https://github.com/user-attachments/assets/5c91d4ec-cbee-440f-adf7-5ea0fef4c942" />
Signup Screen

"Create Account" header
Optional display name field
Email and password inputs
Sign up button
Link back to login
<img width="955" height="638" alt="image" src="https://github.com/user-attachments/assets/c271347a-f183-47a7-b949-a10e094937ba" />
Signup Screen Dark

Same dark theme consistency
All inputs styled for dark mode
Readable text contrast

3. Home Screen (Dashboard)
<img width="962" height="646" alt="image" src="https://github.com/user-attachments/assets/8585ab60-75a8-4a87-960e-f4fb9cb56813" />
Home Screen

"My Posts" header with user email
Post cards showing:
Image/video preview
Caption (2 lines max)
Platform badges (YouTube, Instagram, Facebook)
Relative timestamp
Bottom tab navigation (Home, Upload, Profile)
<img width="951" height="637" alt="image" src="https://github.com/user-attachments/assets/9ef1a0e7-2e11-4763-89d6-b5f1a306667e" />
Home Screen Dark

Dark post cards (#1f2937)
White text for captions
Platform badges remain vibrant
Dark bottom navigation

4. Upload Screen
<img width="962" height="644" alt="image" src="https://github.com/user-attachments/assets/2e1da753-7309-4bda-924c-9c1e40408c82" />
Upload Screen

File picker with dashed border
Caption textarea with character counter (0/500)
Platform selection checkboxes
Upload button (disabled until file selected)
Bottom tab navigation

<img width="964" height="631" alt="image" src="https://github.com/user-attachments/assets/8e0981a2-0fc4-4b2f-ab79-bb315ec8f0b0" />
Upload Screen Dark

Dark file picker area
Dark textarea with light text
Platform checkboxes with dark background
Blue accent for selected items

5. Profile Screen
<img width="965" height="634" alt="image" src="https://github.com/user-attachments/assets/fb1a4ccd-4d71-43c4-8fd0-87087979a9d3" />
Profile Screen

User info with tier badge (Basic/Premium)
Dark mode toggle switch
Premium upgrade section with benefits list
Logout button
Bottom tab navigation

<img width="961" height="636" alt="image" src="https://github.com/user-attachments/assets/a91669f2-0ea5-4fe7-b522-8e104959d154" />
Profile Screen Dark

Dark sections with rounded cards
Toggle switch showing ON state (dark mode active)
Premium section with dark styling
Secondary button with border style

## Tech Stack

- **Frontend**: React Native (TypeScript)
- **Authentication**: Firebase Authentication
- **Storage**: Firebase Storage
- **Database**: Firebase Firestore
- **State Management**: React Context API
- **Navigation**: React Navigation (Stack + Bottom Tabs)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **React Native CLI** or **Expo CLI** (if using Expo)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **Firebase Account** (https://console.firebase.google.com)

---

## Setup Instructions

### 1. Clone the Repository

```bash
cd Autopostify
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new Firebase project
3. Enable **Authentication** with Email/Password provider
4. Create a **Firestore Database** (start in test mode)
5. Create a **Storage Bucket** with default rules
6. Register a **Web App** in your Firebase project
7. Copy the Firebase configuration

### 4. Set Up Environment Variables

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Open `.env` and replace the placeholder values with your Firebase configuration:

```
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### 5. Configure Firestore Security Rules

In Firebase Console, go to Firestore Database → Rules and add:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Posts collection
    match /posts/{postId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

### 6. Configure Storage Security Rules

In Firebase Console, go to Storage → Rules and add:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /posts/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 7. Configure Native Permissions

#### iOS (ios/Autopostify/Info.plist)

Add camera and photo library permissions:

```xml
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to take photos</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photo library to select images and videos</string>
```

#### Android (android/app/src/main/AndroidManifest.xml)

Add permissions:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### 8. Run the App

#### iOS

```bash
npm run ios
# or
npx react-native run-ios
```

#### Android

```bash
npm run android
# or
npx react-native run-android
```

---

## Usage

### 1. Sign Up / Login
- Open the app and create a new account with email and password
- Or login if you already have an account
- Stay logged in across app restarts

### 2. Upload Content
- Navigate to the **Upload** tab
- Tap to select an image or video from your device
- Add a caption (optional, max 500 characters)
- Select platforms (YouTube, Instagram, Facebook)
- Tap **Upload** to save your content

### 3. View Your Posts
- Navigate to the **Home** tab to see all your uploaded posts
- Pull down to refresh the list
- View post details including caption, platforms, and upload time

### 4. Manage Profile
- Navigate to the **Profile** tab
- Toggle between light and dark mode
- View your account tier (Basic or Premium)
- Logout when needed

---

## Project Structure

```
Autopostify/
├── src/
│   ├── App.tsx                  # Root component
│   ├── components/              # Reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── PostCard.tsx
│   │   └── PlatformBadge.tsx
│   ├── contexts/                # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── navigation/              # Navigation structure
│   │   ├── AuthNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   └── RootNavigator.tsx
│   ├── screens/                 # App screens
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── UploadScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── services/                # Firebase services
│   │   ├── firebase.ts
│   │   ├── authService.ts
│   │   ├── firestoreService.ts
│   │   └── storageService.ts
│   ├── theme/                   # Design system
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   └── typography.ts
│   ├── types/                   # TypeScript types
│   │   ├── index.ts
│   │   └── env.d.ts
│   └── utils/                   # Utility functions
│       ├── constants.ts
│       ├── formatters.ts
│       └── validation.ts
├── .env                         # Environment variables (not committed)
├── .env.example                 # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

---

## File Size Limits

### Basic Users (Free)
- Images: Maximum 10MB per file
- Videos: Maximum 100MB per file

### Premium Users (Paid)
- Images: No limit
- Videos: No limit

---

## MVP Limitations

This is an MVP (Minimum Viable Product) version. The following features are **NOT** included:

- ❌ Actual posting to social media APIs (platform selection is display-only)
- ❌ Payment processing for Premium tier upgrade
- ❌ Post scheduling
- ❌ Analytics/insights
- ❌ Edit or delete posts
- ❌ Push notifications

These features will be added in future releases.

---

## Troubleshooting

### Issue: App won't build

**Solution**:
- Clean install dependencies: `rm -rf node_modules && npm install`
- Clean build cache:
  - iOS: `cd ios && pod install && cd ..`
  - Android: `cd android && ./gradlew clean && cd ..`

### Issue: Firebase connection errors

**Solution**:
- Verify `.env` file has correct Firebase credentials
- Check Firebase project has Authentication, Firestore, and Storage enabled
- Ensure security rules are properly configured

### Issue: Image picker not working

**Solution**:
- Verify native permissions are added in Info.plist (iOS) and AndroidManifest.xml (Android)
- Rebuild the app after adding permissions

### Issue: Upload fails

**Solution**:
- Check internet connection
- Verify file size is within tier limits
- Ensure Firebase Storage rules allow authenticated uploads

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Support

If you encounter any issues or have questions:

- Create an issue in the GitHub repository
- Contact support (if available)

---

## Acknowledgments

- Built with React Native and Firebase
- Icons: Emoji icons for simplicity
- Inspired by social media management tools

---

**AutoPostify** - Simplifying content management, one upload at a time! 🚀
