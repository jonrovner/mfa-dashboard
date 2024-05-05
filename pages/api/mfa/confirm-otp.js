import { verifyOTP } from "../../../utils/factorsManager";

export default async function handler(req,res){

    const {token, otp} = req.body;

    const response = await verifyOTP(token, otp)

    res.status(200).send(response)


}