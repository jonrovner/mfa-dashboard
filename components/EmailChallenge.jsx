

import { useState } from "react";
import axios from "axios";
import Qrcode from "./Qrcode";

const EmailChalenge = ({token}) => {

    const [code, setCode] = useState("")
    const [oob_code, setOob] = useState("")
    const [access_token, setToken] = useState("")
    const [barcode_uri, setBarcode] = useState("")
    const [otp, setOTP] = useState("")


    const onChallengeRequest = async () => {
        const response = await axios.post('/api/mfa/challenge-email', {token})
        //console.log("RESPONSE FROM API: ", response.data.data);
        setOob(response.data.data.oob_code)
    }

    const onSubmitCode = async () => {
        const response = await axios.post('/api/mfa/confirm-email-challenge', {token, oob_code, code} )
        console.log("response from confirm api", response)
        setToken(response.data.data.access_token)
    }

    const enrollDevice = async () => {
        const response = await axios.post('/api/mfa/enroll-post-challenge', {access_token})
        console.log("response from api : ", response.data.barcode_uri);
        setBarcode(response.data.barcode_uri)

    }

    const confirmEnrollment = async () => {
        const response = await axios.post('/api/mfa/confirm-otp', {otp})
        console.log("CONFIRMATION RESPONSE : ", response.data);
    }
    
    return (
    <div>
        <p>Your email is enabled for MFA</p>
        <button className="btn btn-primary mb-2" onClick={onChallengeRequest}>send OTP to email</button>    
        {(oob_code !== '')&&

        <div>
        <label htmlFor="id">enter the code sent to your email</label>
        <input id="code" type="text" onChange={(e)=>setCode(e.target.value)}/>
        <br />
        <button className="btn btn-primary mb-2" disabled={oob_code == '' } onClick={onSubmitCode}>submit code</button>
        {
            (access_token !== '') &&
            
            <button className="btn btn-primary mb-2" onClick={enrollDevice}>enroll device</button>
            

        }
        {
         barcode_uri && 
         <>
         <Qrcode barcode_uri={barcode_uri} />
         <label htmlFor="otp">enter otp</label>
         <input type="text" onChange={(e)=>setOTP(e.target.value)}/>
         <button onClick={confirmEnrollment}>submit</button>
         </>
          }
        </div>

        }

        <br />
        <br />
        <br />
    </div>
   )
   
  }

  export default EmailChalenge