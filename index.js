// index.js (or App entry point)
import './gesture-handler';  // Initialize gesture handler if you are using it
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import { name as appName } from './app.json';
import store, { persistor } from './src/redux/configureStore'; // Ensure your store and persistor are correctly imported
import App from './App';

// Main component with redux and persistence
const Main = () => (
  <Provider store={store}> 
    <PersistGate persistor={persistor}> 
      <App /> 
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Main); // Register the Main component
