import {listFactors, challengeWithEmail, chanllengeWithPush, challengeWithOTP, pollForToken} from '../../../utils/factorsManager'

export default async function handler(req, res) {
  
  if (req.method === 'POST') {
      
      const { token, type } = req.body
      const factors = await listFactors(token)

      if (type == 'email'){
        
        const factor = factors.find(f => f.oob_channel == 'email')
  
        const data = await challengeWithEmail(token, factor)
        res.status(200).send({data})

      }
      if (type == 'push'){
        const factor = factors.find(f => f.oob_channel == 'auth0')
        const data = await chanllengeWithPush(factor, token)
        //console.log("RESPONSE FROM CHALLENGE", data);
        const access_token = await pollForToken(data.oob_code, token)
        res.status(200).json({access_token})


      }
      if (type == 'otp'){
        const factor = factors.find(f => f.authenticator_type == 'otp')
        const data = await challengeWithOTP(token, factor)
        res.status(200).send({data})
      }
      
      
  }}
