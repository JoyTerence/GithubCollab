import { AuthSession } from 'expo';
import { queryUserName } from './utils/QueryUtils';

class GithubStore {
    
    constructor() {
        this.config = {
            authorizationEndpoint: `https://github.com/login/oauth/authorize`,
            tokenEndpoint: `https://github.com/login/oauth/access_token`,
            redirecturl: `http://localhost/github`,
            scopes: ['user'],
            clientId: '<Your APP Client ID>',
            clientSecret: '<Your APP Client Secret>'
        };

        /*
        * StorageKey is used for caching the OAuth Key in your app so you can use it later.
        * This can be any string value, but usually it follows this format: @AppName:NameOfValue
        */
        this.StorageKey = '@GithubTriage:GithubOAuthKey';
        this.redirectUrl = AuthSession.getRedirectUrl();
        this.token = ""
    }
    
    signInAsync = async () => {
      try {
        const { type, params } = await AuthSession.startAsync({
          authUrl: this.authUrlWithId(this.config),
        });
        if (type !== 'success') {
          // type === 'cancel' = if you cancel out of the modal
          // type === 'error' = if you click "no" on the redirect page
          return null;
        }
        // this is different to `type === 'error'`
        if (params.error) {
          const { error, error_description, error_uri } = params;
          /*
            If you didn't set the URI to match `REDIRECT_URL` in `https://github.com/settings/applications/...`
            error: "redirect_uri_mismatch",
            error_description: "The redirect_uri MUST match the registered callback URL for this application.",
          */
          if (error === 'redirect_uri_mismatch') {
            console.warn(
              `Please set the "Authorization callback URL" in your Github application settings to ${REDIRECT_URL}`
            );
          }
          throw new Error(`Github Auth: ${error} ${error_description}`);
        }
    
        const { token_type, scope, access_token } = await this.createTokenWithCode(
          params.code
        );
        // { token_type, scope, access_token }
        this.token = access_token
        return access_token;
      } catch ({ message }) {
        throw new Error(`Github Auth: ${message}`);
      }
    }

    authUrlWithId = (config) => {
      return (
        this.config.authorizationEndpoint +
        `?client_id=${config.clientId}` +
        `&redirect_uri=${encodeURIComponent(this.redirectUrl)}` +
        `&scope=${encodeURIComponent(this.config.scopes.join(' '))}`
      );
    }

    createTokenWithCode = async (code) => {
      
      const url =
        this.config.tokenEndpoint +
        `?client_id=${this.config.clientId}` +
        `&client_secret=${this.config.clientSecret}` +
        `&code=${code}`;
      
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      return res.json();
    }

    logout =  () => {
      this.token = ""
    }

    query = (queryString) => {
      return new Promise((resolve, reject) => {
        fetch("https://api.github.com/graphql" , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;',
            'Authorization': "bearer " + this.token,
          },
          body: queryString
        }).then((response) => response.json())
          .then((responseJson) => {  
            console.log(responseJson)
            resolve(responseJson)    
          }).catch( (err) => {
            console.log(err)
            reject(err)
          })
      })
    }  

    query_v3 = (restQuery) => {
      let restAPIURL = "https://api.github.com/" + restQuery
      console.log(restAPIURL)
      return new Promise((resolve, reject) => {
        fetch( restAPIURL , {
          method: 'GET',
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json;',
            'Authorization': "token " + this.token,
          },
        }).then((response) => response.json())
          .then((responseJson) => {  
            console.log(responseJson)
            resolve(responseJson)    
          }).catch( (err) => {
            console.log(err)
            reject(err)
          })
      })
    }  

    getUserName = () => {
      return new Promise((resolve, reject) => {
        console.log("getting username..")
        fetch("https://api.github.com/graphql" , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;',
            'Authorization': "bearer " + this.token,
          },
          body: queryUserName()
        }).then((response) => response.json())
          .then((responseJson) => {   
            resolve(responseJson)    
          }).catch( (err) => {
            console.log(err)
            reject(err)
          })
      })
    }

    isLoggedInWithGithub = () => {      
      return (this.token !== "")
    }

    getToken = () => {
      return this.token;
    }
} 

const Github = new GithubStore();
export default Github;







