import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store ,{authPersist} from './redux/Store.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from "react-redux"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={authPersist}>
        <App />
        </PersistGate>

    </Provider>
   
  </StrictMode>,
)
