
import React from 'react';

function SignUpPage({ onBackToLogin }) {
  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      background: 'linear-gradient(135deg, #eaf6ff 0%, #f6fff6 100%)',
      backgroundImage: 'linear-gradient(120deg, #0050a8 0%, #00b140 100%)',
      animation: 'bgMove 12s ease-in-out infinite alternate',
      transition: 'background 0.5s'
    }}>
      <style>{`
        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
      <div style={{ height: '12px', background: 'linear-gradient(90deg, #0050a8 0%, #0096ff 100%)', boxShadow: '0 2px 12px #0050a8cc' }}></div>
      <div style={{ height: '12px', background: 'linear-gradient(90deg, #00d65b 0%, #00b140 100%)', boxShadow: '0 2px 12px #00d65bcc' }}></div>
      <div className="container py-5">
        <div className="d-flex justify-content-start mt-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Standard_Chartered_%282021%29.svg" alt="Standard Chartered Logo" style={{ height: '48px', background: '#fff', borderRadius: '12px', boxShadow: '0 0 16px 0 #0072ce44, 0 0 8px 0 #00b14044', padding: '6px 18px', marginBottom: 12 }} />
        </div>
        <div className="row justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="col-md-6">
            <div className="card border-0 login-card-exciting" style={{ borderRadius: 20, transition: 'box-shadow 0.3s', boxShadow: '0 8px 40px 0 #0072ce22, 0 2px 8px 0 #00b14022' }}>
              <div className="card-body p-5">
                <h2 className="text-center mb-2" style={{ fontWeight: 600, letterSpacing: 0.5 }}>Sign Up</h2>
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
                  <button type="submit" className="btn btn-primary w-100 mb-3" style={{ fontSize: '1.1rem', borderRadius: '8px', fontWeight: 500, boxShadow: '0 2px 8px #0072ce33' }}>Sign Up</button>
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
            <style>{`
              .login-card-exciting:hover {
                box-shadow: 0 16px 60px 0 #0072ce44, 0 4px 16px 0 #00b14044;
              }
            `}</style>
            <div className="text-center mt-4 text-muted" style={{ fontSize: '1rem' }}>
              Standard Chartered Bank © 2025 | Secure Banking Solutions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
