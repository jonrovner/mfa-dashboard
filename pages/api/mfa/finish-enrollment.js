import { pollForToken } from "../../../utils/factorsManager";

export default async function handler(req, res) {
    console.log("FINISHING ", req.query)
    const {oob_code, token} = req.query 

    const access_token = await pollForToken(oob_code, token)

    if (access_token){
        res.status(200).json({token: access_token})
    }


}