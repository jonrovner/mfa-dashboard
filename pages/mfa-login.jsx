import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function MFAlogin() {

    const [mfa_token, setToken] = useState("")
    const handleSubmit = (e) => {   
        e.preventDefault();
        const url = '/api/mfa-login/login'
        axios.post(url, {
            username:e.target[0].value,
            password:e.target[1].value
        }).then(response => setToken(response.data.token))
    }

  return (
    <>
    {mfa_token 
    ? <div>{mfa_token}</div>
    : <form action="/api/mfa-login/login" method='POST' onSubmit={handleSubmit}>
        <input type="text" name='email' />
        <input type="password" name='password' />
        <button type='submit'></button>
      </form>}
      
    </>
  );
}
