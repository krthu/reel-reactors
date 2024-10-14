import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter as Router} from 'react-router-dom'

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './features/rootReducer';
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: rootReducer,
});

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store} >
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
)
