import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as React from 'react';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainStack from './src/navigation/MainStack';
import {persistor, store} from '@redux/store/store';
import {ThemeProvider} from '@context/ThemeContext';
function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyCPpy6PYeVNix3Y9c0Ls5SwLXGlL5DzUa4',
    authDomain: 'movieticket-ecfc5.firebaseapp.com',
    projectId: 'movieticket-ecfc5',
    storageBucket: 'movieticket-ecfc5.appspot.com',
    messagingSenderId: '1007448895236',
    appId: '1:1007448895236:web:73df0d94c46ec2fa59ea51',
  };
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainStack />
        </PersistGate>
        <Toast />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
