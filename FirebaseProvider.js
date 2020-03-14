import firebase from 'firebase';
import '@firebase/firestore'
import Github from './GithubProvider';

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

class FirebaseStore {

    constructor() {
        this.firebaseConfig = {
            apiKey: "<Your API Key>",
            authDomain: "<Your domain>",
            databaseURL: "<Your DB Url>",
            projectId: "<Your project ID>",
            storageBucket: "<Your storage bucket>",
            messagingSenderId: "",
        }
        firebase.initializeApp(this.firebaseConfig)
        this.db = firebase.firestore();
        this.username = ""
    }

    connectFirebase = async () => {
      console.log("Connecting to Firebase...")
      let token = Github.getToken()
      const credential = firebase.auth.GithubAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential).then( res => {}).catch(function(error) {
        // Handle Errors here.
        console.log(error)
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/invalid-custom-token') {
          alert('The token you provided is not valid.');
        } else {
          console.error(error);
        }
        })
         
        Github.getUserName().then((res) => {
          this.username = res.data.viewer.name
        })  
      }

    addRepo = (repoDetails) => {
      console.log("Adding to Triaging list...")
      this.db.collection(this.username).doc(repoDetails.node.id).set(repoDetails)
    }

    removeRepo = (repoId) => {
      console.log("Removing from Triaging list...")
      this.db.collection(this.username).doc(repoId).delete()
    }

    getAllRepos = () => {
        return new Promise((resolve, reject) => {
            let docRef = this.db.collection(this.username);
            let allDocs = docRef.get()
                .then(snapshot => resolve(snapshot))
                .catch(err => console.log('Error getting documents', err));
        })
    }

    checkIfTriageRepo = (repoId) => {
        return new Promise((resolve, reject) => {
            this.db.collection(this.username).doc(repoId).get().then(function(doc) {
                if (doc.exists) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
                reject(error)
            });
        })
    }
}

const Firebasestore = new FirebaseStore();
export default Firebasestore;
