import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LandingPage from './pages/landingPage/index.tsx'
import WalletHome from './pages/walletHome/index.tsx'
import {BrowserRouter, Routes, Route} from 'react-router'
import { WalletProvider } from './context/wallet-context.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/landing' element={<LandingPage />}/>
          <Route path='/dashboard' element={<WalletHome />}/>
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  </StrictMode>
)
