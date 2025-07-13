import admin from "firebase-admin";
import { getApps, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { Firestore, getFirestore } from "firebase-admin/firestore";

const serviceAccount = {
  type: process.env.FIREBASE_SERVICE_ACCOUNT_TYPE!,
  project_id: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID!,
  private_key_id: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID!,
  private_key: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY!,
  client_email: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL!,
  client_id: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID!,
  auth_uri: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI!,
  token_uri: process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI!,
  auth_provider_x509_cert_url:
    process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL!,
  client_x509_cert_url:
    process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL!,
  universe_domain: process.env.FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN!,
};

let auth: Auth;
let firestore: Firestore;
const currentApps = getApps();

if (!currentApps.length) {
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
  auth = getAuth(app);
  firestore = getFirestore(app);
} else {
  const app = currentApps[0];
  auth = getAuth(app);
  firestore = getFirestore(app);
}

export { firestore, auth };
