import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import * as React from 'react';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainStack from './src/navigation/MainStack';
import {persistor, store} from '@redux/store/store';
import {ThemeProvider} from '@context/ThemeContext';
import {StripeProvider} from '@stripe/stripe-react-native';
function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyBW88X-VvkKGnJR_lIU0xWhpTDzETCoY9w',
    authDomain: 'movieticket-81018.firebaseapp.com',
    projectId: 'movieticket-81018',
    storageBucket: 'movieticket-81018.appspot.com',
    messagingSenderId: '916918626102',
    appId: '1:916918626102:web:394870dc99baadf5d0f597',
  };
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <StripeProvider publishableKey="pk_test_51OGlgLDc7mRy60skpnyRYgZzifhGsgF3r8WKN1M3XlFFLn1kNB0FtbbxuL0nQB93icUJCeU91ckfRRvq6Dutzirj00A5lmdrGG">
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainStack />
          </PersistGate>
          <Toast />
        </Provider>
      </ThemeProvider>
    </StripeProvider>
  );
}

export default App;
