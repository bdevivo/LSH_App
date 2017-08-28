# LifeSciHub App

## Configuration

A configuration file called `.env` must be created and placed in the root folder of the application. This file contains secret key information for Auth0 and AWS, and should not be checked into Git. The values in thie file will be copied into the existing file `.env.default` at run time. Contact the administrator for a copy of the `.env` file.

## Authorization

LifeSchiHub uses [**Auth0**](https://auth0.com/) for authentication, basic authorization, and some user profile information. To manage users, you will need to be invited to administer the LSH Web App on Auth0.

There are 3 types of users in LSH, all of which are controlled by metadata in the users's Auth0 profile:

1. **talent**: these are users who have signed up using the button "Sign up to find work". In Auth0, their app_metadata property will have the following entry:
``` 
    "roles": [
        "talent"
    ]
```
2. **buyer**: these are users who have signed up using the button "Sign up to hire resources". In Auth0, their app_metadata property will have the following entry:
``` 
    "roles": [
        "buyer"
    ]
```
2. **admin**: these users must be configured directly in Auth0, via either the Users tab or the "Set roles to a user" custom rule on the Rules tab. Their app_metadata property will have the following entry:
``` 
    "roles": [
        "admin"
    ]
```

## Database

LSH uses MongoDB for persistence; a running instance of Mongo must be accessible for the application to start successfully. For running in development, connection information can be found in `tools/srcServer.js` (this code should be modified as apprpriate for your environment).  For running in production (currently configured to use Heroku), connection information can be found in `tools/prodServer.js`.


## Running in Development


