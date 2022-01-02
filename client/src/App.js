import React from "react"
import Signup from "./components/Signup"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
function App() {
  return (
    <Router>
      <AuthProvider>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App