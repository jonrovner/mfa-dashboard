import React from 'react';

import Logo from './Logo';

const Hero = () => (
  <div className="hero my-5 text-center" data-testid="hero">
    
    <h2 className="mb-4" data-testid="hero-title">
      Next.js Sample MFA Dashboard
    </h2>
    <a href="/mfa-login">Go to MFA dashboard</a>

    
  </div>
);

export default Hero;
