import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@cyntler/react-doc-viewer/dist/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
