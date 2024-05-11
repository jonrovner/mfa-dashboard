import React from 'react';

const Hero = () => (
  <div className="hero my-5 text-center" data-testid="hero">
    
    <h2 className="mb-4" data-testid="hero-title">
      Auth0 Next.js Multifactor Authentication Dashboard
    </h2>
    <p>This application shows the use of Auth0's MFA API to allow users to control their MFA authentication factors</p>
    <br />
    <p className='text-small'>If you're new to this application you need to sign-up with email and password, then log in again with your credentials</p>
    <a href="/mfa">Log in with your Password</a>
    <br />
    <a href="/api/mfa/login-universal">Sign up with Auth0</a>


    
  </div>
);

export default Hero;
