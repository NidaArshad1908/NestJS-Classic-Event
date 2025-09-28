// src/firebase/firebase-admin.ts
import * as admin from 'firebase-admin';

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT || null;

if (!admin.apps.length) {
  if (serviceAccountString) {
    const serviceAccount = JSON.parse(
      serviceAccountString,
    ) as admin.ServiceAccount;
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    admin.initializeApp();
  }
}

export default admin;
