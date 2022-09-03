import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  onAuthStateChanged, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signOut, 
  updateEmail, 
  updatePassword, 
  updatePhoneNumber, 
  updateProfile, 
  UserCredential 
} from 'firebase/auth';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { createContext, useEffect, useState } from 'react'
import { v4 } from 'uuid';
import { IUser } from '../interfaces';
import { auth, db, storage } from '../lib/firebase';

interface IAuthContext{
  currentUser: IUser | null | undefined;
  signup: ({ email, password }: IUserInput) => Promise<void>;
  login: ({ email, password }: IUserInput) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: ({ email }: { email: string; }) => Promise<void>;
  changeEmail: ({ email }: { email: string; }) => Promise<void>;
  changePassword: ({ password }: { password: string; }) => Promise<void>;
  updateUser: ({ name, role }: {
    name: string;
    role: 'seller' | 'user';
  }) => Promise<void>;
  updateProfileImg: (picture: File) => void;
  verifyEmail: () => void;
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUserInput{
  email: string;
  password: string;
  photoUrl?: string;
  name?: string;
  phoneNumber?: number;
}

export const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<IUser|null>();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user){
        const docRef = doc(db,'users',user?.email!);
        getDoc(docRef).then((doc) => {
            setCurrentUser({
              ...user,
              role: doc.data()?.role,
            })
        })
      } else setCurrentUser(null);
      setLoading(false)
    })
    return unsubscribe;
  }, [])

  const signup = async ({ email, password }: IUserInput) => {
    createUserWithEmailAndPassword(auth,email, password);
    const docRef = doc(db,'users',email);
    await setDoc(docRef,{
      role: 'user',
    },{ merge: true })
  }

  const login = ({ email, password }: IUserInput) => (
    signInWithEmailAndPassword(auth, email, password)
  )

  const logout = () => signOut(auth);

  const updateProfileImg = (picture: File) => {
    setCurrentUser({...currentUser!, photoURL: null})
    if (picture === null) return;
    const imgRef = ref(storage, `users/${picture.name + v4()}`)
    uploadBytes(imgRef, picture).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) =>{
        setCurrentUser({...currentUser!, photoURL: url})
        alert(`Successfully uploaded. Url: ${url}`)
      })
    })
  }

  const updateUser =  async ({ name, role }: { name: string, role: 'seller' | 'user' }) => {
    setSuccess(false);
    const auth = getAuth();
    try{
      setCurrentUser({...currentUser!, displayName: name!});
      await updateProfile(auth.currentUser!, {
        displayName: name,
        photoURL: currentUser?.photoURL,
      }).catch((error) => {
        alert(error)
      });
      const userRef = doc(db,'users',currentUser?.email!)
      await setDoc(userRef,{
        role: role,
      },{ merge: true })
      setSuccess(true)
    } catch (err) {
      alert(err);
    }
  }

  const resetPassword = ({email}: {email: string}) =>(
    sendPasswordResetEmail(auth,email)
  )

  const changeEmail = ({ email }: { email: string}) => (
    updateEmail(currentUser!,email)
  )

  const changePassword = ({ password }: { password: string }) => (
    updatePassword(currentUser!, password)
  )

  const verifyEmail = () =>{
    const auth = getAuth();
    sendEmailVerification(auth.currentUser!).then(() => {
      alert('Reload page after verifying to see the effect!')
    })
    
  }
 
  const authData = {
    currentUser,
    signup,
    login,
    logout,
    updateUser,
    updateProfileImg,
    resetPassword,
    changeEmail,
    changePassword,
    verifyEmail,
    loading,
    success,
    setSuccess,
  }
  
  return (
    <AuthContext.Provider value={authData}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

