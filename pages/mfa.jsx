import React, { useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import FactorsManager from '../components/FactorsManager';
import MfaLoginForm from '../components/MfaLoginForm';
import {  withPageAuthRequired } from '@auth0/nextjs-auth0';

 function MFAlogin() {

    const [mfa_token, setToken] = useState("")
    const [factors, setFactors ] = useState([]) 
    
    const handleSubmit = (e, input) => {   
      //console.log("submiting : ", input);
        e.preventDefault();
        const url = '/api/mfa/login'
        axios.post(url, {
            username: input.email,
            password: input.password
        }).then(response => setToken(response.data.token)) 
    }

    useEffect(()=>{
      console.log("MFA TOKEN: ", mfa_token);
      async function main () {

        console.log("TOKEN EFFECT");
        const response = await axios.post('/api/mfa/list-factors', {token: mfa_token})
        console.log("response", response)
        setFactors(response.data.factors)
        return response.data
      }

      if (mfa_token){
        main();
      }

    }, [mfa_token])

    
  return (
   <>
    {mfa_token 
    ? <FactorsManager token={mfa_token} factors={factors} setFactors={setFactors}/>
    
    : <MfaLoginForm handleSubmit={handleSubmit} />  
    }
  </>)
}
export default withPageAuthRequired(MFAlogin)