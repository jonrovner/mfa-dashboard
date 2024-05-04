import { enrollAfterChallenge } from "../../../utils/factorsManager";

export default async function handler(req, res) {
   
    if (req.method === 'POST') {
    
    const { access_token } = req.body
    const data = await enrollAfterChallenge(access_token)
    res.status(200).send(data)    
    
    }
}