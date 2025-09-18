import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ProviderWrapper } from './ContextAPI/createContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProviderWrapper>
    <App />
    </ProviderWrapper>
  </StrictMode>,
)
