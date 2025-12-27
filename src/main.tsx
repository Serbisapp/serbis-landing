
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Maintain a consistent white background even during overscroll bounce
const pageBgColor = '#ffffff';
document.documentElement.style.backgroundColor = pageBgColor;
document.body.style.backgroundColor = pageBgColor;

createRoot(document.getElementById("root")!).render(<App />);
