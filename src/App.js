
import React, { useState, useRef } from 'react';
import CustomPage from './CustomPage';
import SignUpPage from './SignUpPage';
import AccessibilityTools from './AccessibilityTools';

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const mainRef = useRef();

  function handleReadout() {
    if (window.speechSynthesis) {
      const text = mainRef.current ? mainRef.current.innerText : document.body.innerText;
      const utter = new window.SpeechSynthesisUtterance(text);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  }

  return (
    <>
      <AccessibilityTools onReadout={handleReadout} />
      <div ref={mainRef}>
        {showSignUp ? (
          <SignUpPage onBackToLogin={() => setShowSignUp(false)} />
        ) : (
          <CustomPage onSignUp={() => setShowSignUp(true)} />
        )}
      </div>
    </>
  );
}

export default App;
