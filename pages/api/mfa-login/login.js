import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      //console.log("REQUEST BODY", req.body)

      const options = {
        method: 'POST',
        url: process.env.AUTH0_ISSUER_BASE_URL + '/oauth/token',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
          grant_type: 'password',
          username: req.body.username,
          password: req.body.password,
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: process.env.AUTH0_ISSUER_BASE_URL + '/mfa/',
          scope: 'list:authenticators remove:authenticators',
          
        })
      };

      axios.request(options).then(function (response) {
          //error response is expected;
        //console.log("RESPONSE DATA: ", response.data)

      }).catch(function (error) {
        //console.log("ERROR GETTING MFA TOKEN", error);
        const { mfa_token } = error.response.data
        //console.log("MFA TOKEN ", mfa_token);
        res.status(200).json({token:mfa_token})

      });




    } else {
      // Handle any other HTTP method
    }
  }