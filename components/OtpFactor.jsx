import React, {useState} from "react";

const OtpFactor = ({factor, deleteFactor}) => {

    const [otp, setOtp] = useState("");
    const handleOTP = (e) => {setOtp(e.target.value)};

    return(

    <div className="card mx-2 mb-2 p-2" >
            <h6 className="card-title text-dark text-center">OTP is enabled</h6>
            <div className="card-text">Enter your otp to remove this factor</div>
            <input className="mb-2" type="text" onChange={handleOTP} />
            <div className="btn btn-primary mb-1" onClick={()=>{
                const { id, authenticator_type} = factor
                deleteFactor(id, authenticator_type, otp)
            }}>Delete OTP Factor</div>
        </div>

)
}

export default OtpFactor