import React from 'react';

const Footer = () => (
  <footer className="bg-light p-3 text-center" data-testid="footer">
    
    <p data-testid="footer-text">
      Sample project provided by <a href="https://auth0.com">Auth0</a>
    </p>
    <a href='/api/auth/logout'><div className='btn btn-primary mt-2'>Logout</div></a>
  </footer>
);

export default Footer;
