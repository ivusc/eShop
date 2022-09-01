import { Container, Flex, FormLabel, Heading, HStack, Input, SimpleGrid, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { WithRouterProps } from 'next/dist/client/with-router'
import { withRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { AnimatedHeading, CustomModal, GradientButton, ProductCard, Section } from '../components'
import { darkGradient, lightGradient } from '../constants'
import { FontContext } from '../context/FontContext'
import { ProductsContext } from '../context/ProductsContext'
import { IProduct } from '../interfaces'
import { calcAvgRating } from '../lib/calcAvgRating'

const Products : NextPage<WithRouterProps> = ({router}) => {
  const { headingFontSize } = useContext(FontContext);
  const { products } = useContext(ProductsContext);
  const [productsCopy, setProductsCopy] = useState([] as Array<IProduct>);
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>([])
  
  
  useEffect(() => {
    setProductsCopy(products);
  },[products])


  const filterCategories = () => {
    console.log(selectedCategories)
    if (selectedCategories.length === 0){
      setProductsCopy(products);
      return;
    }
    setProductsCopy([])
    products.forEach((product) => {
      if (selectedCategories.includes(product.prodCategory)){
        console.log(product)
        setProductsCopy(productsCopy => [...productsCopy, product])
      }
    })
    setSelectedCategories([])
  }

  const handleSubmitQuery = () => {
    setProductsCopy([])
    products.forEach((product) => {
      console.log(product.prodName)
      if ((product.prodName.toLowerCase()).includes(searchQuery.toLowerCase())){
        setProductsCopy(productsCopy => [...productsCopy, product])
      }
    })
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if(event.key === 'Enter'){
      handleSubmitQuery();
    }
    if (searchQuery.length == 1){
      setProductsCopy(products);
    }
  }
  

  return (
    <Section delay={0.1}>
      <Container maxW={{base: '90%', md: '95%'}}>
        <Heading
          textAlign={'center'} 
          bgClip={'text'} 
          bgGradient={useColorModeValue(lightGradient,darkGradient)} 
          fontSize={headingFontSize} 
          fontWeight={'extrabold'}
          mt={'0.5em'}
        >All Products</Heading>
        <HStack spacing={5} justifyContent={'center'} alignItems={'center'} mt={'2em'}>
          <Input placeholder='Search for products...' size={'lg'} width={'75%'} onChange={(e) => setSearchQuery(e.target.value)}  onKeyDown={handleKeyPress}/>
          <GradientButton buttonType='green' size={'lg'} onClick={searchQuery === '' ? onOpen : ()=>handleSubmitQuery()}>
            {searchQuery !== '' ? 'Search' : 'Filter'}
          </GradientButton>
        </HStack>
        <SimpleGrid columns={{ base: 1, mdsm: 2, md: 3, lg: 4, xl: 5}} alignItems={'center'} spacing={4} mt={{base: 2, md: '3em'}}>
        {productsCopy.map((product) => {
          const avgRating = calcAvgRating(product.prodRating);
          return(
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
            )
          })}
        </SimpleGrid>
        {(productsCopy.length === 0) && (
          <VStack>
            <AnimatedHeading>No products found.</AnimatedHeading>
          </VStack>
        )}
      </Container>
      <CustomModal 
        isOpen={isOpen}
        onClose={onClose}
        onAction={filterCategories}
        header={'Filter Categories'}
        type={'filter'}
        description={'Select the categories to filter.'}
        action={'Filter'}
        selectedCategories={selectedCategories}
        setSelectedCategory={setSelectedCategories}
        size={'xl'}
        />
    </Section>
  )
}

export default withRouter(Products)