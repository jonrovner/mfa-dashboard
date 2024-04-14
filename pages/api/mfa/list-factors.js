import {listFactors} from '../../../utils/factorsManager'

export default async function handler(req, res) {
  
  if (req.method === 'POST') {
      
      const { token } = req.body
      const factors = await listFactors(token)
      
      if (factors){
        res.status(200).json({factors:factors})
      }
      
  }}
