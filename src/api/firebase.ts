import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat';
import 'firebase/compat/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyBW88X-VvkKGnJR_lIU0xWhpTDzETCoY9w',
  authDomain: 'movieticket-81018.firebaseapp.com',
  projectId: 'movieticket-81018',
  storageBucket: 'movieticket-81018.appspot.com',
  messagingSenderId: '916918626102',
  appId: '1:916918626102:web:394870dc99baadf5d0f597',
};
firebase.initializeApp(firebaseConfig);
export default firebase;
