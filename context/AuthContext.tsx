import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signOut, 
  updateEmail, 
  updatePassword, 
  User, 
  UserCredential 
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../lib/firebase';

interface IAuthContext{
  currentUser: User | null | undefined;
  signup: ({ email, password }: IUser) => Promise<UserCredential>;
  login: ({ email, password }: IUser) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: ({ email }: { email: string; }) => Promise<void>;
  changeEmail: ({ email }: { email: string; }) => Promise<void>;
  changePassword: ({ password }: { password: string; }) => Promise<void>;
}

interface IUser{
  email: string;
  password: string;
}

export const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User|null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false)
    })
    return unsubscribe;
  }, [])
  

  const signup = ({ email, password }: IUser) => (
    createUserWithEmailAndPassword(auth,email, password)
  )

  const login = ({ email, password }: IUser) => (
    signInWithEmailAndPassword(auth, email, password)
  )

  const logout = () => signOut(auth);

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

