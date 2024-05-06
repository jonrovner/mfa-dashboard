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
        <div className="card mx-2 mb-2 p-2">
            <h6 className="card-title text-dark text-center">OTP is enabled</h6>
            <button className="btn btn-primary mb-2" onClick={onChallengeRequest}>Challenge OTP</button>    
            {
                (oob !== '') &&
                <div>
                    <label htmlFor="otp">enter your otp</label>
                    <input id="otp" className="mb-2" type="text" onChange={handleOTP} />
                    <div className="btn btn-primary mb-1" onClick={onSubmitCode}>submit</div>

                    
                </div>


            }
            
            
            <p className="alert alert-danger">If you delete this factor, push notifications will also be deleted</p>
        </div>
    )   
}

export default OtpFactor