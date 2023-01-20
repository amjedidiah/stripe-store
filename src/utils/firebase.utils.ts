import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
  UserCredential,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { Category } from "redux/redux.types";
import { isProduction } from "./env.util";

type ObjectToAdd = {
  title: string;
};

export interface UserData extends User {
  [x: string]: any;
  displayName: string | null;
  createdAt?: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyC6EfY1EgJD45ZHOT8aGipRcmkya_I3FDM",
  authDomain: "crwn-clothing-db-737c5.firebaseapp.com",
  projectId: "crwn-clothing-db-737c5",
  storageBucket: "crwn-clothing-db-737c5.appspot.com",
  messagingSenderId: "680287199237",
  appId: "1:680287199237:web:45e240fa663c7d6e0c3c6c",
  measurementId: "G-0MH8Z2MXSP",
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth(); // export const auth = getAuth(app);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | void> =>
  await createUserWithEmailAndPassword(auth, email, password);
export const signInAuthWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | void> =>
  await signInWithEmailAndPassword(auth, email, password);
export const signOutAuth = async (): Promise<void> => await signOut(auth);
export const onAppAuthStateChanged = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> =>
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });

export const db = getFirestore();
export const createUserFromAuth = async (
  userAuth: User
): Promise<void | QueryDocumentSnapshot<User>> => {
  if (!userAuth) return;

  const { uid, displayName, email } = userAuth;
  const userDocRef = doc(db, "users", uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
      await updateProfile(auth.currentUser as User, { displayName });
    } catch (error) {
      if(!isProduction) console.log("error", error);
    }
  }

  return userSnapShot as QueryDocumentSnapshot<User>;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const getCategoriesAndDocuments = async (
  collectionName: string
): Promise<Category[]> => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef);

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data() as Category);
};
