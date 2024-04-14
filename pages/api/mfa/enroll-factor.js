import { listFactors, pollForToken, chanllengeWith, enrollAnotherPush } from "../../../utils/factorsManager";

export default async function handler(req, res) {
   
  if (req.method === 'POST') {

    const { token, type } = req.body
   // console.log('enrolling ', req.body.type);

    const factors = await listFactors(token)
    //console.log("factors enroll api : ", factors)
    
    const pushFactor = factors.find(f => f.authenticator_type == "oob" && f.active)
    const hasOtp = factors.find(f => f.authenticator_type == "otp" && f.active)
    const hasAny = factors.lenght > 0
    
    
    if (type == "oob"){
        
        if (pushFactor.id){
          
          //challenge with existing
          const data = await chanllengeWith(pushFactor, token)
          let {oob_code} = data

          //poll the token endpoint
          const access_token = await pollForToken(oob_code, token)
          //enroll (get bar_code_uri)
          const enrollmentResponse = await enrollAnotherPush(access_token)
          console.log("enrollment api response", enrollmentResponse);
          const {barcode_uri} = enrollmentResponse
          
          //return barcode uri         
          res.status(200).json({bar_code:barcode_uri})
          //confirm enrollment  



        } else if (hasAny) {

        }


    } else if (type == "otp"){
     
      if (hasOtp){


      } else if (hasAny){


      }

    }      

  }
        
       
   
}