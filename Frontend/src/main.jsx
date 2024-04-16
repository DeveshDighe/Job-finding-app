import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './Context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import store from './Toolkit/Store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <AuthContext>
        <Provider store={store}>
        <App />
        </Provider>
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>,
)
