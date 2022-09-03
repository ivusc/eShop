import { Box, Container, FormControl, FormLabel, Heading, HStack, Input, NumberInput, NumberInputField, Switch, Text, useToast, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import withRouter, { WithRouterProps } from 'next/dist/client/with-router'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { FileInput, GradientButton, Section } from '../../../components'
import { AuthContext } from '../../../context/AuthContext'
import { FontContext } from '../../../context/FontContext'

interface IUserInfo{
  name: string;
  phoneNumber: number;
  role: 'seller' | 'user';
}

const EditProfile : NextPage<WithRouterProps> = ({router}) => {
  const { headingFontSize, textFontSize } = useContext(FontContext)
  const { currentUser, updateUser, success } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const toast = useToast();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    updateUser({ name: userInfo?.name!, role: userInfo?.role === undefined ? 'seller' : userInfo.role })
    if(success) {
      toast({
        status: 'success',
        title: 'Successfully updated.',
        isClosable: true,
      })
    } else toast({
      status: 'error',
      title: 'Error updating.',
      isClosable: true,
    })
    router.push(`/profile/${currentUser?.email}`)
  }
  
  return (
    <Section delay={0.1}>
      <Container maxW={{base: '90%', md: '70%'}} display={'flex'} flexDir={'column'}>
        <Heading my={{base: '1em', md: '0.5em'}} justifySelf={'center'} alignSelf={'center'} fontWeight={'extrabold'} fontSize={headingFontSize}>Edit Profile</Heading>
        {(currentUser?.photoURL !== null && currentUser?.photoURL !== undefined) && (
          <>
            <Text fontSize={textFontSize} fontWeight={'semibold'}>Profile Image</Text>
            <Box mt={5} width={'180px'} height={'180px'} position={'relative'} overflow={'hidden'} borderRadius={'full'}>
              <Image src={currentUser?.photoURL} layout='fill' objectFit='cover'/>
            </Box>
          </>
        )}
        <form onSubmit={(e)=>handleSubmit(e)}>
        <VStack width={'100%'} alignSelf={'center'} mt={5} spacing={5}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={currentUser?.email!} isDisabled/>
          </FormControl>
          <FormControl>
            <FormLabel>Display Name</FormLabel>
            <Input placeholder={'Enter username'} defaultValue={currentUser?.displayName || ''} onChange={(e)=>setUserInfo({...userInfo!, name: e.target.value })}/>
          </FormControl>
          <FormControl display='flex' alignItems='center'>
            <FormLabel>Seller Account</FormLabel>
            <Switch colorScheme='green' isChecked={currentUser?.role === 'seller' ? true : undefined} onChange={(e) => setUserInfo({...userInfo!, role: e.target.checked ? 'seller' : 'user'})}/>
          </FormControl>
          <FormControl>
            <FormLabel>Update Profile Image</FormLabel>
            <FileInput type={'user'}/>
          </FormControl>
          <HStack spacing={5}>
            <GradientButton size={'lg'} buttonType={'orange'} onClick={()=>router.push(`/profile/${currentUser?.email}`)}>Cancel</GradientButton>
            <GradientButton type='submit' size={'lg'} buttonType={'green'} >Submit</GradientButton>
          </HStack>
        </VStack>
        </form>
      </Container>
    </Section>
  )
}

export default withRouter(EditProfile)