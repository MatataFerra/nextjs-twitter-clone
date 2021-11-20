import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp, getDocs, query } from 'firebase/firestore'
import { GithubAuthProvider, signInWithPopup, getAuth, UserCredential } from "firebase/auth";

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
const db = getFirestore();
const collectionRef = collection(db, 'devits');

export const onAuthStateChangedUser = (onChange: (user : Object | null | undefined) => void) => {
  return getAuth().onAuthStateChanged( user => {

    const userNormalized = user ? {
      avatar: user?.photoURL,
      username: user?.displayName,
      email: user?.email,
      uid: user?.uid,
    } : null;
    onChange(userNormalized);
  });
}

export const loginWithGithub = (): Promise<UserCredential> => {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, provider);
};

export const addDevit = async ({avatar, content, userId, username}) => {


  const newDevit = {
    avatar,
    content,
    userId,
    username,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  }

  return await addDoc(collectionRef, newDevit);
};

export const fetchLatestDevits = async () => {

  const getDevits = await getDocs(query(collectionRef));
  
  return getDevits.docs.map( doc => {
    const data = doc.data()
    const { createdAt } = data;
    const date = new Date(createdAt.seconds * 1000);
    const normalizedCreatedAt = date.toLocaleDateString('es-AR', {year: 'numeric', month: 'numeric', day: 'numeric'});

    const id = doc.id;
    return {
      ...data,
      id,
      createdAt: normalizedCreatedAt,
    }
  } )
}
