import { Container, Heading, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import type { NextPage } from 'next'
import { useContext } from 'react';
import { Hero, ProductCard, Section } from '../components';
import { FontContext } from '../context/FontContext';
import { ProductsContext } from '../context/ProductsContext';
import { darkGradient, lightGradient } from '../constants';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

const Home: NextPage<WithRouterProps> = ({router}) => {
  const { products, loading, handleDelete } =  useContext(ProductsContext);
  const { headingFontSize,titleFontSize } = useContext(FontContext);

  return (
    <Section delay={0.1}>
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
      {/* {loading === true ? <p>Updating Products ...</p> : <p>Products updated</p>} */}
      <Container maxW={{base: '90%', md: '95%'}}>
        <SimpleGrid columns={{ base: 1, mdsm: 2, md: 5}} alignItems={'start'} spacing={4} mt={{base: 2, md: '3em'}}>
        {products?.map((product) => (
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
            sellerEmail={product.sellerEmail}
            key={product.prodId}
          />
        ))}
      </SimpleGrid>
      <Heading 
        textAlign={'center'} 
        bgClip={'text'} 
        bgGradient={useColorModeValue(lightGradient,darkGradient)} 
        fontSize={headingFontSize} 
        fontWeight={'extrabold'}
        mt={'1em'}
      >Discounted Products</Heading>
    </Container>
    {/* <Box width={'100%'} height={'100%'} position={'relative'} zIndex={0}>
      <Image src={waves} objectFit={'contain'} layout={'fill'}/>
    </Box> */}
    </Section>
  )
}

export default withRouter(Home)

