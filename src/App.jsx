import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './router'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App