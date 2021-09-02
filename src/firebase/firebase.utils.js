import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDYuUykDLBzoGyqFUME6m5NMaGQW1DaUtU",
  authDomain: "crwn-db-8c11d.firebaseapp.com",
  projectId: "crwn-db-8c11d",
  storageBucket: "crwn-db-8c11d.appspot.com",
  messagingSenderId: "135646930087",
  appId: "1:135646930087:web:ba20af7bd4798bf9dd6782",
  measurementId: "G-6RN5T5PWJ2",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
