import React from 'react';

const Hero = () => (
  <div className="hero my-5 text-center" data-testid="hero">
    
    <h2 className="mb-4" data-testid="hero-title">
      Next.js Sample MFA Dashboard
    </h2>
    <a href="/api/mfa/login-universal">Log in with Auth0 to access MFA dashboard</a>
    <br />
    <a href="/mfa">Log in with Password</a>


    
  </div>
);

export default Hero;
