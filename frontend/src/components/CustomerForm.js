import React, { useState } from 'react';

const CustomerForm = ({ onCustomerAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation - only digits, minimum 10
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Real-time validation
    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }

    if (name === 'phone') {
      // Check if phone contains non-digit characters
      if (value && !/^\d*$/.test(value)) {
        setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number' }));
      } else if (value && value.length < 10) {
        setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number' }));
      } else {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submit
    let hasErrors = false;
    const newErrors = { email: '', phone: '' };

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      hasErrors = true;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', phone: '', company: '' });
        setErrors({ email: '', phone: '' });
        setMessage({ type: 'success', text: 'Customer added successfully!' });
        onCustomerAdded();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to add customer. Please try again.' });
      }
    } catch (error) {
      console.error('Error adding customer:', error);
      setMessage({ type: 'error', text: 'Network error. Please check your connection.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="customer-form-container">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-icon">➕</span>
          Add New Customer
        </h2>
        <p className="section-subtitle">Enter customer details to expand your network</p>
      </div>

      {message.text && (
        <div className={`message message-${message.type}`}>
          {message.type === 'success' ? '✓' : '⚠'} {message.text}
        </div>
      )}

      <div className="customer-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={submitting}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="1234567890"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={submitting}
              className={errors.phone ? 'input-error' : ''}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Acme Corporation"
              value={formData.company}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            onClick={handleSubmit}
            className="btn-submit"
            disabled={submitting || errors.email || errors.phone}
          >
            {submitting ? (
              <>
                <span className="spinner"></span>
                Adding...
              </>
            ) : (
              <>
                <span className="btn-icon">+</span>
                Add Customer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;