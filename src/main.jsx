import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// react-router
import { HashRouter } from 'react-router-dom'
// Redux
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
)
