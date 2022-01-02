import React, { useRef, useState,useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
  const { signup, logout, currentUser } = useAuth()
  const navigate = useNavigate();
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [email,setEmail]=useState("")
  const [pass,setpass]=useState("")
  const [passcheck,setpasscheck]=useState("")
  useEffect(() => {
    if(currentUser != null)
    {
      navigate("/")
    }
  }, [currentUser,navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    if (pass !== passcheck) {
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      await signup(email,pass)
      await logout()
      navigate("/login")
    } catch(err) {
      setError("Could not create account")
    }
    setLoading(false)
  }
  return (
    <>
    <div className="sign-up">
      <Card className="sign-up-card p-2">
        <Card.Body>
          <h4 className="text-center mb-4">Register User</h4>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} placeholder="Enter e-mail" onChange={(event) => {
            setEmail(event.target.value);
          }}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"  required ref={passwordRef} placeholder="Enter password" onChange={(event) => {
            setpass(event.target.value);
          }}/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password"  required ref={passwordConfirmRef} placeholder="Re-enter password"  onChange={(event) => {
            setpasscheck(event.target.value);
          }}/>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
      </div>
    </>
  )
}