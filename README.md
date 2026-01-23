# EcoScan ♻️

EcoScan is a smart mobile application designed to help you recycle smarter. By simply pointing your camera at a waste item, EcoScan instantly identifies whether it is recyclable, compostable, or trash, helping you make eco-friendly decisions effortlessly.

## ✨ Features

- **Instant Waste Identification**: Uses advanced AI to classify waste items in real-time.
- **Smart Classification**: Distinguishes between recyclables, compost, and general trash.
- **Daily Eco-Tips**: Get daily advice on how to live a more sustainable lifestyle.
- **User-Friendly Interface**: Clean and intuitive design powered by NativeWind.

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)
- **AI/ML**: [Hugging Face Inference API](https://huggingface.co/inference-api) (using `google/vit-base-patch16-224`)
- **Language**: TypeScript

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js installed on your machine.
- [Expo Go](https://expo.dev/go) app installed on your physical device, or an Android/iOS emulator setup.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ecoscan.git
   cd ecoscan
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   This app requires a Hugging Face API key to perform image classification.
   - Create a file named `.env` in the root directory.
   - Add your Hugging Face API key:
     ```env
     EXPO_PUBLIC_HF_API_KEY=your_hugging_face_api_key_here
     ```

4. **Start the app**

   ```bash
   npx expo start
   ```

5. **Run on Device**
   - Scan the QR code with your phone's camera (if using Expo Go).
   - Or press `a` for Android Emulator / `i` for iOS Simulator.

## 📂 Project Structure

```
ecoscan/
├── app/                 # Application source code & routes
│   ├── index.tsx        # Home screen
│   ├── scan.tsx         # Camera scanning screen
│   ├── result.tsx       # Result display screen
│   └── ...
├── components/          # Reusable UI components
├── assets/              # Images and icons
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
