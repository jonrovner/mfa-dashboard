import React from 'react';

export default function MFAlogin() {
  return (
    <>
      <form action="/api/mfa-login/login" method='POST'>
        <input type="text" name='email' />
        <input type="password" name='password' />
        <button type='submit'></button>
      </form>
    </>
  );
}
