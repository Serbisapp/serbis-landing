
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set a global background color to prevent white flash on overscroll on mobile
const darkBgColor = '#020617'; // slate-950
document.documentElement.style.backgroundColor = darkBgColor;
document.body.style.backgroundColor = darkBgColor;

createRoot(document.getElementById("root")!).render(<App />);

