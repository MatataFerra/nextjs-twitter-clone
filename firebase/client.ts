import { initializeApp, getApp, deleteApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, UploadTask } from "firebase/storage"
import { getFirestore, collection, addDoc, Timestamp, getDocs, query, orderBy } from 'firebase/firestore'
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

const app = initializeApp(firebaseConfig, 'devter-matata');


const db = getFirestore(app);
const collectionRef = collection(db, 'devits');

export const onAuthStateChangedUser = (onChange: (user : Object | null | undefined) => void) => {
  return getAuth(app).onAuthStateChanged( user => {

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
  const auth = getAuth(app);
  return signInWithPopup(auth, provider);
};

export const addDevit = async ({avatar, content, userId, username, image}) => {

  const newDevit = {
    avatar,
    content,
    userId,
    username,
    image,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  }

  return await addDoc(collectionRef, newDevit);
};

export const fetchLatestDevits = async () => {

  const getDevits = await getDocs(query(collectionRef, orderBy('createdAt', 'desc')));
  
  return getDevits.docs.map( doc => {
    const data = doc.data()
    const { createdAt } = data;
    const id = doc.id;
    return {
      ...data,
      id,
      createdAt: +createdAt.toDate(),
    }
  } )
}

export const uploadImage = (file: File) : UploadTask => {
  const app = getApp('devter-matata');
  const storageRef = getStorage(app)
  const imageRef = ref(storageRef, `images/${file.name}`);
  const task = uploadBytesResumable(imageRef, file);
  
  return task
}
