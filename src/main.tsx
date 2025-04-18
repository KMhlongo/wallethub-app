import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Routes, Route} from 'react-router'
import { WalletProvider } from './context/wallet-context.tsx'
import DashBoardPage from './pages/dashboard-page/index.tsx'
import LandingPage from './pages/landing-page/index.tsx'
import SwapPage from './pages/swap-page/index.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/home' element={<LandingPage />}/>
          <Route path='/dashboard' element={<DashBoardPage />}/>
          <Route path='/swap' element={<SwapPage />}/>
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  </StrictMode>
)
