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

const deleteFactor = (id, token) => {

    const url =  '/api/mfa-login/remove-factor' 
    const options = {
        method: 'POST',
        url: url,
        data: {token:token, id:id}
      };
    axios.request(options).then( response => {
        console.log(response.status)
        setFactors(prevFactors => prevFactors.filter(f => f.id !== id))})


}

    return ( <>
    <h5> MFA enrollments</h5>
    {factors.length ?
    factors.map(factor => {
        return (
            <>
            <div>{factor.authenticator_type}</div>  
            <div onClick={()=>{deleteFactor(factor.id, token )}}>X</div>
            </>
            )
        })
:""}
    
    </> );
}

export default FactorsManager;


