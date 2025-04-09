import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useNavigate } from '@tanstack/react-router';

import { useGrowlerService, GrowlerMessageType } from '../core/Growler';
import { useAuth } from '../../hooks/useAuth';
import { 
  ViewContainer, 
  Container, 
  Header, 
  Row, 
  ColMd2, 
  ColMd10, 
  ColMd12 
} from '../../shared-components/Layout';
import { FormControl } from '../../shared-components/Forms';
import { AlertDanger, ErrorLabel } from '../../shared-components/Alerts';
import { SuccessButton } from '../../shared-components/Buttons';
import { LockIcon, ThumbsDownIcon } from '../../shared-components/Icons';

interface IUserLogin {
  email: string;
  password: string;
}

const LoginForm = styled.form`
  margin-bottom: 20px;
`;

const LoginContainer = styled.div`
  padding: 15px;
`;

const StatusRow = styled.div`
  margin-top: 1rem;
`;

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password: string) => {
  return password.length >= 6 && /\d/.test(password);
};

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<IUserLogin>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { growl } = useGrowlerService();
  const { login } = useAuth();
  
  const onSubmit = async (data: IUserLogin) => {
    try {
      const success = await login(data);
      
      if (success) {
        growl('Logged in', GrowlerMessageType.Info);
        
        navigate({ to: '/customers' });
      } else {
        const loginError = 'Unable to login';
        setErrorMessage(loginError);
        growl(loginError, GrowlerMessageType.Danger);
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('An error occurred during login');
      growl('Login error', GrowlerMessageType.Danger);
    }
  };
  
  return (
    <ViewContainer className="view">
      <Container>
        <Header>
          <h3>
            <LockIcon className="glyphicon glyphicon-lock" />
            Login
          </h3>
        </Header>
        <br />
        <LoginForm onSubmit={handleSubmit(onSubmit)} className="login-form" noValidate>
          <LoginContainer className="login">
            <Row>
              <ColMd2>
                Email:
              </ColMd2>
              <ColMd10>
                <FormControl
                  title="email"
                  type="email"
                  {...register('email', {
                    required: true,
                    validate: validateEmail
                  })}
                />
                {errors.email && (
                  <AlertDanger data-cy="email-error" className="alert alert-danger">
                    A valid email address is required
                  </AlertDanger>
                )}
              </ColMd10>
            </Row>
            <br />
            <Row>
              <ColMd2>
                Password:
              </ColMd2>
              <ColMd10>
                <FormControl
                  title="password"
                  type="password"
                  {...register('password', {
                    required: true,
                    validate: validatePassword
                  })}
                />
                {errors.password && (
                  <AlertDanger data-cy="password-error" className="alert alert-danger">
                    Password is required (6 or more characters with at least one number)
                  </AlertDanger>
                )}
              </ColMd10>
            </Row>
            <br />
            <Row>
              <ColMd12>
                <SuccessButton 
                  type="submit" 
                  className="btn btn-success" 
                  disabled={!isValid}
                >
                  Login
                </SuccessButton>
              </ColMd12>
            </Row>
            <br />
            <StatusRow className="statusRow">
              <br />
              {errorMessage && (
                <ErrorLabel className="label label-important">
                  <ThumbsDownIcon className="glyphicon glyphicon-thumbs-down icon-white" />
                  Error: {errorMessage}
                </ErrorLabel>
              )}
            </StatusRow>
          </LoginContainer>
        </LoginForm>
      </Container>
    </ViewContainer>
  );
};

export default Login;
