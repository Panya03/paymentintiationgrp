
import React, { useState } from 'react';
import './customPageStyles.css';

function CustomPage({ onSignUp, authenticate }) {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [countdown, setCountdown] = useState(0);

  return (
    <div className="custom-bg">
      <style>{`
        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
      {dialog === 'error' && (
        <div className="custom-dialog-overlay">
          <div className="dialog-animated-border custom-dialog-box">
            <h5 className="mb-3 custom-dialog-title-error">Login Failed</h5>
            <div className="custom-dialog-text">Incorrect Employee ID or Password. Please try again.</div>
          </div>
        </div>
      )}
      {dialog === 'lock' && (
        <div className="custom-dialog-overlay">
          <div className="dialog-animated-border custom-dialog-box lock">
            <h5 className="mb-3 custom-dialog-title-lock">Account Locked</h5>
            <div className="custom-dialog-text">Your account has been locked due to 3 failed login attempts.</div>
            <div className="mt-2 custom-dialog-wait">Please wait <b>{countdown}</b> seconds before trying again.</div>
          </div>
        </div>
      )}
      {dialog === 'security' && (
        <div className="custom-dialog-overlay">
          <div className="dialog-animated-border custom-dialog-box security">
            <h5 className="mb-3 custom-dialog-title-security">Security Verification</h5>
            <div className="custom-dialog-text">To unlock your account, please answer your security question:</div>
            <div className="mt-3 mb-2 custom-dialog-text"><b>What is your mother's maiden name?</b></div>
            <input className="form-control mb-3" placeholder="Enter answer" />
            <button className="btn btn-primary w-100">Submit</button>
          </div>
        </div>
      )}
      <style>{`
        .dialog-animated-border {
          border: 3px solid;
          border-image: linear-gradient(120deg, #0050a8, #00b140, #0096ff, #00d65b) 1;
          animation: dialogBorderMove 3s linear infinite alternate;
        }
        @keyframes dialogBorderMove {
          0% { border-image-source: linear-gradient(120deg, #0050a8, #00b140, #0096ff, #00d65b); }
          100% { border-image-source: linear-gradient(240deg, #00b140, #0050a8, #00d65b, #0096ff); }
        }
        body.high-contrast-mode .dialog-animated-border {
          --dialog-bg: #000 !important;
          --dialog-text: #fff !important;
          border-color: #fff !important;
          box-shadow: 0 0 0 3px #fff, 0 8px 32px #fff2;
        }
      `}</style>
  <div className="custom-bar-blue"></div>
  <div className="custom-bar-green"></div>
      <div className="container py-5">
        <div className="d-flex justify-content-start mt-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Standard_Chartered_%282021%29.svg" alt="Standard Chartered Logo" className="custom-logo" />
        </div>
  <div className="row justify-content-center align-items-center signup-content">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 custom-card">
              <div className="card-body p-5">
                <h2 className="text-center mb-2 custom-title">Payment Portal Login</h2>
                <div className="text-center text-muted mb-4 custom-desc">
                  Internal Transaction Approval System
                </div>
                <form onSubmit={e => {
                  e.preventDefault();
                  if (authenticate) {
                    const result = authenticate(employeeId, password);
                    setLoginResult(result);
                  }
                }}>
                  <div className="mb-3">
                    <label htmlFor="employeeId" className="form-label">Employee ID</label>
                    <input type="text" className="form-control" id="employeeId" placeholder="Enter Employee ID" value={employeeId} onChange={e => setEmployeeId(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3 custom-btn">Sign In</button>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <a href="#" className="text-decoration-none">Forgot Password?</a>
                    <button type="button" className="btn btn-link p-0" onClick={onSignUp}>Sign Up</button>
                  </div>
                  {loginResult && (
                    loginResult.success ? (
                      <div className="alert alert-success mt-3">Login successful! Role: Level {loginResult.role}</div>
                    ) : (
                      <div className="alert alert-danger mt-3">Incorrect Employee ID or Password.</div>
                    )
                  )}
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

export default CustomPage;
