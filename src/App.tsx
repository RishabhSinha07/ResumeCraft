import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import BuilderPage from './pages/BuilderPage'
import { Analytics } from '@vercel/analytics/react';
import { MainLayout } from './components/MainLayout'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/builder" element={<BuilderPage />} />
        </Routes>
      </MainLayout>
      <Analytics />
    </BrowserRouter>
  )
}

export default App
