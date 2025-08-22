
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
      {/* Dialog overlays with bold bank colors and animated border, high-contrast compatible */}
      {dialog === 'error' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="dialog-animated-border" style={{ minWidth: 320, textAlign: 'center', background: 'var(--dialog-bg, #fff)', borderRadius: 18, boxShadow: '0 8px 32px #0072ce33, 0 2px 8px #00b14033', padding: 24 }}>
            <h5 className="mb-3" style={{ color: '#d90429', fontWeight: 700 }}>Login Failed</h5>
            <div style={{ color: 'var(--dialog-text, #222)' }}>Incorrect Bank ID or Password. Please try again.</div>
          </div>
        </div>
      )}
      {dialog === 'lock' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="dialog-animated-border" style={{ minWidth: 340, textAlign: 'center', background: 'var(--dialog-bg, #fff)', borderRadius: 18, boxShadow: '0 8px 32px #00b14033, 0 2px 8px #0072ce33', padding: 24 }}>
            <h5 className="mb-3" style={{ color: '#ffb300', fontWeight: 700 }}>Account Locked</h5>
            <div style={{ color: 'var(--dialog-text, #222)' }}>Your account has been locked due to 3 failed login attempts.</div>
            <div className="mt-2" style={{ color: 'var(--dialog-text, #222)' }}>Please wait <b>{countdown}</b> seconds before trying again.</div>
          </div>
        </div>
      )}
      {dialog === 'security' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="dialog-animated-border" style={{ minWidth: 340, textAlign: 'center', background: 'var(--dialog-bg, #fff)', borderRadius: 18, boxShadow: '0 8px 32px #0050a833, 0 2px 8px #00b14033', padding: 24 }}>
            <h5 className="mb-3" style={{ color: '#0072ce', fontWeight: 700 }}>Security Verification</h5>
            <div style={{ color: 'var(--dialog-text, #222)' }}>To unlock your account, please answer your security question:</div>
            <div className="mt-3 mb-2" style={{ color: 'var(--dialog-text, #222)' }}><b>What is your mother's maiden name?</b></div>
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
  <div style={{ height: '12px', background: 'linear-gradient(90deg, #0050a8 0%, #0096ff 100%)', boxShadow: '0 2px 12px #0050a8cc' }}></div>
  <div style={{ height: '12px', background: 'linear-gradient(90deg, #00d65b 0%, #00b140 100%)', boxShadow: '0 2px 12px #00d65bcc' }}></div>
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
                  <button type="submit" className="btn btn-primary w-100 mb-3" style={{ fontSize: '1.1rem', borderRadius: '8px', background: '#0050a8', color: '#fff', border: '2px solid #0050a8', fontWeight: 600, textShadow: '0 1px 2px #003366' }}>Sign In</button>
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
