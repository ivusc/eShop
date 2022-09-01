import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  onAuthStateChanged, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signOut, 
  updateEmail, 
  updatePassword, 
  updateProfile, 
  UserCredential 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react'
import { IUser } from '../interfaces';
import { auth, db } from '../lib/firebase';

interface IAuthContext{
  currentUser: IUser | null | undefined;
  signup: ({ email, password }: IUserInput) => Promise<void>;
  login: ({ email, password }: IUserInput) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: ({ email }: { email: string; }) => Promise<void>;
  changeEmail: ({ email }: { email: string; }) => Promise<void>;
  changePassword: ({ password }: { password: string; }) => Promise<void>;
  updateUser: ({ photoUrl }: IUserInput) => Promise<void>;
}

export interface IUserInput{
  email: string;
  password: string;
  photoUrl?: string;
}

export const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<IUser|null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user !== null){
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

  const updateUser =  async ({ photoUrl }: IUserInput) => {
    const auth = getAuth();
    await updateProfile(auth.currentUser!, {
      photoURL: photoUrl,
    }).catch((error) => {
      alert(error)
    });
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
 
  const authData = {
    currentUser,
    signup,
    login,
    logout,
    updateUser,
    resetPassword,
    changeEmail,
    changePassword,
    loading
  }
  
  return (
    <AuthContext.Provider value={authData}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

