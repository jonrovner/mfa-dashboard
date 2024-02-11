import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import FactorsManager from '../components/FactorsManager';
import MfaLoginForm from '../components/MfaLoginForm';

export default function MFAlogin() {

    const [mfa_token, setToken] = useState("")
    
    const handleSubmit = (e, input) => {   
      console.log("submiting : ", input);
        e.preventDefault();
        const url = '/api/mfa/login'
        axios.post(url, {
            username: input.email,
            password: input.password
        }).then(response => setToken(response.data.token)) 
    }

  return (
   <>
    {mfa_token 
    ? <FactorsManager token={mfa_token} />
    
    : <MfaLoginForm handleSubmit={handleSubmit} />  
    }
  </>)
}