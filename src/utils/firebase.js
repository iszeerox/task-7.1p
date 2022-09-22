import { initializeApp } from 'firebase/app';
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc, onSnapshot} from 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyDcGsR-UOovZbYrJTLyXHwzqT0xn-Dixcw",
    authDomain: "momin-web-app.firebaseapp.com",
    projectId: "momin-web-app",
    storageBucket: "momin-web-app.appspot.com",
    messagingSenderId: "662695680033",
    appId: "1:662695680033:web:5f7bf8ab358e6f983beb60"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters ({
    prompt: "select_account"

  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const CreateUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth.email ) return;

    const userDocRef = doc (db, 'users' , userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    

    if (! userSnapshot.exists()){
        const {displayName, email } = userAuth;
        const createdAt = new Date();
    
    try {
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
        })
    }
    catch (error){
    console.log('error in creating ', error.message)
    }
}
    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}