import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAwI2qUg96PVmoYBf5T4B7o_ncggVK-89I',
  authDomain: 'lanspire.firebaseapp.com',
  projectId: 'lanspire',
  storageBucket: 'lanspire.appspot.com',
  messagingSenderId: '918840591441',
  appId: '1:918840591441:web:63fa3355ccaa8fd452e470',
  measurementId: 'G-ZH6CQ6Q5YJ',
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage, analytics, app };
