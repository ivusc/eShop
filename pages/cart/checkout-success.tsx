import { Box, Container, Heading } from '@chakra-ui/react';
import { NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react'
import { paid } from '../../assets';
import { AnimatedHeading, GradientButton, Section } from '../../components';
import { CartContext } from '../../context/CartContext'
import { FontContext } from '../../context/FontContext';

const CheckoutSuccess : NextPage = () => {
  const { clearCart, cartItems } = useContext(CartContext);
  const { titleFontSize } = useContext(FontContext);

  useEffect(() => {
    clearCart();
  }, [cartItems])
  
  return (
    <Section delay={0.1}>
      <Container maxW={{base: '90%', md: '70%'}} height={'80vh'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
        <Box width={'30vw'} height={'30vh'} position={'relative'} overflow={'hidden'} borderRadius={'2xl'}>
          <Image src={paid} layout='fill' objectFit='contain'/>
        </Box>
        <AnimatedHeading>Paid Successfully!</AnimatedHeading>
        <Link href={'/'}>
          <GradientButton buttonType='green' mt={10} size={'lg'}>Go home 🏠</GradientButton>
        </Link>
      </Container>
    </Section>
  )
}

export default CheckoutSuccess