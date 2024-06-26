import axios from "axios";

export const listFactors = async (token) => {
    
    const listFactorsRequest = {
        method: 'GET',
        url: process.env.AUTH0_ISSUER_BASE_URL + '/mfa/authenticators',
        headers: { 'Authorization': 'Bearer '+ token },
      };
      try {
        const { data } = await axios.request(listFactorsRequest)
        console.log("FACTORS : ", data)
        return [...data.filter(factor => factor.active )]
      } 
      catch(e) {
        console.log("ERROR LISTING FACTORS", e);
      }
}

export const chanllengeWithPush = async (factor, token) => {
    
  const challengeRequest = {
        method: 'POST',
        url: process.env.AUTH0_ISSUER_BASE_URL+'/mfa/challenge',
        headers: {authorization: 'Bearer '+ token},
        data: new URLSearchParams({
        mfa_token: token,
        challenge_type:"oob",
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        authenticator_id: factor.id})
      }
    try {
        const {data} = await axios.request(challengeRequest)
        return data

    } catch(e){console.log("ERROR CHALLENGING > ", e);}
}

export const challengeWithOTP = async (token, factor) => {

  let challenge = {
    method: 'POST',
    url: process.env.AUTH0_ISSUER_BASE_URL+'/mfa/challenge',
    data: {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      challenge_type: 'otp',
      mfa_token: token,
      authenticator_id: factor.id
    }
  };
  try {

    const response = await axios.request(challenge)
    console.log("RESPONSE FROM AUTH0", response.data);
    return response.data

  }
  catch(error) {
    console.error("ERROR REQUESTING OTP CHALLENGE", error);
  };

}

export const verifyOTP = async (token, otp) => {

  const verifyRequest = {
    method: 'POST',
    url: process.env.AUTH0_ISSUER_BASE_URL +'/oauth/token',
    data: new URLSearchParams({
        grant_type: "http://auth0.com/oauth/grant-type/mfa-otp",
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        mfa_token: token,
        otp: otp
      })
  }

  try {
    const {data} = await axios.request(verifyRequest)
    console.log("RESPONSE FROM AUTH0", data);
    return data

  } catch (e) {

    console.log("ERROR VERIFYING: ", e.response.data);
    
  }



}

export const deleteFactor = async (factorID, access_token ) => {
  
    
      try {       
          let removeFactor = {
          method: 'DELETE',
          url: process.env.AUTH0_ISSUER_BASE_URL+'/mfa/authenticators/'+ encodeURIComponent(factorID),
          headers: {authorization: 'Bearer '+ access_token}
        };
        
         const response = await axios.request(removeFactor)
            console.log("response from remove", response);
            if (response.status == 204){
              return "OK"
            }
            
          } catch(error) {
            console.error("ERROR FINAL", error);
        }


     

}

export const pollForToken = async (code, token) => {
    while (true){
        const tokenRequest  = {
          method: 'POST',
          url: process.env.AUTH0_ISSUER_BASE_URL+'/oauth/token',
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          data: new URLSearchParams({
            grant_type: 'http://auth0.com/oauth/grant-type/mfa-oob',
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            mfa_token: token,
            oob_code: code
          })
        };
        try {
          const response = await axios.request(tokenRequest);
          if (response.data.access_token) {
            console.log('Access token received:', response.data);

            return response.data.access_token;
          
          } else {
            console.log('Waiting for access token...');
            await sleep(3000); // Wait for 3 seconds before the next request
          }
        } catch (error) {
          console.error('waiting for authorization:', error.message, error.response.data);
          await sleep(3000); // Wait for 3 seconds before the next request in case of an error
        }
      } 
}

export const enrollSMS = async (token, number) => {

  let options = {
    method: 'POST',
    url: process.env.AUTH0_ISSUER_BASE_URL+'/mfa/associate',
    headers: {authorization: 'Bearer '+token, 'content-type': 'application/json'},
    data: {authenticator_types: ['oob'], oob_channels: ['sms'], phone_number: number}
  };

  axios.request(options)
    .then(function (response) {

      console.log(response.data);
      return response.data
      
      })
    
    .catch(async function (error) {

        //console.log("ERROR RESPONSE", error.resposne);
      
        if(error.response.data.error_description == 'User is already enrolled.'){

            const factors = await listFactors(token)
            console.log("factors for sms: ", factors);
            
            const data = await chanllengeWith(factors[0], token)
            const code = data.oob_code

            const access_token = await pollForToken(code, token)

            if (access_token){
              
              let newoptions = {
                method: 'POST',
                url: process.env.AUTH0_ISSUER_BASE_URL+'/mfa/associate',
                headers: {authorization: 'Bearer '+token, 'content-type': 'application/json'},
                data: {authenticator_types: ['oob'], oob_channels: ['sms'], phone_number: number}
              };
            
              const res = await axios.request(newoptions)
              console.log("data from new enrollment", res.data);
              return res.data

            }

        }
        console.error("some other error", error.response.data);
      });


}

export const challengeWithEmail = async (token, factor) => {

  let emailchallengeRequest = {
    method: 'POST',
    url: process.env.AUTH0_ISSUER_BASE_URL+'/mfa/challenge',
    headers: {authorization: 'Bearer '+token, 'content-type': 'application/json'},
    data: {
      challenge_type: 'oob', 
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      authenticator_id: factor.id, 
      mfa_token: token}
  };

  try {
    const response = await axios.request(emailchallengeRequest)
    console.log("RESPONSE FROM AUTH0", response.data);
    return response.data

  } catch (e) {
    console.log("ERROR REQUESTING EMAIL CHALLENGE: ", e);
  }

}

export const confirmEmailchallenge = async (token, oob_code, user_code) => {

  let confirmRequest = {
    method: 'POST',
    url: process.env.AUTH0_ISSUER_BASE_URL+'/oauth/token',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
      grant_type: 'http://auth0.com/oauth/grant-type/mfa-oob',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      mfa_token: token,
      oob_code: oob_code,
      binding_code: user_code
    })
  };
  try {
    const response = await axios.request(confirmRequest)
    console.log("RESPONSE RROM AUTH0", response.data);
    return response.data

  } catch(e){
    console.log("ERROR CONFIRMING EMAIL OTP", e);
  }

}

export const enrollAfterChallenge = async (access_token) => {

  let options = {
    method: 'POST',
    url: process.env.AUTH0_ISSUER_BASE_URL+'/mfa/associate',
    headers: {
      authorization: 'Bearer '+access_token, 
      'content-type': 'application/json'},
    data: {authenticator_types: ['oob'], oob_channels:['auth0']}
  };
try {
  const response = await axios.request(options)
  return response.data
}
catch(error) {
    console.error(error);
};


}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

