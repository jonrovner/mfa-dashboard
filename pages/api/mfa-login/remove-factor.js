var axios = require("axios").default;

export default async function handler(req, res) {
    if (req.method === 'POST') {
      //console.log("REQUEST BODY", req.body)
        const { id, token, oneTimePass, factorType } = req.body

        /* const challenge = {
            method: 'POST',
            url: process.env.AUTH0_ISSUER_BASE_URL+'/mfa/challenge',
            headers: {authorization: 'Bearer '+ token},
            data: new URLSearchParams({
                mfa_token: token,
                challenge_type:"otp",
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                authenticator_id: id
    
              })
          }
          axios.request(challenge) */
    
          if (factorType == "otp"){

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
      // Handle any other HTTP method
    }
  }

