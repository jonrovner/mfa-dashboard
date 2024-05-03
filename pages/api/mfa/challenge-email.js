import {listFactors, challengeWithEmail} from '../../../utils/factorsManager'

export default async function handler(req, res) {
  
  if (req.method === 'POST') {
      
      const { token } = req.body
      const factors = await listFactors(token)

      const data = await challengeWithEmail(token, factors[0])
      res.status(200).send({data})
      
      
      
  }}
