import axios from "axios";
import { withApiAuthRequired, getSession, getAccessToken } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  
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
      console.log("ERROR GETTING FACTORS", error.response.data.error_description);
    });

  } 
  else if (req.method === 'GET'){
    console.log("GET LIST FACTORS");
    const { user } = await getSession(req, res);
    const { accessToken } = await getAccessToken(req, res);
    console.log("user  ", user);
    console.log("token  ", accessToken);

    const options = {
      method: 'GET',
      url: process.env.AUTH0_ISSUER_BASE_URL + '/mfa/authenticators',
      headers: {'Authorization': 'Bearer '+ accessToken},
      };

    axios.request(options).then(function (response) {
      
      //console.log("RESPONSE DATA: ", response.data)
      res.status(200).json({factors:response.data})

    }).catch(function (error) {
      console.log("ERROR GETTING FACTORS", error.response.data.error_description);
    });

  }});

