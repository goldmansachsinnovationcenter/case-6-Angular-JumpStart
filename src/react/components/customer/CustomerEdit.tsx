import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ICustomer, IState } from '../../../app/shared/interfaces';
import { useCustomer, useCreateCustomer, useUpdateCustomer, useDeleteCustomer } from '../../hooks/useCustomers';
import { useStates } from '../../hooks/useStates';
import { useUI } from '../../contexts/UIContext';
import Card from '../shared/Card';
import Button from '../shared/Button';
import Backdrop from '../shared/Backdrop';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
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
  padding: 8px 12px;
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

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
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
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
`;

interface FormErrors {
  firstName?: string;
  lastName?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
}

const CustomerEdit: React.FC = () => {
  const { id } = useParams({ from: '/customers/$id' });
  const navigate = useNavigate();
  const { showGrowler, showModal, setLoading } = useUI();
  
  const customerId = id === 'new' ? null : Number(id);
  const isNewCustomer = !customerId;
  
  const { data: customer, isLoading: isLoadingCustomer } = useCustomer(customerId);
  const { data: states, isLoading: isLoadingStates } = useStates();
  const createCustomer = useCreateCustomer();
  const updateCustomer = useUpdateCustomer();
  const deleteCustomer = useDeleteCustomer();
  
  const [formData, setFormData] = useState<Partial<ICustomer>>({
    firstName: '',
    lastName: '',
    gender: 'male',
    address: '',
    city: '',
    state: { abbreviation: '', name: '' },
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  useEffect(() => {
    if (customer) {
      setFormData({
        ...customer,
      });
    }
  }, [customer]);
  
  useEffect(() => {
    setLoading(isLoadingCustomer || isLoadingStates);
  }, [isLoadingCustomer, isLoadingStates, setLoading]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'state') {
      const selectedState = states?.find(state => state.abbreviation === value);
      if (selectedState) {
        setFormData(prev => ({
          ...prev,
          state: selectedState,
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city?.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state?.abbreviation) {
      newErrors.state = 'State is required';
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
      if (isNewCustomer) {
        await createCustomer.mutateAsync(formData as Omit<ICustomer, 'id'>);
        showGrowler({
          message: 'Customer created successfully',
          type: 'success',
        });
      } else {
        await updateCustomer.mutateAsync(formData as ICustomer);
        showGrowler({
          message: 'Customer updated successfully',
          type: 'success',
        });
      }
      
      navigate({ to: '/customers' });
    } catch (error) {
      showGrowler({
        message: `Error ${isNewCustomer ? 'creating' : 'updating'} customer`,
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };
  
  const confirmDelete = async () => {
    if (!customerId) return;
    
    setIsSubmitting(true);
    
    try {
      await deleteCustomer.mutateAsync(customerId);
      showGrowler({
        message: 'Customer deleted successfully',
        type: 'success',
      });
      navigate({ to: '/customers' });
    } catch (error) {
      showGrowler({
        message: 'Error deleting customer',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
      setShowDeleteConfirm(false);
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };
  
  const handleCancel = () => {
    navigate({ to: '/customers' });
  };
  
  return (
    <FormContainer data-testid="customer-edit-form">
      <Card title={isNewCustomer ? 'Create Customer' : 'Edit Customer'}>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleInputChange}
              className={errors.firstName ? 'is-invalid' : ''}
              data-testid="firstName-input"
            />
            {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleInputChange}
              className={errors.lastName ? 'is-invalid' : ''}
              data-testid="lastName-input"
            />
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="gender">Gender</Label>
            <Select
              id="gender"
              name="gender"
              value={formData.gender || ''}
              onChange={handleInputChange}
              className={errors.gender ? 'is-invalid' : ''}
              data-testid="gender-select"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
            {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address || ''}
              onChange={handleInputChange}
              className={errors.address ? 'is-invalid' : ''}
              data-testid="address-input"
            />
            {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city || ''}
              onChange={handleInputChange}
              className={errors.city ? 'is-invalid' : ''}
              data-testid="city-input"
            />
            {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="state">State</Label>
            <Select
              id="state"
              name="state"
              value={formData.state?.abbreviation || ''}
              onChange={handleInputChange}
              className={errors.state ? 'is-invalid' : ''}
              data-testid="state-select"
            >
              <option value="">Select a state</option>
              {states?.map(state => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </Select>
            {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
          </FormGroup>
          
          <ButtonContainer>
            {!isNewCustomer && (
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={isSubmitting}
                dataTestId="delete-button"
              >
                Delete
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
              dataTestId="cancel-button"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              dataTestId="submit-button"
            >
              {isNewCustomer ? 'Create' : 'Update'}
            </Button>
          </ButtonContainer>
        </form>
      </Card>
      
      <Backdrop show={showDeleteConfirm} onClick={cancelDelete}>
        <Card title="Confirm Delete">
          <p>Are you sure you want to delete this customer?</p>
          <ButtonContainer>
            <Button
              variant="secondary"
              onClick={cancelDelete}
              dataTestId="cancel-delete-button"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              dataTestId="confirm-delete-button"
            >
              Delete
            </Button>
          </ButtonContainer>
        </Card>
      </Backdrop>
    </FormContainer>
  );
};

export default CustomerEdit;
