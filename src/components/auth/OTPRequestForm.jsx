import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OTPRequestForm = () => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      // 🔁 Replace with your actual backend endpoint
      const response = await axios.post('http://localhost:5000/api/auth/send-otp', {
        email,
      });

      if (response.data.success) {
        // Store email temporarily to use in OTP verify step
        localStorage.setItem('pendingEmail', email);
        navigate('/verify-otp');
      } else {
        setError('Failed to send OTP. Try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Email (Admin only)</label>
        <input
          type="email"
          className="form-control"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-primary w-100" type="submit" disabled={sending}>
        {sending ? 'Sending OTP...' : 'Send OTP'}
      </button>
    </form>
  );
};

export default OTPRequestForm;
