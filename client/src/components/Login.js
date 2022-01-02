import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [email,setEmail]=useState("")
  const [pass,setpass]=useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    if(currentUser != null)
    {
      navigate("/")
    }
  }, [currentUser,navigate])
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(email, pass)
      navigate("/")
    } catch(err) {
      setError("Failed to log in")
    }
    setLoading(false)
  }

  return (
    <>
    <div className="sign-up">
      <Card className="sign-up-card p-2">
        <Card.Body>
          <h4 className="text-center mb-4">Log In</h4>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required placeholder="Enter e-mail" onChange={(event) => {
            setEmail(event.target.value);
          }}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required placeholder="Enter password" onChange={(event) => {
            setpass(event.target.value);
          }}/>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
      </div>
    </>
  )
}