import { Container, Heading, useColorModeValue, chakra, HStack, Box, VStack, SimpleGrid, Text, Divider, Button, Badge } from '@chakra-ui/react'
import { NextPage } from 'next'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { GradientButton, ProductCard, Section } from '../../components'
import { darkGradient, lightGradient } from '../../constants'
import { AuthContext } from '../../context/AuthContext'
import { FontContext } from '../../context/FontContext'
import thumbnail from '../../assets/products/test.jpg'
import { ProductsContext } from '../../context/ProductsContext'
import { calcAvgRating } from '../../lib/calcAvgRating'
import withRouter, { WithRouterProps } from 'next/dist/client/with-router'
import Link from 'next/link'

const Profile : NextPage<WithRouterProps> = ({router}) => {
  const { currentUser, verifyEmail } = useContext(AuthContext);
  const { headingFontSize, titleFontSize, subtitleFontSize, textFontSize } = useContext(FontContext);
  const { products } = useContext(ProductsContext);

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])
  

  return (
    <Section delay={0.1}>
      <VStack>
        <Heading 
          bgClip={'text'} 
          bgGradient={useColorModeValue(lightGradient,darkGradient)} 
          fontSize={headingFontSize}
          fontWeight={'extrabold'}>
          My Profile
        </Heading>
        <VStack justifyContent={'center'} alignItems={'center'}>
          {(currentUser?.displayName !== null) ? (
            <>
              <Heading fontSize={textFontSize} fontWeight={'bold'}>Username: {currentUser?.displayName}</Heading>
              <Heading fontSize={textFontSize} fontWeight={'normal'}>Email: {currentUser?.email}</Heading>
            </>
          ) : <Heading fontSize={textFontSize} fontWeight={'normal'}>Email: {currentUser?.email}</Heading> 
          }
          {currentUser?.emailVerified ? (
            <Badge 
            borderRadius={'xl'}
            py={1}
            px={1}
            fontSize={'sm'}
            color={useColorModeValue('gray.200','gray.900')}
            textAlign={'center'} 
            bgGradient={useColorModeValue(lightGradient, darkGradient)}
          >Verified</Badge>
          ): (
            <Button variant={'ghost'} colorScheme={'green'} fontSize={'sm'} onClick={()=>verifyEmail()}>Click to verify</Button>
          )}
        </VStack>
      </VStack>
      <Container maxW={{base: '90%', md: '95%'}} mt={'2em'}>
        <VStack justifyContent={'center'} alignItems={'center'} spacing={5}>
          <Box width={'180px'} height={'180px'} position={'relative'} overflow={'hidden'} borderRadius={'full'}>
            <Image src={currentUser?.photoURL || thumbnail} layout='fill' objectFit='cover'/>
          </Box>
          <Link href={`/profile/edit/${currentUser?.email}`}>
            <GradientButton buttonType='green'>Edit Profile</GradientButton>
          </Link>
          <Link href={`/profile/discover`}>
            <GradientButton buttonType='green'>Discover Sellers</GradientButton>
          </Link>
        </VStack>
        <Divider mt={'3em'} height={'3px'} bgGradient={useColorModeValue(lightGradient, darkGradient)} orientation='horizontal'/>
        {currentUser?.role === 'seller' && (
          <>
            <Text fontWeight={'extrabold'} fontSize={titleFontSize} mt={2} mb={'1.5em'} textAlign={{base: 'center', md: 'start'}}>My Products</Text>
            <SimpleGrid columns={{ base: 1, mdsm: 2, md: 4, lg: 5}} spacing={4} mt={2}>
              {products.map((product) => {
                const avgRating = calcAvgRating(product.prodRating);
                if (product.sellerEmail === currentUser?.email){
                  return(
                    <Box alignSelf={'center'} justifySelf={'center'} width={{base: '90%', md: 'full'}}>
                      <ProductCard 
                        router={router}
                        prodCategory={product.prodCategory}
                        prodName={product.prodName} 
                        prodPrice={product.prodPrice} 
                        imageUrl={product.imageUrl} 
                        prodId={product.prodId!} 
                        prodDesc={product.prodDesc}
                        prodRating={product.prodRating}
                        prodStock={product.prodStock}
                        prodAvgRating={avgRating}
                        sellerEmail={product.sellerEmail}
                        key={product.prodId}
                      />
                    </Box>
                    )
                  }
                })}
              </SimpleGrid>
          </>
        )}
      </Container>
    </Section>
  )
}

export default withRouter(Profile)