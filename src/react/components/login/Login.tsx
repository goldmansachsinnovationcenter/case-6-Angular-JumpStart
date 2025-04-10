import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useUI } from '../../contexts/UIContext';
import Card from '../shared/Card';
import Button from '../shared/Button';
import Backdrop from '../shared/Backdrop';

const LoginContainer = styled.div`
  max-width: 450px;
  margin: 80px auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  &.is-invalid {
    border-color: #dc3545;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const { showGrowler } = useUI();
  const navigate = useNavigate();
  
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await login({ email, password });
      
      if (success) {
        showGrowler({
          message: 'Login successful',
          type: 'success',
        });
        navigate({ to: '/customers' });
      } else {
        showGrowler({
          message: 'Invalid email or password',
          type: 'error',
        });
      }
    } catch (error) {
      showGrowler({
        message: 'An error occurred during login',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <LoginContainer data-testid="login-container">
      <Card title="Login">
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'is-invalid' : ''}
              disabled={isSubmitting}
              data-testid="email-input"
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'is-invalid' : ''}
              disabled={isSubmitting}
              data-testid="password-input"
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>
          
          <ButtonContainer>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              dataTestId="login-button"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </ButtonContainer>
        </form>
      </Card>
      
      <Backdrop show={isSubmitting} onClick={() => {}}>
        <div>Logging in...</div>
      </Backdrop>
    </LoginContainer>
  );
};

export default Login;
