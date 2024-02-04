import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import FactorsManager from '../components/FactorsManager';

export default function MFAlogin() {

    const [mfa_token, setToken] = useState("")
    const [input, setInput] = useState({}) 

    const handleInput = (e) => {
      setInput({...input, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {   
        e.preventDefault();
        const url = '/api/mfa/login'
        axios.post(url, {
            username: input.email,
            password: input.password
        }).then(response => setToken(response.data.token)) 
    }
   console.log("mfa token is ", mfa_token)
  return (
    <>
    {mfa_token 
    ? <FactorsManager token={mfa_token} />
    : <>
    <p>Please enter your credentials to continue</p>
    <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" name='email' onChange={handleInput}/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" name='password' onChange={handleInput}/>
  </div>
 
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    
      </>}
      
    </>
  );
}
