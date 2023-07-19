import store from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import Init from "./src/screens/Init";
import {persistStore} from 'redux-persist'
import {QueryClient, QueryClientProvider} from 'react-query'

function App() {
    const queryClient = new QueryClient()

    const persistor = persistStore(store)


    return <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <PersistGate loading={null} persistor={persistor}>
                <Init/>
            </PersistGate>
        </QueryClientProvider>
    </Provider>
}

export default App
