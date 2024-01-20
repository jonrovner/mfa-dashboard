import { useState, useEffect } from "react";
import axios from "axios";

const FactorsManager = ({token}) => {

const [factors, setFactors ] = useState([])

useEffect(()=>{
    const url =  '/api/mfa-login/list-factors' 
    const options = {
        method: 'POST',
        url: url,
        data: {token:token}
      };
    axios.request(options).then( response => setFactors(response.data.factors))

}, [])


    return ( <>
    <h5> MFA enrollments</h5>
    {factors.length ?
    factors.map(factor => <div>{factor.authenticator_type}</div>)  

:""}
    
    </> );
}

export default FactorsManager;


