import { Checkbox, FormControl, FormLabel, Input, Link, Stack } from "@chakra-ui/react";
import { FormEvent } from "react";
import { IUser } from "../../interfaces";
import { GradientButton } from "../common/GradientButton";


interface IAuthForm{
  type: 'login' | 'signup';
  credentials: IAuthFormUser;
  setCredentials: React.Dispatch<React.SetStateAction<IAuthFormUser>>;
  handleSubmit: (e?: FormEvent<HTMLFormElement>) => Promise<void>;
  handleKeyPress: ({ event, type }: {
    event: React.KeyboardEvent<HTMLDivElement>;
    type: 'login' | 'signup';
  }) => void;
}

export interface IAuthFormUser{
  email: string;
  password: string;
  confirmPassword?: string;
}

export const AuthForm : React.FC<IAuthForm> = ({ type, credentials, handleKeyPress, setCredentials, handleSubmit }) => (
  <form onSubmit={(e) => handleSubmit(e)}>
    <Stack spacing={4}>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" value={credentials.email} onKeyDown={(e) => handleKeyPress({event: e, type: type})} onChange={(e)=>setCredentials({...credentials, email: e.target.value})}/>
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input type="password" value={credentials.password} onKeyDown={(e) => handleKeyPress({event: e, type: type})} onChange={(e)=>setCredentials({...credentials, password: e.target.value})}/>
      </FormControl>
      { type === 'signup' && (
        <FormControl id="repassword">
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" value={credentials.confirmPassword} onKeyDown={(e) => handleKeyPress({event: e, type: type})} onChange={(e)=>setCredentials({...credentials, confirmPassword: e.target.value})}/>
        </FormControl>
      )}
      <Stack spacing={10}>
      { type === 'login' && (
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          align={'start'}
          justify={'space-between'}>
          <Checkbox colorScheme='green'>Remember me</Checkbox>
          <Link color={'green.400'}>Forgot password?</Link>
        </Stack>
      )}
        <GradientButton
          buttonType={'green'}
          textTransform={'capitalize'}
          type={'submit'}
        >
          { type === 'login' ? 'Sign in' : 'Sign up'}
        </GradientButton>
      </Stack>
    </Stack>
  </form>
)