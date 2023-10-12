import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB89X3sWgSJCNnSU-o-bo-KiXUYUaZJO8k',
  authDomain: 'movieticket-befc8.firebaseapp.com',
  databaseURL: 'https://movieticket-befc8-default-rtdb.firebaseio.com',
  projectId: 'movieticket-befc8',
  storageBucket: 'movieticket-befc8.appspot.com',
  messagingSenderId: '10166869724',
  appId: '1:10166869724:web:06270daae182fb4e221e19',
};

firebase.initializeApp(firebaseConfig);
export default firebase;
