import {listFactors, challengeWithEmail, chanllengeWithPush} from '../../../utils/factorsManager'

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
        res.status(200).send({data})


      }
      
      
  }}
