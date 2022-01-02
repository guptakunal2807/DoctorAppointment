import React, { useState,useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import Appointment from "./appointment"
import Axios from"axios"
export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const [userAppointments,setUserAppointments]=useState()
  const navigate=useNavigate()
  useEffect(() => {
    if(currentUser == null)
    {
      navigate("/signup")
    }
    Axios.get(`http://localhost:3001/getAppointments?user=${currentUser?.email}`).then((result)=>{
      console.log(result.data[0].appointments);
      setUserAppointments(result.data[0].appointments)
    })
  }, [currentUser,navigate])

  async function handleLogout() {
    setError("")
    try {
      await logout()
      navigate("/login")
    } catch(err) {
        console.log(err);
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card className="p-0">
        <Card.Body className="banner">
          {error && <Alert variant="danger">{error}</Alert>}
          <h1 className="text-center mb-4 banner-heading">Welcome ! {currentUser?.email}</h1>
          <h5 className="banner-heading">Did you know, you can book an appointment in just some clicks ?</h5>
          <Button className="btn btn-primary mt-2" href="#book">Get started now</Button>
        </Card.Body>
        <h3 className="text-center mb-4 heading">Your Appointments</h3>
          {! userAppointments && <h6 className="appoitment-text">You don't have any appointments to show.</h6>}
          {userAppointments && userAppointments?.map((appointment)=>{
            return <div className="card m-3 myappointments" key={appointment?.date + appointment?.time}>
            <div className="card-body appointment">
              <h6 className="card-title">Doctor: {appointment?.doctor}</h6>
              <h6>Date: {appointment?.date}</h6>
              <h6>Time: {appointment?.time}</h6>
            </div>
          </div>
          })}
        <button onClick={handleLogout} className=" text-center m-3 position-absolute top-0 end-0 btn btn-primary btn-m">
          Log Out
        </button>
      </Card>
      <Appointment/>
    </>
  )
}