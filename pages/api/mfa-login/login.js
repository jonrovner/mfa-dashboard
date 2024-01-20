import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      
      const options = {
        method: 'POST',
        url: process.env.AUTH0_ISSUER_BASE_URL + '/oauth/token',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
          grant_type: 'password',
          username: req.body.email,
          password: req.body.password,
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: process.env.AUTH0_ISSUER_BASE_URL + '/mfa/',
          scope: 'openid profile read:sample',
          
        })
      };

      axios.request(options).then(function (response) {
        //error response is expected;

      }).catch(function (error) {
        
        const { mfa_token } = error.response.data
        const mfaListUrl = process.env.AUTH0_ISSUER_BASE_URL + '/mfa/authenticators';

        try{
            axios.get(mfaListUrl, {
                headers: {authorization:'Bearer ' + mfa_token}
            }).then( response => {
                console.log(response.data)
                res.status(200).json(response.data)
            
            
            })

        }catch (e){
            console.log("error listin factors ", e.error);

        }


      });




    } else {
      // Handle any other HTTP method
    }
  }