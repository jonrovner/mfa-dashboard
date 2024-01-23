var axios = require("axios").default;

export default async function handler(req, res) {
    if (req.method === 'POST') {
      //console.log("REQUEST BODY", req.body)
        const { id, token } = req.body

        var options = {
            method: 'DELETE',
            url: process.env.AUTH0_ISSUER_BASE_URL+'/mfa/authenticators/'+id,
            headers: {authorization: 'Bearer '+token}
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });
      
       

    } else {
      // Handle any other HTTP method
    }
  }

