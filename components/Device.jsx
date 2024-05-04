import React from 'react';
import axios from 'axios';
import { useState } from 'react';


const deleteDeviceWitOTP = (token, factor, otp) => {
    const options =  {
          method: 'POST',
          url: '/api/mfa/remove-factor',
          data: {token:token, factor:factor, otp:otp}
        };
    axios.request(options).then( response => {
          console.log("RESPONSE FROM REMOVE", response)
      })
  }

const Device = ({factors, token}) => {
   
    const [otp, setOTP] = useState("")
     
    return ( <div className="hero my-5 text-center" data-testid="hero">
        <h5 className="text-center"> Enrolled Device</h5>
        <h2 className="mb-4" data-testid="hero-title">
         {factors[0].name}
        </h2>
        <p>enter your otp</p>
        <input type="text" onChange={(e) => setOTP(e.target.value)}/>
       {
        token && <button onClick={()=>deleteDeviceWitOTP(token, factors[1], otp)}>DELETE</button>

       } 
    
      </div>
    );


}




export default Device;
