import { useState } from "react";
import axios from "axios";
import Qrcode from "./Qrcode";


const EmailChalenge = ({ token, setToken}) => {

    const [code, setCode] = useState("")
    const [oob_code, setOob] = useState("")
   

    const onChallengeRequest = async () => {
        const response = await axios.post('/api/mfa/challenge', {token:token, type:'email'})
        //console.log("RESPONSE FROM API: ", response.data.data);
        setOob(response.data.data.oob_code)
    }

    const onSubmitCode = async () => {
        const response = await axios.post('/api/mfa/confirm-email-challenge', {token, oob_code, code} )
        //console.log("response from confirm api", response)
        setToken(response.data.data.access_token)
        setCode("")
    }

    
    return (
    <div >
        <p>Your email is enabled for MFA</p>
        <button className="btn btn-primary mb-2" onClick={onChallengeRequest}>send OTP to email</button>    
        {
        (oob_code !== '') &&

            <div>
                <label htmlFor="id">enter the code sent to your email</label>
                <input id="code" type="text" onChange={(e)=>setCode(e.target.value)}/>
                <br />
                <button 
                    className="btn btn-primary mb-2" 
                    disabled={oob_code == '' } 
                    onClick={onSubmitCode}>submit code
                </button>
            </div>

        }

        <br />
        <br />
        <br />
    </div>
   )
   
  }

  export default EmailChalenge