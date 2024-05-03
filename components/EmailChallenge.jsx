

import { useState } from "react";
import axios from "axios";

const EmailChalenge = ({factors, token}) => {

    const [code, setCode] = useState("")
    const [oob_code, setOob] = useState("")

    //const factor = factors.find(factor => factor.oob_channel == 'email')

    const onChallengeRequest = async () => {

        const data = await axios.post('/api/mfa/challenge-email', {token})
        setOob(data.oob_code)


    }

    const onSubmitCode = async () => {

        const data = await confirmEmailchallenge(token, oob_code, code)


    }
   return (
    <div>

        <button onClick={onChallengeRequest}>send</button>    
        <p>enter the code sent to mail</p>
        <input type="text" onChange={(e)=>setCode(e.target.value)}/>
        <button onClick={onSubmitCode}>submit</button>

    </div>
   )
   

  
  
  }

  export default EmailChalenge