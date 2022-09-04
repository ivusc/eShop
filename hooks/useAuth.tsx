import { useToast } from '@chakra-ui/react';
import { NextRouter } from 'next/router';
import React, { FormEvent, useContext, useState } from 'react'
import { IAuthFormUser } from '../components/auth/AuthForm';
import { AuthContext } from '../context/AuthContext';

interface IStatus{
  error: string;
  loading: boolean;
}

export const useAuth = (router: NextRouter) => {
  const { login, signup, logout } = useContext(AuthContext);
  const toast = useToast();
  const [credentials, setCredentials] = useState<IAuthFormUser>({
    email: '', password: '', confirmPassword: '',
  });
  const [status, setStatus] = useState<IStatus>({
    error: '', loading: false
  })
  const [tabIndex, setTabIndex] = useState(0)

  const handleLogin = async (e?: FormEvent<HTMLFormElement>) =>{
    e?.preventDefault();
    const valid = validation('login');

    if (!valid) return;
    
    try{
      setStatus({...status, error: ''});
      setStatus({...status, loading: true });
      await login({ email: credentials.email, password: credentials.password })
      setCredentials({ email: '', password: '' });
      toast({
        title: `Logged in successfully`,
        status: 'success',
        isClosable: true,
        duration: 5000,
      })
      router.push('/')
    } catch (err){
      setStatus({...status, error: 'Failed to login.'});
      toast({
        title: `Failed to login`,
        status: 'error',
        isClosable: true,
      })
    }
    setStatus({...status, loading: false });
  }

  const handleSignup = async(e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const valid = validation('signup');

    if (!valid) return;

    try{
      setStatus({...status, error: ''});
      setStatus({...status, loading: true });
      await signup({ email: credentials.email, password: credentials.password })
      setCredentials({ email: '', password: '', confirmPassword: ''});
      toast({
        title: `Signed up successfully`,
        status: 'success',
        isClosable: true,
        duration: 5000,
      })
      router.push('/')
    } catch (err) {
      setStatus({...status, error: 'Failed to sign up.'});
      toast({
        title: `Failed to sign up`,
        status: 'error',
        isClosable: true,
      })
    }
    setStatus({...status, loading: false });
  }
  
  const handleKeyPress = ({ event, type }: {event: React.KeyboardEvent<HTMLDivElement>, type: 'login' | 'signup'}) => {
    if(event.key === 'Enter'){
      if (type === 'login') handleLogin();
      else handleSignup();
    }
  }

  const validation = (type: 'login' | 'signup') => {
    if (credentials.email === '' || credentials.password === ''){
      toast({
        title: `Email and password cannot be empty!`,
        status: 'error',
        isClosable: true,
      })
      return false;
    }
    if (type === 'signup'){
      if (credentials.confirmPassword !== credentials.password){
        toast({
          title: `Passwords entered needs to be the same!`,
          status: 'error',
          isClosable: true,
        })
        return false;
      }
    }
    return true;
  }

  const handleLogout = async () => {
    setStatus({...status, error: ''})
    try{
      await logout();
    } catch(err){
      setStatus({...status, error: 'Failed to logout'});
      toast({
        title: `Failed to logout`,
        status: 'error',
        isClosable: true,
      })
    }
    router.push('/')
  } 

  const changeTab = (index: number) => setTabIndex(index)

  return {
    tabIndex, setTabIndex, credentials, setCredentials, status, setStatus,
    handleLogin, handleSignup, handleKeyPress, changeTab, handleLogout
  }
}
