import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './provider/userProvider.tsx'
import App from './App.tsx'
import { ThemeProvider } from './provider/themeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ThemeProvider>
    <UserProvider>
      <App />
    </UserProvider>
   </ThemeProvider>
  </StrictMode>,
)
