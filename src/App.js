import React, { useState } from 'react';
import CustomPage from './CustomPage';
import SignUpPage from './SignUpPage';

function App() {
  const [showSignUp, setShowSignUp] = useState(false);

  return showSignUp ? (
    <SignUpPage onBackToLogin={() => setShowSignUp(false)} />
  ) : (
    <CustomPage onSignUp={() => setShowSignUp(true)} />
  );
}

export default App;
