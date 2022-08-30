import { Avatar, Box, Button, Flex, Heading, HStack, IconButton, Text, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { GradientButton } from '../common/GradientButton'
import { FaShoppingCart } from 'react-icons/fa' 
import { ThemeButton } from './ThemeButton'

export const Navbar : React.FC = () => {
  const toast = useToast();
  const { currentUser,logout } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setError('');
    try{
      await logout();
    } catch(err){
      setError('Failed to logout');
      toast({
        title: `Failed to logout`,
        status: 'error',
        isClosable: true,
      })
    }
    console.log(currentUser)
  } 

  return (
    <Box bg={'gray.900'} position={'sticky'} top={0} zIndex={10}>
      <Flex minH={'60px'} align={'center'} justify={'space-between'} px={8} py={4} display={{base: 'none', mdlg: 'flex'}}>
        <HStack spacing={5}>
          <Link href={'/'}>
            <Heading size={'md'} pt={2} color={'white'} _hover={{ cursor: 'pointer'}}>Logo</Heading>
          </Link>
          <HStack color={'white'} spacing={6}>
            {currentUser &&(
              <Text as={Link} href={'/products/create'}>Create Product</Text>
            )}
          </HStack>
        </HStack>
        <HStack flex={{ base: 1, md: 0 }} spacing={6}>
          <ThemeButton />
          {(currentUser === null) || (currentUser === undefined) ? (
            <Link href={'/auth'}>
              <GradientButton
                buttonType={'green'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}>
                Login
              </GradientButton>
            </Link>
          ) : (
            <>
              <Link href={`/cart/${currentUser.email}`}>
                <IconButton 
                  icon={<FaShoppingCart />} 
                  aria-label={'cart'}
                  _hover={{
                    transform: 'translateY(2px)',
                    boxShadow: 'lg',
                    bg: 'gray.300'
                  }}
                />
              </Link>
              <GradientButton 
                buttonType={'green'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                onClick={handleLogout}
              >Logout</GradientButton>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  )
}