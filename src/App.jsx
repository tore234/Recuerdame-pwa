import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { BirthdaysProvider } from './context/BirthdaysContext'
import Layout       from './components/Layout'
import Dashboard    from './pages/Dashboard'
import AddBirthday  from './pages/AddBirthday'
import EditBirthday from './pages/EditBirthday'
import Settings     from './pages/Settings'

export default function App() {
  return (
    <BirthdaysProvider>
      <BrowserRouter>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#fff',
              border: '2px solid #1A0A2E',
              borderRadius: 0,
              boxShadow: '4px 4px 0 #1A0A2E',
              fontFamily: 'monospace',
              color: '#1A0A2E',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
            },
            cancelButtonStyle: {
              background: 'transparent',
              border: '1.5px solid #1A0A2E',
              borderRadius: 0,
              color: '#1A0A2E',
              fontFamily: 'monospace',
              cursor: 'pointer',
            },
            actionButtonStyle: {
              background: '#E91E63',
              border: '1.5px solid #880E4F',
              borderRadius: 0,
              color: '#fff',
              fontFamily: 'monospace',
              boxShadow: '2px 2px 0 #880E4F',
              cursor: 'pointer',
            },
          }}
        />
        <Routes>
          <Route path="/" element={
            <Layout><Dashboard /></Layout>
          } />
          <Route path="/add" element={
            <Layout><AddBirthday /></Layout>
          } />
          <Route path="/edit/:id" element={
            <Layout><EditBirthday /></Layout>
          } />
          <Route path="/settings" element={
            <Layout><Settings /></Layout>
          } />
        </Routes>
      </BrowserRouter>
    </BirthdaysProvider>
  )
}
