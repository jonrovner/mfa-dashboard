import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      console.log("REQUEST BODY", req.body)
        const { token } = req.body
      
        const options = {
        method: 'POST',
        url: process.env.AUTH0_ISSUER_BASE_URL + '/mfa/associate',
        headers: {'Authorization': 'Bearer '+ token},
        data: {authenticator_types: ['otp']}
        };

      axios.request(options).then(function (response) {
        
        console.log("Enrollment response: ", response.data)
        //res.status(200).json({factors:response.data})

      }).catch(function (error) {
        console.log("ERROR ENROLLING", error.response.data.error);
        console.log("DESCRIPTION", error.response.data.error_description);
      });

    } 
  }