import React, {useState} from "react";
import axios from "axios";

const OtpFactor = ({token, setToken}) => {

    const [oob, setOob] = useState("");
    const [otp, setOtp] = useState("");
    const handleOTP = (e) => {setOtp(e.target.value)};

    const onChallengeRequest = async () => {
        const response = await axios.post('/api/mfa/challenge', {token:token, type:'otp'})
        //console.log("RESPONSE FROM API: ", response.data.data);
        setOob(response.data.data.oob_code)
    }

    const onSubmitCode = async () => {
        const response = await axios.post('/api/mfa/confirm-otp', {token, otp} )
        //console.log("response from confirm api", response)
        setToken(response.data.data.access_token)
        setOtp("")
    }


    //console.log("FACTOR IN OTP COMPONENT ", factor);
    return(
        <div className="p-2">
            
            <button className="btn btn-primary mb-2" onClick={onChallengeRequest}>Challenge OTP</button>    
            {
                (oob !== '') &&
                <div>
                    <label htmlFor="otp">enter your otp</label>
                    <input id="otp" className="mb-2" type="text" onChange={handleOTP} />
                    <div className="btn btn-primary mb-1" onClick={onSubmitCode}>submit</div>
                </div>
            }
           
        </div>
    )   
}

export default OtpFactor