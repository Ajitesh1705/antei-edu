# 📚 AI-Powered EdTech Platform

## 🚀 Project Overview
This is an AI-powered EdTech platform built using **Vite, React, ShadCN UI, TailwindCSS, and Firebase**. It features user authentication and an AI chatbot that is restricted to signed-in users.

## 🛠️ Technologies Used
- **Vite** - Fast build tool for React
- **React** - Frontend UI framework
- **ShadCN UI** - Pre-styled UI components
- **TailwindCSS** - Utility-first CSS framework
- **React Router DOM** - For navigation and routing
- **Firebase** - Authentication & database
- **OpenRouter API** - AI-powered chatbot responses

## 📂 Project Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Ajitesh1705/antei-edu.git
cd antei-edu
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following:

```
# Firebase Credentials
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# OpenRouter API Key
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```

Replace `your_firebase_*` and `your_openrouter_api_key` with actual values.

### 4️⃣ Run the Development Server
```sh
npm run dev
```
The app will be available at `http://localhost:5173/`.

## 🔐 Authentication & Chatbot Restriction
- The chatbot is **only accessible to signed-in users**.
- Unauthenticated users trying to access it will be **redirected to the login page**.


## 🛠️ Features
✅ **User Authentication** via Firebase
✅ **Protected Routes** (Chatbot access only for signed-in users)
✅ **AI Chatbot** powered by OpenRouter API
✅ **Modern UI** using ShadCN and TailwindCSS
✅ **Fast & Optimized** with Vite

---

📌 **Future Improvements**:
- Add more AI-powered educational tools
- Integrate real-time chat history storage
- Add file upload feature for various formats like pdf, csv, json etc.





