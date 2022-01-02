import React, { useState } from "react"
import { Card, Button, Modal, Toast, ToastContainer } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import Axios from "axios"

export default function Appointment() {
  const { currentUser } = useAuth()
  const [doctor,setDoctor]=useState("Dr. Ramesh Mahajan")
  const [date,setDate]=useState("")
  const [timeSlots,setTimeSlots]=useState()
  const [selectedTimeSlot,setSelectedTimeSlot]=useState("9:00 am")
  const [showToast, setShowToast]=useState(false)
  const [message, setMessage]=useState("")
  const [show, setShow] = useState(false);
  const timeslotsArray=['9:00 am', '10:00 am', '11:00 am', '12:00 noon', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm']

  const handleClose = () => setShow(false)
  const hideToast=()=> setShowToast(false)
  
  async function handleFindSlots() {
    if(date==="")
    {
      setMessage("Please select date for appointment")
      setShowToast(true)
      return
    }
    try{
        await Axios.get(`http://localhost:3001/check/?doctor=${doctor}&date=${date}`).then((response)=>{
        console.log(response.data);
        setTimeSlots(response.data)
        setShow(true)
    })
    }
    catch(err)
    {
      setShow(false)
    }
    
  }

  async function handleBookSlot() {
    try{
        await Axios.post(`http://localhost:3001/book`,{user:currentUser?.email, doctor:doctor, date:date, time:selectedTimeSlot})
        setMessage("Appointment successfully booked")
        setShowToast(true)
        setShow(false)
    }
    catch(err)
    {
        console.log(err);
    }
    
  }

  return (
    <>
      <Card id="book">
        <Card.Body>
          <h3 className="text-center mb-4 heading">Book Appointment slots</h3>
          <div className="book-container">
          <div className="columns">
            <h6>Select Doctor:</h6>
            <select className="form-select mb-2 inputs" aria-label="Default select example" onChange={(event) => {
             setDoctor(event.target.value);
             }}>
            <option selected value="Dr. Ramesh Mahajan">Dr. Ramesh Mahajan</option>
            </select>
          </div>
          <div className="columns">
            <h6>Select date:</h6>
            <input type="date" name="date" id="date" className="inputs" onChange={(event) => {
              setDate(event.target.value);
            }}/>
          </div>
          </div>
        </Card.Body>
        <div className="w-100 text-center mt-2">
        <Button onClick={handleFindSlots} className="m-3">
         Check appointment slots
        </Button>
      </div>
      </Card>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Select appointment slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <select className="form-select" aria-label="Default select example" onChange={(event) => {
            setSelectedTimeSlot(event.target.value);
          }}>
              {
                  timeslotsArray.map((data)=>{
                    return <option value={data} disabled={timeSlots?.includes(data)?true:false}>{data}</option>
                  }
                  )
              }
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleBookSlot}>
            Book appointment
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer className="p-3 toastContainer">
      <Toast show={showToast} onClose={hideToast}  >
          <Toast.Header className="toast-header">
            <strong className="me-auto">Attention !</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}