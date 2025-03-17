import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  throw new Error("❌ FIREBASE_SERVICE_ACCOUNT_KEY is missing in .env file");
}


const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized: No token" });

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
