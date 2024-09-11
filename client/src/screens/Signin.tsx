import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'; // Import Bootstrap components

const Signin: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // Form state for username
  const [password, setPassword] = useState<string>(''); // Form state for password
  const [error, setError] = useState<string | null>(null); // Error message state
  const navigate = useNavigate(); // For redirecting after successful login

  // Handle form submission
  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/signin', {
        username,
        password,
      });

      // Store the JWT token (assuming the response has a token field)
      localStorage.setItem('token', response.data.token);

      // Redirect to the bookshelf page after successful login
      navigate('/bookshelf');
    } catch (err) {
      // Set error message if credentials are incorrect or login fails
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="text-center">Sign In</h1>
          
          {/* Error message */}
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}

          {/* Bootstrap Form */}
          <Form onSubmit={handleSignin}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;