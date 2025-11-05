# 📚 NCERT Reader

**NCERT Reader** is a modern, cross-platform educational application designed to make NCERT textbooks interactive, accessible, and visually engaging for students.
The project is built using **React (Vite)** for high performance, **TailwindCSS** for a sleek responsive UI, and **Capacitor + Expo** for cross-platform compatibility, allowing the app to run both on web and Android (as an `.apk` file).

---

## 🔍 Overview

This project serves as a **digital eBook platform** dedicated to NCERT content for classes VIII, X, and XII.
It enables students to browse, search, and read NCERT chapters directly within a clean, distraction-free interface. The app incorporates **math rendering**, **dark/light themes**, and **interactive SVG diagrams** to make learning more intuitive and visually appealing.

The aim of the project is to demonstrate:

* End-to-end modern React development workflow.
* Conversion of a web app into a mobile app using Capacitor.
* UI/UX focus for educational interfaces.

---

## 🎯 Objectives

* Provide a **structured e-learning experience** for NCERT material.
* Demonstrate **progressive web technology integration**.
* Showcase **math and science visualizations** within readable chapters.
* Generate a **fully installable Android APK** for offline access and academic demonstration.

---

## 🚀 Features

* **📘 Dynamic Book Catalog** – Science, Maths, Physics, Chemistry, History, and more.
* **🌓 Theme Switching** – Smooth light/dark mode with persistence using localStorage.
* **🔎 Smart Search & Class Filter** – Quickly locate any textbook by name, subject, or class.
* **🧮 Math Rendering with KaTeX** – Equations and scientific formulas displayed in professional LaTeX format.
* **🧠 Built-in Illustrations** – Interactive SVG diagrams for concepts like circuits, cell structure, etc.
* **📑 Chapter Reader View** – Rich typography with scrollable layout and math-safe rendering.
* **📴 Offline Ready** – Once loaded, books and chapters remain cached for offline reading.
* **📱 Android Ready Build** – Seamlessly packaged via Capacitor, generating an installable `.apk` file.
* **💾 Local State Persistence** – Saves last opened book, chapter, and theme preferences.
* **⚡ Optimized for Performance** – Vite build system ensures fast load and low memory use.

---

## 🧠 Tech Stack

| Layer                      | Technology Used               | Purpose                             |
| -------------------------- | ----------------------------- | ----------------------------------- |
| **Frontend Framework**     | React (Vite)                  | Fast modular component rendering    |
| **Styling & Layout**       | Tailwind CSS                  | Utility-first responsive UI design  |
| **Rendering Engine**       | KaTeX                         | Mathematical formula support        |
| **Icons & UI Elements**    | Lucide React                  | Consistent iconography              |
| **Cross-Platform Wrapper** | Capacitor + Expo              | Convert web app to native Android   |
| **Build Tools**            | Gradle, Java 21 (Temurin JDK) | Android APK generation              |
| **Version Control**        | Git & GitHub                  | Source management and collaboration |

---

## 📂 Folder Structure

```
NCERTReader/
│
├── src/
│   ├── App.jsx                  # Core application logic
│   ├── components/              # Reusable UI elements
│   ├── assets/                  # Icons, logos, images
│   └── styles/                  # Tailwind and CSS configs
│
├── android/                     # Capacitor Android project files
│   ├── app/                     # App-level build scripts
│   └── build/                   # APK output location
│
├── dist/                        # Production build (after npm run build)
├── package.json                 # Dependencies and scripts
├── capacitor.config.ts          # Capacitor configuration
└── vite.config.js               # Vite configuration for builds
```

---

## ⚙️ Setup & Build Instructions

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run locally (for web preview)

```bash
npm run dev
```

### 3️⃣ Build for production

```bash
npm run build
```

### 4️⃣ Add Android platform

```bash
npx cap add android
```

### 5️⃣ Copy built assets into Android project

```bash
npx cap copy
```

### 6️⃣ Build the Android app

```bash
cd android
gradlew.bat assembleDebug
```

📦 Output:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📱 Installing the APK

1. Locate the built file:

   ```
   NCERTReader/android/app/build/outputs/apk/debug/app-debug.apk
   ```
2. Transfer it to your Android device (via USB or cloud).
3. Enable **Install from Unknown Sources** in your device settings.
4. Tap the APK file to install.
5. The app will appear as **NCERT Reader** on your home screen.

---

## 🧰 Additional Developer Notes

* Tested with **Node v18+** and **Java JDK 21 (Temurin)**.
* Requires **Android SDK (API Level 34)** installed for Gradle builds.
* Supports **offline caching**, **theme persistence**, and **state restoration**.
* App structure is designed to be **extendable** — more NCERT classes or subjects can be added easily.

---

## 🧾 License & Usage

This project is created solely for **academic and demonstration purposes**.
All NCERT textbook material is © NCERT, Government of India.
The app code is open for educational and non-commercial reuse under a permissive license.

---

## 👤 Author & Developer

**Abhinav Shukla**
📍 Delhi, India
🎓 B.Tech (Computer Science & Engineering)
💻 GitHub: [shuklaAI](https://github.com/shuklaAI)
📧 Contact: *available on GitHub profile*

---

## 🌟 Project Vision

The goal of **NCERT Reader** is to modernize traditional textbook learning using open web technologies.
By merging **React’s component-driven architecture** with **Capacitor’s native build tools**, this project proves how lightweight web applications can evolve into fully functional mobile apps — deployable, interactive, and offline-accessible — without depending on heavy native codebases.
