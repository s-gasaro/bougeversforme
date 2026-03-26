import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './styles/global.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)