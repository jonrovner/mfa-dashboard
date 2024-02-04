import React, {useState} from "react";
import OtpFactor from "./OtpFactor";
import PushFactor from "./PushFactor";

const Factors = ({factors, deleteFactor, enrollFactor}) => {

    const [recovery, setRecovery] = useState("")
    const handleRecovery = (e) => {setRecovery(e.target.value)};

    return (
    <div className="d-flex flex-column flex-sm-row p-4 mr-4">
        {
        factors.find(f => f.authenticator_type == "otp")
        ? <OtpFactor 
            factor={factors.find(f => f.authenticator_type == "otp")}
            deleteFactor={deleteFactor} />
        : <div className="btn btn-primary mb-2" onClick={()=>enrollFactor()}>ENROLL</div>
        }
        {
        factors.find(f => f.authenticator_type == "oob" && f.active)
        ?<PushFactor 
            factor={factors.find(f => f.authenticator_type == "oob" && f.active)} 
            deleteFactor={deleteFactor} /> 
    
        :""
        }
        {
        factors.find( f => f.authenticator_type == 'recovery-code')
        ? <>
        <div className="card mx-2 mb-2 p-2">
        <h6 className="card-title text-dark text-center">Recovery code is enabled</h6>
        <div className="card-text">Enter your recovery code to enroll</div>
            <input type="text" onChange={handleRecovery} />
        </div>
        </> : ""
        }


    </div>)
}

export default Factors ;

