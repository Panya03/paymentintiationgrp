import React, { useState } from 'react';

function AccessibilityTools({ onReadout }) {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(1);

  function toggleContrast() {
    setHighContrast(v => {
      document.body.classList.toggle('high-contrast', !v);
      return !v;
    });
  }

  function increaseFont() {
    setFontSize(f => {
      const newSize = Math.min(f + 0.1, 1.5);
      document.body.style.fontSize = `${newSize}em`;
      return newSize;
    });
  }

  function decreaseFont() {
    setFontSize(f => {
      const newSize = Math.max(f - 0.1, 0.8);
      document.body.style.fontSize = `${newSize}em`;
      return newSize;
    });
  }

  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 2000, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', padding: 12, display: 'flex', gap: 8 }}>
      <button className="btn btn-outline-secondary btn-sm" onClick={onReadout} title="Read page aloud">
        <span role="img" aria-label="Speaker">🔊</span>
      </button>
      <button className="btn btn-outline-secondary btn-sm" onClick={toggleContrast} title="Toggle high contrast">
        <span role="img" aria-label="Contrast">🌓</span>
      </button>
      <button className="btn btn-outline-secondary btn-sm" onClick={increaseFont} title="Increase font size">A+</button>
      <button className="btn btn-outline-secondary btn-sm" onClick={decreaseFont} title="Decrease font size">A-</button>
    </div>
  );
}

export default AccessibilityTools;
