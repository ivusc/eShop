import { Container, Heading, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { ProductForm, Section } from '../../components'
import { FontContext } from '../../context/FontContext'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import { useProduct } from '../../hooks'

const CreateProduct : NextPage<WithRouterProps> = ({router}) => {
  const {
    setProduct, product, onAdd
  } = useProduct(router);
  const { titleFontSize, textFontSize } = useContext(FontContext);

  useEffect(() => {
    setProduct({
      prodName: '', prodDesc: '', prodPrice: 0, imageUrl: '', prodRating: 0, prodStock: 0, prodCategory: '',
    })
  }, [])

  return (
    <Section delay={0.1}>
      <Container maxW={{base: '90%', md: '70%'}} display={'flex'} flexDir={'column'}>
        <Heading fontSize={titleFontSize} alignSelf={'center'} mb={4} mt={4}>Create Product</Heading>
        {(product.imageUrl !== '' && product.imageUrl !== undefined) && (
          <>
            <Text fontSize={textFontSize} fontWeight={'semibold'}>Preview</Text>
            <Image 
              src={product.imageUrl} 
              height={600}
              width={'500'}
              objectFit={'cover'}
            />
          </>
        )}
        <Text>{product.imageUrl}</Text>
        <ProductForm 
          type={'create'}
          onSubmit={onAdd}
          product={product}
          setProduct={setProduct}
        />
      </Container>
    </Section>
  )
}

export default withRouter(CreateProduct)