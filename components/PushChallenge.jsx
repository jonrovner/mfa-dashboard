import { useState } from "react";
import axios from "axios";



const PushChalenge = ({ token, setToken}) => {

    

    const onChallengeRequest = async () => {
        const response = await axios.post('/api/mfa/challenge', {token:token, type:'push'})
        //console.log("RESPONSE FROM API: ", response.data.data);
        //setOob(response.data.data.oob_code)
        setToken(response.data.access_token)
    }

   

    return (
    <div className="p-2">
        <button className="btn btn-primary" onClick={onChallengeRequest}>Send Notification to Device</button>    
       
    </div>
   )
   
  }

  export default PushChalenge