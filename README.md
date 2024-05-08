# MFA Dashboard Sample Application with Auth0 Next.js SDK

This sample demonstrates the integration of [Auth0 Next.js SDK](https://github.com/auth0/nextjs-auth0) into a MFA DASHBOARD application created using [create-next-app](https://nextjs.org/docs/api-reference/create-next-app). 

Auth0 provides a built-in multi-factor authentication (MFA) enrollment and authentication flow using Universal Login.

The [MFA API](https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-developer-resources/mfa-api) allows you to build an interface to let users manage their own authentication factors.

To use the MFA API, you must enable the MFA grant type for your application in Auth0 Dashboard. 

This sample demonstrates the following use cases:

- [Authenticate with ROPG to query Auth0 MFA API](https://auth0.com/docs/secure/multi-factor-authentication/authenticate-using-ropg-flow-with-mfa)

- [List enrolled authenticators.](https://auth0.com/docs/secure/multi-factor-authentication/manage-mfa-auth0-apis/manage-authenticator-factors-mfa-api#list-authenticators)

- [Request and confirm email challenge.](https://auth0.com/docs/secure/multi-factor-authentication/authenticate-using-ropg-flow-with-mfa/enroll-and-challenge-email-authenticators)

- [Challenge and verify OTP factor](https://auth0.com/docs/secure/multi-factor-authentication/authenticate-using-ropg-flow-with-mfa/enroll-and-challenge-otp-authenticators)

- [Enroll Push authenticator](https://auth0.com/docs/secure/multi-factor-authentication/authenticate-using-ropg-flow-with-mfa/enroll-and-challenge-otp-authenticators)

- [Remove MFA authenticators](https://auth0.com/docs/secure/multi-factor-authentication/manage-mfa-auth0-apis/manage-authenticator-factors-mfa-api)

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```



### Configure credentials

The project needs to be configured with your Auth0 Domain, Client ID and Client Secret for the authentication flow to work.

To do this, first copy `.env.local.example` into a new file in the same folder called `.env.local`, and replace the values with your own Auth0 application credentials (see more info about [loading environmental variables in Next.js](https://nextjs.org/docs/basic-features/environment-variables)):

```sh
# A long secret value used to encrypt the session cookie
AUTH0_SECRET='LONG_RANDOM_VALUE'
# The base url of your application
AUTH0_BASE_URL='http://localhost:3000'
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN.auth0.com'
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
# Your Auth0 API's Identifier 
# OMIT if you do not want to use the API part of the sample
AUTH0_AUDIENCE=AUTH_ISSUER_BASE_URL+'/mfa/'
# The permissions your app is asking for
# OMIT if you do not want to use the API part of the sample
AUTH0_SCOPE='openid profile list:authenticators remove:authenticators enroll'
```

**Note**: Make sure you replace `AUTH0_SECRET` with your own secret (you can generate a suitable string using `openssl rand -hex 32` on the command line).

## Run the sample

### Compile and hot-reload for development

This compiles and serves the Next.js app and starts the API server on port 3001.

```bash
npm run dev
```

## Deployment

### Compiles and minifies for production

```bash
npm run build
```

## Author

[Auth0](https://auth0.com) & [Jonathan Rovner](https://github.com/jonrovner)

## License

This project is licensed under the MIT license. See the [LICENSE](./LICENSE) file for more info.
