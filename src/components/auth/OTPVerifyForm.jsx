import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const OTPVerifyForm = () => {
  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Get the pending email from localStorage
  const email = localStorage.getItem('pendingEmail');

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setError('');

    try {
      // 🔁 Replace with your actual backend endpoint
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email,
        otp,
      });

      const { token, user } = res.data;

      // Set user in context
      login({ token, user });

      // Clear pending email and go to dashboard
      localStorage.removeItem('pendingEmail');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <div className="mb-3">
        <label>Enter OTP sent to {email}</label>
        <input
          type="text"
          className="form-control"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-success w-100" type="submit" disabled={verifying}>
        {verifying ? 'Verifying...' : 'Verify OTP'}
      </button>
    </form>
  );
};

export default OTPVerifyForm;
