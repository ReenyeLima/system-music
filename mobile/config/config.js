import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORATE_BUCKET, MESSAGIN_SENDER_ID, APP_ID, CLIENT_ID, CLIENT_IOS_ID } from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORATE_BUCKET,
  messagingSenderId: MESSAGIN_SENDER_ID,
  appId: APP_ID,
}

const configAuth = {
  client_id: CLIENT_ID,
  client_ios_id: CLIENT_IOS_ID,
}

export default {
  configAuth,
  firebaseConfig
}