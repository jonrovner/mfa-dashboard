import { useState, useEffect } from "react";
import axios from "axios";
import Factor from "./Factor";
import EmailChalenge from "./EmailChallenge";
import Device from "./Device";
import Qrcode from "./Qrcode";

const FactorsManager = ({token, factors, setFactors}) => {

const [barcode_uri, setBarcode] = useState("")
const [number, setNumber] = useState("")
const [access_token, setToken] = useState("")
const [enrollmentResponse, setEnrollment] = useState({})
const [factorID, setFactorId] = useState("")

const enrollSms = async () => {
  const res = await axios.post('/api/mfa/enroll-sms', {number, token})
  console.log("response from sms api", res)
}

const enrollDevice = async () => {
  const response = await axios.post('/api/mfa/enroll-post-challenge', {access_token})
  //console.log("response from api : ", response.data);
  
  setBarcode(response.data.barcode_uri)
  setEnrollment(response.data)
  
  const {data} = await axios.post('/api/mfa/poll-for-token', {oob_code:response.data.oob_code, token:access_token})
  //console.log("RESPONSE FROM POLLING", data)
  
  if (data.access_token){
    setBarcode("")
    setToken("")
    const newfactors = await axios.post('/api/mfa/list-factors', {token})
    //console.log("new factors?", newfactors.data.factors);
    setFactors(newfactors.data.factors)
    setEnrollment({})
  }
}

const deleteFactor = async () => {
  const {data} = await axios.post('/api/mfa/remove-factor', {factorID, access_token})
  console.log("response from remove api", data);
  if (data){
    const newfactors = await axios.post('/api/mfa/list-factors', {token})
    //console.log("new factors?", newfactors.data.factors);
    setFactors(newfactors.data.factors)

  }
}

console.log("factors : ", factors);


return (
  <div className="">
      {
        access_token !== "" 
        ? <div className="bg-success text-light text-center mb-2"> Authorized </div>
        : <div className="bg-danger text-light text-center mb-2">NOT authorized</div>
      }
      <h4 className="text-center pt-2">Enrolled authenticators</h4>
      
      <div className="row mx-2">
      {
        factors.map(factor => <Factor factor={factor} />)
      }
      </div>
      
      {
        factors.find(f => f.authenticator_type == 'otp') 
        ? <Device factors={factors}/>
        : ""
      }
      {
        factors.find( f => f.oob_channel == "email") && !access_token
        ? <EmailChalenge 
            
            token={token} 
            setToken={setToken}
          /> 
        : ""
      }
      {
        (access_token !== '') &&
        <button className="btn btn-primary mb-2" onClick={enrollDevice}>enroll device</button>
      }
      {
        enrollmentResponse.recovery_codes && enrollmentResponse.recovery_codes.length > 0 &&
        <div>Your device is enrolled, save this recovery code: {enrollmentResponse.recovery_codes[0]}</div>

      }
    {/*  <div className="btn btn-primary mb-2" onClick={()=>{enroll("oob")}}>ENROLL NEW DEVICE</div>
      */} 
      
      {/* <label htmlFor="phone">enter phone number to enroll sms</label>
      <input type="text" id="phone" onChange={(e)=>setNumber(e.target.value)}/>
      <div className="btn btn-primary mb-2" onClick={()=>{enrollSms()}}>submit</div> */}
      
      {
        barcode_uri &&  
        <>
          <Qrcode barcode_uri={barcode_uri} />
          
        </>
      }

      {
        access_token &&
        <div>
          <h4>Danger zone</h4>
          <label htmlFor="factorID">enter facotr id to remove</label>
          <input type="text" onChange={(e) => setFactorId(e.target.value)} />
          <button onClick={deleteFactor}>submit</button>
        </div>

      }
  </div> 
  );
}

export default FactorsManager;


