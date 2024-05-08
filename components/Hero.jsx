import React from 'react';

const Hero = () => (
  <div className="hero my-5 text-center" data-testid="hero">
    
    <h2 className="mb-4" data-testid="hero-title">
      Next.js Sample MFA Dashboard
    </h2>
    
    <br />
    <a href="/mfa">Log in with your Password</a>
    <br />
    <a href="/api/mfa/login-universal">Log in with Auth0</a>


    
  </div>
);

export default Hero;
