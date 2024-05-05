import { pollForToken } from "../../../utils/factorsManager";

export default async function handler(req, res) {
    
     const {oob_code, token} = req.body

     const access_token = await pollForToken(oob_code, token)
    
    res.status(200).send({access_token})

}