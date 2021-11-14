import { initializeApp } from "firebase/app";
import { GithubAuthProvider, signInWithPopup, getAuth, UserCredential, onAuthStateChanged } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDT2iDJSbPLo1tUWIdCjHyBk082Blsprgg",
  authDomain: "devter-matata.firebaseapp.com",
  projectId: "devter-matata",
  storageBucket: "devter-matata.appspot.com",
  messagingSenderId: "803702439099",
  appId: "1:803702439099:web:21177303767a3dab76fd9e",
  measurementId: "G-428EQMZ2M7",
};

initializeApp(firebaseConfig);

export const onAuthStateChangedUser = (onChange: (user: Object) => void) => {
  return getAuth().onAuthStateChanged(user => {
    const { email,  photoURL, displayName } = user;
    const userNormalized = user ? {
      avatar: photoURL,
      username: displayName,
      email,
    } : null;
    onChange(userNormalized);
  });
}

export const loginWithGithub = (): Promise<UserCredential> => {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, provider);
};
