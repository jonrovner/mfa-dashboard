import { handleLogin } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
    try{
       
        await handleLogin(req, res,{
            authorizationParams: {
             // audience: process.env.AUTH0_ISSUER_BASE_URL + '/mfa/',
             // scope: 'openid read:authenticators remove:authenticators'
            },
            returnTo: '/mfa'})

    } catch (error){
        console.log("ERROR DURING MFA LOGIN", error)
    }



}