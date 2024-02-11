import { useState, useEffect } from "react";
import axios from "axios";
import Factors from "./Factors";

const FactorsManager = ({token}) => {

const [factors, setFactors ] = useState([])

useEffect( () => {

      const url =  '/api/mfa/list-factors' 
      const options = {
          method: 'POST',
          url: url,
          data: {token:token}
        };
      axios.request(options).then( response => setFactors(response.data.factors))

    
}, [])


const deleteFactor = (id, factorType, otp) => {
    
  const url =  '/api/mfa/remove-factor' 
    
    const options =  {
        method: 'POST',
        url: url,
        data: {token:token, id:id, oneTimePass:otp, factorType:factorType}
      };

    axios.request(options).then( response => {
        console.log("RESPONSE FROM REMOVE", response)

        

    })
  
}

const enrollOtp = () => {
  axios.post('/api/mfa/enroll-factor', {token})
}

return ( <>
  <h5 className="text-center"> MFA enrollments</h5>
  {factors.length > 0
  ?
  <Factors 
  factors={factors} 
  deleteFactor={deleteFactor}
  enrollFactor={enrollOtp}/>
  :""}
  </> );
}

export default FactorsManager;


