// In App.js in a new project
import {persistor, store} from '@store/store';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainStack from './src/navigation/MainStack';
function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyB89X3sWgSJCNnSU-o-bo-KiXUYUaZJO8k',
    authDomain: 'movieticket-befc8.firebaseapp.com',
    databaseURL: 'https://movieticket-befc8-default-rtdb.firebaseio.com',
    projectId: 'movieticket-befc8',
    storageBucket: 'movieticket-befc8.appspot.com',
    messagingSenderId: '10166869724',
    appId: '1:10166869724:web:06270daae182fb4e221e19',
  };
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainStack />
      </PersistGate>
    </Provider>
  );
}

export default App;
