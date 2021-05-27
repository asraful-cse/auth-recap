import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase-config';
import { useState } from 'react';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);  // // error solving code
}else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [user, setUser] = useState({});
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();   // facebook er jonno..
  var ghProvider = new firebase.auth.GithubAuthProvider();  

  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {

        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
console.log(user);
setUser(user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email );
      });
  }

  const handleFacebookSignIn = () =>{
    firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      var credential = result.credential;
      var user = result.user;
      var accessToken = credential.accessToken;
  console.log('fb sign in user', user);
setUser(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
console.log(errorCode,errorMessage, email, credential );
    });
  }

 const handleGithubSignIn = () =>{
  firebase
  .auth()
  .signInWithPopup(ghProvider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    console.log('github sign in',user);

    // setUser(user)

  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log('error',errorCode,errorMessage, email, credential );
  });
 }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn} >Sign in using Google</button>
      <br />
      <button onClick={handleFacebookSignIn} >Sign in using Facebook</button>
      <br />
      <button onClick={handleGithubSignIn} >Sign in using Github</button>
      <br />
      <h1>User Name: {user.displayName}</h1>
      <h3>Your Email: {user.email}</h3>
      <h1>FB User: {user.displayName}</h1>
      <img src={user.photoURL} alt="" />
      <h3>github : {user.accessToken}</h3>
    </div>
  );
}

export default App;
