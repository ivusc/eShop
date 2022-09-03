import { Container, Flex, FormLabel, Heading, HStack, Input, SimpleGrid, Stack, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { WithRouterProps } from 'next/dist/client/with-router'
import { withRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { AnimatedHeading, CustomModal, GradientButton, ProductCard, ProductGrid, Section } from '../components'
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
        <Stack direction={{base: 'column', md: 'row'}} spacing={5} mb={'2em'} justifyContent={'center'} alignItems={'center'} mt={'2em'}>
          <Input placeholder='Search for products...' size={'lg'} width={{base:'95%', md:'50%'}} onChange={(e) => setSearchQuery(e.target.value)}  onKeyDown={handleKeyPress}/>
          <GradientButton buttonType='green' size={'lg'} onClick={searchQuery === '' ? onOpen : ()=>handleSubmitQuery()}>
            {searchQuery !== '' ? 'Search' : 'Filter'}
          </GradientButton>
        </Stack>
        <ProductGrid
          products={productsCopy}
          router={router}
        />
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
        size={{base: 'md', md: 'xl'}}
        />
    </Section>
  )
}

export default withRouter(Products)