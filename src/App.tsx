import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { RegistrationProvider } from '@/contexts/RegistrationContext.tsx'
import Home from '@/pages/Home.tsx'
import Registration from '@/pages/register/Registration'

function App() {
  return (
    <RegistrationProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/register/:userName"
            element={<Registration />}
          />
        </Routes>
      </Router>
    </RegistrationProvider>
  )
}

export default App
