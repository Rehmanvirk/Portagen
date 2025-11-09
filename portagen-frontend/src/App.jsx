import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { Templates } from './pages/Templates'
import { CreatePortfolio } from './pages/CreatePortfolio'
import { EditPortfolio } from './pages/EditPortfolio'
import { PreviewPortfolio } from './pages/PreviewPortfolio'
import { Pricing } from './pages/Pricing'
import { About } from './pages/About'
import { Contact } from './pages/Contact'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="templates" element={<Templates />} />
        
        <Route path="login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        
        <Route path="register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="portfolio/create" element={
          <ProtectedRoute>
            <CreatePortfolio />
          </ProtectedRoute>
        } />
        
        <Route path="portfolio/edit/:id" element={
          <ProtectedRoute>
            <EditPortfolio />
          </ProtectedRoute>
        } />
        
        <Route path="portfolio/preview/:id" element={
          <ProtectedRoute>
            <PreviewPortfolio />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  )
}

export default App