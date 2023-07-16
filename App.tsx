import {store, persistor} from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import {AppRegistry} from "react-native";
import Init from "./src/screens/Init";

function App() {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Init/>
    </PersistGate>
  </Provider>
}




AppRegistry.registerComponent('root', () => App)
