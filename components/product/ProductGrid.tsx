import { SimpleGrid } from '@chakra-ui/react';
import { NextRouter } from 'next/router';
import React from 'react'
import { IProduct } from '../../interfaces';
import { calcAvgRating } from '../../lib/calcAvgRating';
import { ProductCard } from '../common/Card';

interface IProductGrid{
  products: Array<IProduct>;
  router: NextRouter;
}

export const ProductGrid : React.FC<IProductGrid> = ({products, router}) => {

  return (
    <SimpleGrid columns={{ base: 1, mdsm: 2, md: 3, lg: 4, xl: 5}} justifyContent={'center'} alignItems={'center'} spacing={4} mt={{base: 2, md: '3em'}}>
    {products.map((product) => {
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
  )
}
