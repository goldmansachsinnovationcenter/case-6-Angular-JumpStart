import React, { useState, useEffect } from 'react';
import { useAngularServices } from '../shared/react/angular-services-context';
import { IUserLogin } from '../shared/interfaces';

interface LoginComponentProps {
  onLoginSuccess?: () => void;
}

export const LoginComponent: React.FC<LoginComponentProps> = ({ onLoginSuccess }) => {
  const { authService, growlerService, loggerService, router } = useAngularServices();
  const [formValues, setFormValues] = useState<IUserLogin>({ email: 'test@test.com', password: 'password1' });
  const [errors, setErrors] = useState<{ email: boolean; password: boolean }>({ email: false, password: false });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({ email: false, password: false });

  useEffect(() => {
    if (authService && !authService.isAuthenticated) {
      setTimeout(() => {
        handleSubmit();
      }, 100);
    } else if (router) {
      router.navigate(['/customers']);
    }
  }, [authService, router]);

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6 && /\d/.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    
    if (name === 'email') {
      setErrors(prev => ({ ...prev, email: !validateEmail(value) }));
    } else if (name === 'password') {
      setErrors(prev => ({ ...prev, password: !validatePassword(value) }));
    }
    
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const isFormValid = (): boolean => {
    return validateEmail(formValues.email) && validatePassword(formValues.password);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (isFormValid() && authService) {
      authService.login(formValues).subscribe({
        next: (status: boolean) => {
          if (status) {
            growlerService?.growl('Logged in', 0); // Info type
            if (authService && authService.redirectUrl) {
              const redirectUrl = authService.redirectUrl;
              authService.redirectUrl = '';
              router?.navigate([redirectUrl]);
            } else {
              router?.navigate(['/customers']);
            }
            if (onLoginSuccess) {
              onLoginSuccess();
            }
          } else {
            const loginError = 'Unable to login';
            setErrorMessage(loginError);
            growlerService?.growl(loginError, 3); // Danger type
          }
        },
        error: (err: any) => loggerService?.log(err)
      });
    }
  };

  return (
    <div className="view">
      <div className="container">
        <header>
          <h3 data-testid="login-title"><span className="glyphicon glyphicon-lock"></span> Login</h3>
        </header>
        <br />
        <form onSubmit={handleSubmit} className="login-form" noValidate data-testid="login-form">
          <div className="login">
            <div className="row">
              <div className="col-md-2">
                Email:
              </div>
              <div className="col-md-10">
                <input 
                  title="email" 
                  type="email" 
                  name="email" 
                  className="form-control" 
                  value={formValues.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  data-testid="login-email"
                />
                <div 
                  className="alert alert-danger" 
                  data-cy="email-error" 
                  data-testid="login-email-error"
                  style={{ display: (!touched.email || validateEmail(formValues.email)) ? 'none' : 'block' }}
                >
                  A valid email address is required
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-2">
                Password:
              </div>
              <div className="col-md-10">
                <input 
                  title="password" 
                  type="password" 
                  name="password" 
                  className="form-control" 
                  value={formValues.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  data-testid="login-password"
                />
                <div 
                  className="alert alert-danger" 
                  data-cy="password-error" 
                  data-testid="login-password-error"
                  style={{ display: (!touched.password || validatePassword(formValues.password)) ? 'none' : 'block' }}
                >
                  Password is required (6 or more characters with at least one number)
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12">
                <button 
                  type="submit" 
                  className="btn btn-success" 
                  disabled={!isFormValid()}
                  data-testid="login-submit"
                >
                  Login
                </button>
              </div>
            </div>
            <br />
            <div className="statusRow">
              <br />
              {errorMessage && (
                <div className="label label-important">
                  <span className="glyphicon glyphicon-thumbs-down icon-white"></span>&nbsp;&nbsp;Error: {errorMessage}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
