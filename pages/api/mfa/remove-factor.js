
import { deleteFactorWithOTP } from "../../../utils/factorsManager";

export default async function handler(req, res) {
    
  if (req.method === 'POST') {

   //console.log("REMOVE API REQUEST BODY", req.body)
      
      const { token, factor, otp} = req.body
      
      try{

        const result = await deleteFactorWithOTP(token, factor, otp)
        console.log("result is : ", result)
        
        res.status(200).json({message: result.data.message})

      } catch(e){
        console.log("ERROR DELETING : ", e.response.data);
      }

      }

}   /* if (factorType == 'oob'){
          
          const challenge = {
            method: 'POST',
            url: process.env.AUTH0_ISSUER_BASE_URL+'/mfa/challenge',
            headers: {authorization: 'Bearer '+ token},
            data: new URLSearchParams({
                mfa_token: token,
                challenge_type:"oob",
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                authenticator_id: id
              })
          }

          try {
            const pushResponse = await axios.request(challenge)
            console.log("push response", pushResponse.data); 
            const { oob_code } = pushResponse.data

            const requestToken = () => { 
              const tokenRequest = {
                method: 'POST',
                url: process.env.AUTH0_ISSUER_BASE_URL+'/oauth/token',
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                data: new URLSearchParams({
                  grant_type: 'http://auth0.com/oauth/grant-type/mfa-oob',
                  client_id: process.env.AUTH0_CLIENT_ID,
                  client_secret: process.env.AUTH0_CLIENT_SECRET,
                  mfa_token: token,
                  oob_code: oob_code
                })
              };
              axios.request(tokenRequest).then(function (response) {
                console.log(response.data);
                const {access_token } = response.data
                
                console.log("ACCESS TOKEN ", access_token)
                
                const removeFactor = {
                  method: 'DELETE',
                  url: process.env.AUTH0_ISSUER_BASE_URL+'/mfa/authenticators/'+id,
                  headers: {authorization: 'Bearer '+ access_token}
                };
                
                axios.request(removeFactor).then(function (response) {
                  console.log("response from remove, ", response);
                  console.log("response from remove", response.data);
                }).catch(function (error) {
                  console.error(error);
                });
             
              }).catch(error => {
                waitFor(3000)
                console.log(error);
                requestToken()
              })
            }
 
            
              requestToken()

          } catch(error){
            console.log("ERROR PUSHING", error)
          }


        } else if (factorType == "otp"){

            const verifyOTP = {
                method: 'POST',
                url: process.env.AUTH0_ISSUER_BASE_URL +'/oauth/token',
                data: new URLSearchParams({
                    grant_type: "http://auth0.com/oauth/grant-type/mfa-otp",
                    client_id: process.env.AUTH0_CLIENT_ID,
                    client_secret: process.env.AUTH0_CLIENT_SECRET,
                    mfa_token: token,
                    otp: oneTimePass
        
                  })
            }
            axios.request(verifyOTP).then( response => {
                const { access_token } = response.data
               // console.log("token from verify", access_token);
            
                var removeFactor = {
                method: 'DELETE',
                url: process.env.AUTH0_ISSUER_BASE_URL+'/mfa/authenticators/'+id,
                headers: {authorization: 'Bearer '+ access_token}
              };
              
              axios.request(removeFactor).then(function (response) {
                console.log("response from remove", response.data);
              }).catch(function (error) {
                console.error(error);
              });
            })
        }
    } else {
      //method is GET

      const { accessToken } = await getAccessToken(req, res);
      const { id } = req.query

      const options = {
        method: 'DELETE',
        url: process.env.AUTH0_ISSUER_BASE_URL + '/mfa/authenticators/'+id,
        headers: {'Authorization': 'Bearer '+ accessToken},
        };
  
      axios.request(options).then(function (response) {
        
        console.log("RESPONSE FROM DELETE: ", response)
        if (response.status == 204){
          res.redirect(302, '/mfa')
        }
        
        //res.status(200).json({factors:response.data})
  
      }).catch(function (error) {
        console.log("ERROR DELETING FACTORS", error.response.data.error_description);
      });
    }
  })
 */
