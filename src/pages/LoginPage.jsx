import React, { useState } from 'react';
import OTPRequestForm from '../components/auth/OTPRequestForm';
import CredentialLoginForm from '../components/auth/CredentialLoginForm';

const LoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>

      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn me-2 ${isAdmin ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setIsAdmin(true)}
        >
          Admin Login
        </button>
        <button
          className={`btn ${!isAdmin ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setIsAdmin(false)}
        >
          User Login
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          {isAdmin ? <OTPRequestForm /> : <CredentialLoginForm />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
