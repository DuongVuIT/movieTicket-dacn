import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat';
import 'firebase/compat/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyCPpy6PYeVNix3Y9c0Ls5SwLXGlL5DzUa4',
  authDomain: 'movieticket-ecfc5.firebaseapp.com',
  projectId: 'movieticket-ecfc5',
  storageBucket: 'movieticket-ecfc5.appspot.com',
  messagingSenderId: '1007448895236',
  appId: '1:1007448895236:web:73df0d94c46ec2fa59ea51',
};
firebase.initializeApp(firebaseConfig);
export default firebase;
