import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AllExamples from './AllExamples.jsx'

createRoot(document.getElementById('root')).render(
    <AllExamples/>
)
