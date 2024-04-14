import { enrollSMS } from "../../../utils/factorsManager"


export default async function handler(req, res) {
    
    const {token, number} = req.body

    const data = await enrollSMS(token, number)
    if (data) {
        res.status(200).json({data:data})
    }
    
}



