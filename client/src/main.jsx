import React from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/eczar/500.css'
import '@fontsource/eczar/600.css'
import '@fontsource/eczar/700.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/400-italic.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import './styles.css'

import App from './App'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
