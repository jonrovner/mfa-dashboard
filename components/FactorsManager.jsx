import { useState, useEffect } from "react";
import axios from "axios";
import Factors from "./Factors";

const FactorsManager = ({token}) => {

const [factors, setFactors ] = useState([])

useEffect(()=>{
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
    const options = {
        method: 'POST',
        url: url,
        data: {token:token, id:id, oneTimePass:otp, factorType:factorType}
      };
    axios.request(options).then( response => {
        console.log(response.status)
        setFactors(prevFactors => prevFactors.filter(f => f.id !== id))})
}

return ( <>
    <h5> MFA enrollments</h5>
    {factors.length 
    ?
    <Factors 
    factors={factors} 
    deleteFactor={deleteFactor}/>
    :""}
    </> );
}

export default FactorsManager;


