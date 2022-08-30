import { 
  Heading, 
  keyframes 
} from '@chakra-ui/react';
import React from 'react';

interface IAnimatedHeading{
  children?: React.ReactNode;
}

export const AnimatedHeading: React.FC<IAnimatedHeading> = ({children}) => {
  const colors = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 0%; }
  `
  return (
    <Heading 
      fontSize={{base:'5xl', md:'7xl'}} 
      mt={4}
      mb={4} 
      animation={`${colors} 7.5s linear infinite`}
      backgroundImage={`linear-gradient(30deg,
        #68d391,
        #87c567,
        #a3b441,
        #bda026,
        #d5881f,
        #e76b31,
        #f1494c,
        #f0226d,
        #f1494c,
        #e76b31,
        #d5881f,
        #bda026,
        #a3b441,
        #87c567,
        #68d391
        )`}
      backgroundSize={`1100% 100%`}
      position={'inherit'}
      bgClip={{base: 'text', md: undefined}}
      fontWeight='bold'
      >
      {children}
    </Heading>
  )
}