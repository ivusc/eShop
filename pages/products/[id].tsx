import { Text, useToast } from '@chakra-ui/react';
import { NextPage } from 'next'
import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { Details, Section } from '../../components';
import { ProductsContext } from '../../context/ProductsContext';
import { useCart } from '../../hooks';

const ProductDetails : NextPage<WithRouterProps> = ({ router }) => {
  const { id } = router.query;
  const { products, product, setProduct } = useContext(ProductsContext);
  const { onAddToCart } = useCart(router);

  useEffect(() => {
    const index = products.findIndex((product) => product.prodId === id);
    setProduct(()=>products[index])
  }, [products])

  if (product ===  undefined) return <Text>Loading...</Text>
  
  return (
    <Section delay={0.1}>
      <Details 
        router={router}
        sellerEmail={product.sellerEmail}
        prodCategory={product.prodCategory}
        prodName={product.prodName} 
        imageUrl={product.imageUrl} 
        prodPrice={product.prodPrice} 
        prodId={product.prodId!} 
        prodDesc={product.prodDesc}
        prodRating={product.prodRating}
        prodStock={product.prodStock}
        onAdd={onAddToCart}
      />
    </Section>
  )
}

export default withRouter(ProductDetails)