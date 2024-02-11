var axios = require("axios").default;

export default async function handler(req, res) {
    
    const {token, number} = req.body

    let options = {
        method: 'POST',
        url: process.env.AUTH0_ISSUER_BASE_URL+'/mfa/associate',
        headers: {authorization: 'Bearer '+token, 'content-type': 'application/json'},
        data: {authenticator_types: ['oob'], oob_channels: ['sms'], phone_number: number}
    };
    
    axios.request(options).then(function (response) {
    console.log(response.data);
    }).catch(function (error) {
    console.error(error);
    });

}



