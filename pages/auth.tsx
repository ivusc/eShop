import {
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  useToast,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Button,
  Container,
} from '@chakra-ui/react';
import { NextPage } from 'next'
import { WithRouterProps } from 'next/dist/client/with-router';
import Image from 'next/image';
import { withRouter } from 'next/router';
import React from 'react'
import { login as loginPic } from '../assets';
import { AuthForm, Section } from '../components';
import { useAuth } from '../hooks';

const Auth : NextPage<WithRouterProps> = ({router}) => {
  const {
    tabIndex, credentials, setCredentials,
    handleLogin, handleSignup, handleKeyPress, changeTab
  } = useAuth(router);

  return (
    <Section delay={0.1}>
      <Container maxW={{base: 'full', md:'100%'}}>
        <SimpleGrid 
          columns={{base: 1, md: 2}} 
          spacing={8} 
          px={{base: 2, md: 24}} 
          py={8}
          mt={'3em'}
          >
          <GridItem display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
            <Box width={'100%'} height={'300px'} position={'relative'} overflow={'hidden'} borderRadius={'2xl'}>
              <Image layout={'fill'} src={loginPic} objectFit='contain'/>
            </Box>
          </GridItem>
          <GridItem width={'100%'} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
            <Stack align={'center'} mb={3}>
              <Heading fontSize={{base:'2xl', md:'4xl'}}>Login to your account</Heading>
              <Text fontSize={{base: 'xl', md: 'lg'}}>
                to start <Text as={'span'} fontWeight={600} color={'green.500'}>shopping</Text>! ✌️
              </Text>
              <Text fontSize={'lg'} textAlign={'center'}>
                Dont have an account? Sign up for one&nbsp;
                <Button variant={'link'} colorScheme={'green'} onClick={()=>changeTab(1)}>here</Button>.
              </Text>
            </Stack>
            <Box
              width={'100%'}
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'lg'}
              py={8}
              px={{base: 4, md: 8}}>
              <Tabs variant='soft-rounded' colorScheme='green' index={tabIndex} onChange={changeTab}>
                <TabList>
                  <Tab>Login</Tab>
                  <Tab>Signup</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <AuthForm
                      type={'login'}
                      credentials={credentials}
                      handleKeyPress={handleKeyPress}
                      setCredentials={setCredentials}
                      handleSubmit={handleLogin}
                      />
                  </TabPanel>
                  <TabPanel>
                    <AuthForm
                      type={'signup'}
                      credentials={credentials}
                      handleKeyPress={handleKeyPress}
                      setCredentials={setCredentials}
                      handleSubmit={handleSignup}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Container>
    </Section>
  )
}

export default withRouter(Auth)