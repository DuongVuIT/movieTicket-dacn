import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as React from 'react';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainStack from './src/navigation/MainStack';
import {persistor, store} from '@redux/store/store';
function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyDvVMhy-hME5v2CToUycvpA-8X5e8ubkls',
    authDomain: 'movieticket-bb94b.firebaseapp.com',
    projectId: 'movieticket-bb94b',
    storageBucket: 'movieticket-bb94b.appspot.com',
    messagingSenderId: '898118438010',
    appId: '1:898118438010:web:e25db2f3ac508caab17fc3',
  };
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainStack />
      </PersistGate>
      <Toast />
    </Provider>
  );
}

export default App;
