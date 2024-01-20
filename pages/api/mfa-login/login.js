import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      console.log("POST TO MFA LOGIN", req.body);
      const options = {
        method: 'POST',
        url: 'https://customizau.us.auth0.com/oauth/token',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
          grant_type: 'password',
          username: req.body.email,
          password: req.body.password,
          client_id: 'Yf66tt9WhTyt2kLJHa3nir2D56KRlx0o',
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: 'https://customizau.us.auth0.com/mfa/',
          scope: 'openid profile read:sample',
          
        })
      };

      axios.request(options).then(function (response) {
        console.log("RESPONSE DATA ", response.data);
        /* const {mfa_token} = response.data;
        const mfaListUrl = process.env.AUTH0_ISSUER_BASE_URL + '/mfa/authenticators';

        try{
            axios.get(mfaListUrl, {
                headers: {authorization:'Bearer ' + mfa_token}
            }).then( response => console.log(response.data))

        }catch (e){
            console.log("error listin factors ", e);

        } */






      }).catch(function (error) {
        console.error(" ERROR FROM MFA API ", error.response.data);
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