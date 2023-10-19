import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDvVMhy-hME5v2CToUycvpA-8X5e8ubkls',
  authDomain: 'movieticket-bb94b.firebaseapp.com',
  projectId: 'movieticket-bb94b',
  storageBucket: 'movieticket-bb94b.appspot.com',
  messagingSenderId: '898118438010',
  appId: '1:898118438010:web:e25db2f3ac508caab17fc3',
};
firebase.initializeApp(firebaseConfig);
export default firebase;
