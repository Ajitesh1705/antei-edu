import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  throw new Error("❌ FIREBASE_ADMIN_SDK_JSON is not defined in .env file");
}


const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

