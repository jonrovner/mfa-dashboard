import React, {useState} from "react";

const Factors = ({factors, deleteFactor}) => {

    const [otp, setOtp] = useState("");
    const handleOTP = (e) => {setOtp(e.target.value)};

    return (<>
    {
    factors.find(f => f.authenticator_type == "otp") 
    ? <>
        <div>OTP IS ENABLED</div>
        <p>Enter your otp to remove this factor</p>
        <input type="text" onChange={handleOTP} />
        <button onClick={()=>{
            const { id, authenticator_type} = factors.find(f => f.authenticator_type == "otp")
            deleteFactor(id, authenticator_type, otp)
        }}>Delete Factor</button>
    </>
    : ""
    }
    {
    factors.find(f => f.authenticator_type == "oob")
    ? <div>PUSH IS ENABLED</div>
    :""
    }

    </>)
}

export default Factors ;

