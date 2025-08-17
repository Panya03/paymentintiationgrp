
import React, { useState, useEffect } from 'react';

function CustomPage({ onSignUp }) {
  const [dialog, setDialog] = useState('none');
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timers = [];
    setDialog('error');
    timers.push(setTimeout(() => setDialog('lock'), 2000));
    timers.push(setTimeout(() => setDialog('security'), 4000));
    timers.push(setTimeout(() => setDialog('none'), 6000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', position: 'relative' }}>
      {dialog === 'error' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="bg-white p-4 rounded shadow-lg" style={{ minWidth: 320, textAlign: 'center' }}>
            <h5 className="mb-3 text-danger">Login Failed</h5>
            <div>Incorrect Bank ID or Password. Please try again.</div>
          </div>
        </div>
      )}
      {dialog === 'lock' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="bg-white p-4 rounded shadow-lg" style={{ minWidth: 340, textAlign: 'center' }}>
            <h5 className="mb-3 text-warning">Account Locked</h5>
            <div>Your account has been locked due to 3 failed login attempts.</div>
            <div className="mt-2">Please wait <b>{countdown}</b> seconds before trying again.</div>
          </div>
        </div>
      )}
      {dialog === 'security' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="bg-white p-4 rounded shadow-lg" style={{ minWidth: 340, textAlign: 'center' }}>
            <h5 className="mb-3 text-primary">Security Verification</h5>
            <div>To unlock your account, please answer your security question:</div>
            <div className="mt-3 mb-2"><b>What is your mother's maiden name?</b></div>
            <input className="form-control mb-3" placeholder="Enter answer" />
            <button className="btn btn-primary w-100">Submit</button>
          </div>
        </div>
      )}
      <div style={{ height: '8px', background: '#0072ce' }}></div>
      <div style={{ height: '8px', background: '#00b140' }}></div>
      <div className="container py-5">
        <div className="d-flex justify-content-start mt-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Standard_Chartered_%282021%29.svg" alt="Standard Chartered Logo" style={{ height: '40px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', padding: '4px 12px' }} />
        </div>
        <div className="row justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="col-md-6">
            <div className="card shadow-lg border-0" style={{ borderRadius: '16px' }}>
              <div className="card-body p-5">
                <h2 className="text-center mb-2" style={{ fontWeight: 500 }}>Payment Portal Login</h2>
                <div className="text-center text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                  Internal Transaction Approval System
                </div>
                <form>
                  <div className="mb-3">
                    <label htmlFor="bankId" className="form-label">Bank ID</label>
                    <input type="text" className="form-control" id="bankId" placeholder="Enter your Bank ID" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3" style={{ fontSize: '1.1rem', borderRadius: '8px' }}>Sign In</button>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <a href="#" className="text-decoration-none">Forgot Password?</a>
                    <button type="button" className="btn btn-link p-0" onClick={onSignUp}>Sign Up</button>
                  </div>
                </form>
                <hr />
                <div className="text-center text-muted" style={{ fontSize: '0.95rem' }}>
                  For authorized personnel only. All access is monitored and logged.
                </div>
              </div>
            </div>
            <div className="text-center mt-4 text-muted" style={{ fontSize: '1rem' }}>
              Standard Chartered Bank © 2025 | Secure Banking Solutions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomPage;
