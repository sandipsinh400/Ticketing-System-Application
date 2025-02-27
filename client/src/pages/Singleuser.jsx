
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Dropdown, Button, Container, Row, Col, Card, Form } from "react-bootstrap";

const Singleuser = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://ticketing-system-application.onrender.com/api/ticket/${id}`)
      .then(response => {
        console.log(response.data);
        setUser(response.data);

        
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date; // Difference in milliseconds
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin} min ago`;
    if (diffHour < 24) return `${diffHour} hours ago`;
    if (diffDay === 1) return "Yesterday";
    
    return date.toLocaleString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    });
};

  return (
    <>
     <Container className="mt-4">
      <h4>Tickets</h4>
      <p>Manage Tickets - View Ticket</p>

      {/* Ticket Info */}
      <Card className="p-3 shadow-sm">
        <Row className="mb-2">
          <Col><strong>TICKET ID</strong></Col>
          <Col><strong>CATEGORY</strong></Col>
          <Col><strong>SUB-CATEGORY</strong></Col>
          <Col><strong>GROUP</strong></Col>
          <Col><strong>CREATED</strong></Col>
          <Col><strong>LAST UPDATED</strong></Col>
          <Col><strong>STATUS</strong></Col>
          <Col><strong>ACTIONS</strong></Col>
        </Row>

        <Row className="mb-3">
          <Col>1</Col>
          <Col>{user.singleuser.Category}</Col>
          <Col>{user.singleuser.Sub_Category}</Col>
          <Col><span className="badge bg-success">Shaunak</span></Col>
          <Col>{formatDate(user.singleuser.createdAt)}</Col>
          <Col><Button variant="btn btn-secondary" size="sm">
            {timeAgo(user.singleuser.updatedAt)}</Button></Col>
      <Col>{user.singleuser.Category}</Col>
          <Col>
          <Button variant="btn btn-primary" size="sm">
            {user.singleuser.actions}</Button>
          </Col>
        </Row>
      </Card>

      {/* Comments Section */}
      <Card className="mt-3 p-3">
        <Row className="mb-3">
          <Col md={1} className="text-center">
            <div className="bg-success text-white rounded-circle d-inline-block p-3">
              ©©
            </div>
          </Col>
          <Col>
            <h6>Subject: {user.singleuser.Subject}</h6>
            <small className="text-muted">{timeAgo(user.singleuser.updatedAt)}</small>
            <p>{user.singleuser.Description}.</p>
          </Col>
        </Row>



        <Button className="mb-2 btn btn-primary w-25 mx-auto">  Attachment + {user.singleuser.File.length}</Button>


        <Form.Group controlId="commentInput">
          <Form.Control type="text" placeholder="Enter Text" className="mb-3" />
          <Button variant="primary">Send</Button>
        </Form.Group>
      </Card>


      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" className="me-2" onClick={() => navigate(-1)}>Go Back</Button>
        <Button variant="primary" onClick={() => navigate("/")}>Home</Button>
      </div>
    </Container></>
  );
};

export default Singleuser;