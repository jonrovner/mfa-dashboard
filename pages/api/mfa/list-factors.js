import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      //console.log("REQUEST BODY", req.body)
        const { token } = req.body
      
        const options = {
        method: 'GET',
        url: process.env.AUTH0_ISSUER_BASE_URL + '/mfa/authenticators',
        headers: {'Authorization': 'Bearer '+ token},
        };

      axios.request(options).then(function (response) {
        
        console.log("RESPONSE DATA: ", response.data)
        res.status(200).json({factors:response.data})

      }).catch(function (error) {
        console.log("ERROR GETTING FACTORS", error);
      });

    } 
  }