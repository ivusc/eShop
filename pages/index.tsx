import { Box, Container, Flex, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react';
import { GradientButton, Hero, ProductCard, Section } from '../components';
import { FontContext } from '../context/FontContext';
import { ProductsContext } from '../context/ProductsContext';
import { darkGradient, lightGradient } from '../constants';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { calcAvgRating } from '../lib/calcAvgRating';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';

const Home: NextPage<WithRouterProps> = ({router}) => {
  const { products } =  useContext(ProductsContext);
  const { headingFontSize } = useContext(FontContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <Section delay={0.1}>
      <Text textAlign={'center'}>Logged in as {currentUser?.email}</Text>
      <Hero />
      <Heading 
        id={'prods'}
        textAlign={'center'} 
        bgClip={'text'} 
        bgGradient={useColorModeValue(lightGradient,darkGradient)} 
        fontSize={headingFontSize} 
        fontWeight={'extrabold'}
        mt={'1em'}
      >Popular Products</Heading>
      <Container maxW={{base: '90%', md: '95%'}} mt={'2em'}>
        <SimpleGrid columns={{ base: 1, mdsm: 2, md: 4, lg: 5}} alignItems={'center'} spacing={4} mt={{base: 2, md: '3em'}}>
        {products?.map((product) => {
          const avgRating = calcAvgRating(product.prodRating);
          if (avgRating > 7){
            return(
              <Box alignSelf={'center'} justifySelf={'center'} width={{base: '90%', md: 'full'}} key={product.prodId}>
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
                />
              </Box>
            )
          }
        })}
      </SimpleGrid>
      <Heading 
        textAlign={'center'} 
        bgClip={'text'} 
        bgGradient={useColorModeValue(lightGradient,darkGradient)} 
        fontSize={headingFontSize} 
        fontWeight={'extrabold'}
        mt={'1em'}
        mb={'1em'}
      >Discounted Products</Heading>
      <SimpleGrid columns={{ base: 1, mdsm: 2, md: 4, lg: 5}} spacing={4} mt={{base: 2, md: '3em'}} mb={'1em'}>
        {products?.map((product) =>{
          const avgRating = calcAvgRating(product.prodRating);
          if (product.discount){
            return(
              <Box alignSelf={'center'} justifySelf={'center'} width={{base: '90%', md: 'full'}} key={product.prodId}>
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
                />
              </Box>
            )
          }
        })}
      </SimpleGrid>
      <Flex width={'full'} direction={'row'} justifyContent={'center'} alignItems={'center'}>
        <Link href={'/products'}>
          <GradientButton buttonType='green' size={'lg'}>All Products 👉</GradientButton>
        </Link>
      </Flex>
      </Container>
    </Section>
  )
}

export default withRouter(Home)

