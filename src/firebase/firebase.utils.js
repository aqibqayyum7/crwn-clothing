import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDtfzsgs4iQ6SjfrDVodE2eROaElG6wnWg",
    authDomain: "crwn-db-5aca1.firebaseapp.com",
    databaseURL: "https://crwn-db-5aca1.firebaseio.com",
    projectId: "crwn-db-5aca1",
    storageBucket: "crwn-db-5aca1.appspot.com",
    messagingSenderId: "932140950330",
    appId: "1:932140950330:web:bf816bda8c721c2413e603",
    measurementId: "G-ML6VP1FE7D"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log('error creating user', error.message);
    }
  }
  return userRef;

  console.log(snapShot);
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
