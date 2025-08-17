import React from 'react';

const SignUpPage = ({ onBackToLogin }) => {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
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
                <h2 className="text-center mb-2" style={{ fontWeight: 500 }}>Sign Up</h2>
                <div className="text-center text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                  Create your account
                </div>
                <form>
                  <div className="mb-3">
                    <label htmlFor="bankId" className="form-label">Bank ID</label>
                    <input type="text" className="form-control" id="bankId" placeholder="Enter your Bank ID" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Create a password" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3" style={{ fontSize: '1.1rem', borderRadius: '8px' }}>Sign Up</button>
                  <div className="text-center mb-2">
                    <button type="button" className="btn btn-link p-0" onClick={onBackToLogin}>Back to Login</button>
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
};

export default SignUpPage;
