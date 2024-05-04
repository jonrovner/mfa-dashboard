import {listFactors, confirmEmailchallenge} from '../../../utils/factorsManager'

export default async function handler(req, res) {
  
  if (req.method === 'POST') {
      
      const { token, oob_code, code } = req.body
      const factors = await listFactors(token)

      const data = await confirmEmailchallenge(token, oob_code, code)
      
      res.status(200).send({data})
      
      
      
  }}
