import { useState, useEffect } from "react";
import axios from "axios";

import EmailChalenge from "./EmailChallenge";
import Device from "./Device";
import Qrcode from "./Qrcode";

const FactorsManager = ({token}) => {

const [factors, setFactors ] = useState([])
const [barcode_uri, setBarcode] = useState("")
const [number, setNumber] = useState("")

useEffect( () => {
  const options = {
      method: 'POST',
      url: '/api/mfa/list-factors',
      data: {token:token}
    };
  axios.request(options)
  .then( response => setFactors(response.data.factors))
}, [])


const enroll = async (type) => {

  const {data} = await axios.post('/api/mfa/enroll-factor', {token, type})
  console.log("DATA ENROLL", data)
  
  if (data && data.bar_code){
    setBarcode(data.bar_code)
  }
  const newToken = await axios.post('/api/mfa/finish-enrollment', {oob_code:data.oob_code, token:token })
  if (newToken) setBarcode("")
}

const enrollSms = async () => {
  const res = await axios.post('/api/mfa/enroll-sms', {number, token})
  console.log("response from sms api", res)
}

console.log("factors : ", factors);
//console.log("barcode : ", barcode_uri);


return (
   <>
  

  {
    factors.length > 1 && factors[1].type =='otp' 
    ? <Device factors={factors} token={token}/>
    : factors.length == 1 ? <EmailChalenge factors={factors} token={token}/> : ""
  }

  {/* {factors.find(f => f.authenticator_type == "otp" && f.active == true)
        ? <OtpFactor 
            factor={factors.find(f => f.authenticator_type == "otp" && f.active == true)}
            deleteFactor={deleteFactor} />
        : <div className="btn btn-primary mb-2" onClick={()=>enroll("otp")}>ENROLL OTP</div>  
  } */}


  <div className="btn btn-primary mb-2" onClick={()=>{enroll("oob")}}>ENROLL NEW DEVICE</div>
  
  
  <label htmlFor="phone">enter phone number to enroll sms</label>
  <input type="text" id="phone" onChange={(e)=>setNumber(e.target.value)}/>
  <div className="btn btn-primary mb-2" onClick={()=>{enrollSms()}}>submit</div>
  
  {
    barcode_uri && <Qrcode barcode_uri={barcode_uri} />
  }
  </> 
  );
}

export default FactorsManager;


