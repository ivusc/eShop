import { Box, Container, Heading, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import { NextPage } from 'next'
import withRouter, { WithRouterProps } from 'next/dist/client/with-router'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { CustomModal, ProductForm, Section } from '../../../components'
import { deleteModalContent } from '../../../constants'
import { FontContext } from '../../../context/FontContext'
import { useProduct } from '../../../hooks'

const EditProduct : NextPage<WithRouterProps> = ({router}) => {
  const { id } = router.query;
  const { titleFontSize } = useContext(FontContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    products, setProduct, product, setProdId,
    onUpdate, onDelete
  } = useProduct(router);

  useEffect(() => {
    const index = products.findIndex((product) => product.prodId === id);
    setProduct(products[index]);
    setProdId(products[index].prodId);
  }, [])

  if (product ===  undefined) return <Text>Loading...</Text>

  return (
    <Section delay={0.1}>
      <Container maxW={{base: '90%', md: '70%'}} display={'flex'} flexDir={'column'}>
        <Heading fontSize={titleFontSize} alignSelf={'center'} mb={8} mt={8}>Edit Product</Heading>
        {product !== undefined && (
          <Box 
            alignSelf={'center'}
            borderRadius={'2xl'} 
            bg={useColorModeValue('gray.200','gray.700')} 
            boxShadow={'lg'} 
            overflow={'hidden'} 
            alignItems={'center'} 
            position={'relative'} 
            w={'80%'} 
            h={{ base: '100%', sm: '400px', lg: '500px' }}
            mb={'3em'}
            >
            <Image alt={'product image'} src={product.imageUrl!} objectFit={'contain'} layout={'fill'}/>
          </Box>
        )}
        <ProductForm 
          type={'update'}
          product={product!}
          //@ts-ignore
          setProduct={setProduct}
          onSubmit={onUpdate}
          openDeleteModal={onOpen}
          router={router}
        />
        <CustomModal 
          type={'delete'}
          isOpen={isOpen} 
          onClose={onClose} 
          onAction={onDelete}
          header={deleteModalContent.header}
          description={deleteModalContent.description}
          action={deleteModalContent.action}
        />
      </Container>
    </Section>
  )
}

export default withRouter(EditProduct)