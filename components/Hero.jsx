import React from 'react';

const Hero = () => (
  <div className="hero my-5 text-center" data-testid="hero">
    
    <h2 className="mb-4" data-testid="hero-title">
      Next.js Sample MFA Dashboard
    </h2>
    
    <br />
    <p>If you're new to this application you need to sign-up with email and passowrd, then log in again with your credentials</p>
    <a href="/mfa">Log in with your Password</a>
    <br />
    <a href="/api/mfa/login-universal">Log in with Auth0</a>


    
  </div>
);

export default Hero;
