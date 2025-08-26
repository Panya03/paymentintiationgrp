
import React, { useState } from 'react';
import './signUpPageStyles.css';

function SignUpPage({ onBackToLogin, registerUser }) {
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  return (
    <div className="signup-bg">
      <div className="signup-bar-blue"></div>
      <div className="signup-bar-green"></div>
      <div className="container py-5">
        <div className="d-flex justify-content-start mt-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Standard_Chartered_%282021%29.svg" alt="Standard Chartered Logo" className="signup-logo" />
        </div>
        <div className="row justify-content-center align-items-center signup-content">
          <div className="col-md-6">
            <div className="card border-0 signup-card">
              <div className="card-body p-5">
                <h2 className="text-center mb-2 signup-title">Sign Up</h2>
                <div className="text-center text-muted mb-4 signup-desc">
                  Create your account
                </div>
                <form onSubmit={e => {
                  e.preventDefault();
                  if (!/^[1-3]\d{8}$/.test(employeeId)) {
                    setMessage('Employee ID must be a 9-digit number starting with 1, 2, or 3.');
                    return;
                  }
                  if (!email) {
                    setMessage('Email is required.');
                    return;
                  }
                  if (!password || password !== confirmPassword) {
                    setMessage('Passwords do not match.');
                    return;
                  }
                  if (registerUser) {
                    registerUser(employeeId, password, email);
                    setMessage('Registration successful! You can now log in.');
                  }
                }}>
                  <div className="mb-3">
                    <label htmlFor="employeeId" className="form-label">Employee ID</label>
                    <input type="text" className="form-control" id="employeeId" placeholder="Enter Employee ID" value={employeeId} onChange={e => setEmployeeId(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3 signup-btn">Sign Up</button>
                  <div className="text-center mb-2">
                    <button type="button" className="btn btn-link p-0" onClick={onBackToLogin}>Back to Login</button>
                  </div>
                  {message && <div className="alert alert-info mt-3">{message}</div>}
                </form>
                <hr />
                <div className="text-center text-muted signup-note">
                  For authorized personnel only. All access is monitored and logged.
                </div>
              </div>
            </div>
            <div className="text-center mt-4 text-muted signup-footer">
              Standard Chartered Bank © 2025 | Secure Banking Solutions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
