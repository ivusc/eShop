import { Box, Container, Divider, Grid, GridItem, Heading, HStack, Stat, StatLabel, StatNumber, Text, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import withRouter, { WithRouterProps } from 'next/dist/client/with-router'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { CustomIconButton, GradientButton, Section } from '../../components'
import { darkGradient, errorDarkGradient, errorLightGradient, iconButtonContent, lightGradient } from '../../constants'
import { FontContext } from '../../context/FontContext'
import { useCart } from '../../hooks'

const Cart : NextPage<WithRouterProps> = ({ router }) => {
  const { titleFontSize, smallFontSize } = useContext(FontContext);
  const {
    cartItems, products, total, setTotal, setCheckoutItems,
    redirectToInfoPage, handleDelete, handlePayment, handleEdit
  } = useCart(router);

  useEffect(() => {
    setTotal(0)
    setCheckoutItems([])
    cartItems?.forEach((item) => {
      if (item.paid === false) {
        const index = products.findIndex((prod) => prod.prodId === item.prodId);
        if (index === -1) return;
        setTotal(total => total + item.quantity*products[index].prodPrice);
        let checkoutItem = {
          ...products[index],
          quantity: item.quantity,
          cartId: item.cartId,
        }
        setCheckoutItems(checkoutItems => [...checkoutItems, checkoutItem])
      }
    })
  }, [cartItems])

  if (cartItems === undefined) return <Text>No items in cart.</Text>
  
  return (
    <Section delay={0.1}>
      <Container maxW={'7xl'} display={'flex'} flexDir={'column'} justifyContent={'space-between'} alignItems={'center'}>
        <Heading> My Cart 🛒</Heading>
        <>
        {cartItems?.map((cartItem,i) => {
          let productIndex: number = -1;
          if (cartItem.paid === false)
            productIndex = products.findIndex((item) => item.prodId === cartItem.prodId)
          if (productIndex !== -1)
            return (
              <React.Fragment key={i}>
                <VStack width={'100%'} alignItems={'start'} spacing={5} mb={'1em'}>
                  <Grid templateColumns={'repeat(12,1fr)'} gap={'3em'}>
                    <GridItem colSpan={2}>
                      <Box borderRadius={'2xl'} boxShadow={'lg'} overflow={'hidden'} alignItems={'center'} justifyContent={'center'} position={'relative'} w={32} h={32}>
                        <Image alt={'product image'} src={products[productIndex].imageUrl!} objectFit={'cover'} layout={'fill'}/>
                      </Box>
                    </GridItem>
                    <GridItem colSpan={6} display={'flex'} flexDir={'column'} alignItems={'left'} justifyContent={'space-evenly'}>
                      <Heading fontSize={titleFontSize} fontWeight={'bold'}>{products[productIndex].prodName}</Heading>
                      <Text fontSize={smallFontSize} fontWeight={'medium'}> USD ${products[productIndex].prodPrice}</Text>
                      {products[productIndex].prodStock > 0 ?
                        <Text fontSize={smallFontSize} as={'span'} bgClip={'text'} fontWeight={'medium'} bgGradient={useColorModeValue(lightGradient,darkGradient)}>
                          In Stock
                        </Text> : 
                        <Text fontSize={smallFontSize} as={'span'} bgClip={'text'} fontWeight={'medium'} bgGradient={useColorModeValue(errorLightGradient,errorDarkGradient)}>
                          Out of Stock
                        </Text> 
                      }
                    </GridItem>
                    <GridItem colSpan={2} display={'flex'} flexDir={'row'} alignItems={'center'} justifyContent={'center'}>
                      <Stat textAlign={'center'}>
                        <StatLabel>Quantity</StatLabel>
                        <StatNumber fontSize={titleFontSize}>{cartItem.quantity}</StatNumber>
                      </Stat>
                    </GridItem>
                    <GridItem colSpan={2} display={'flex'} flexDir={'row'} justifyContent={'center'} alignItems={'center'}>
                      <HStack spacing={5}>
                        {iconButtonContent.map((item,i) => {
                          let action: any;
                          if (item.ariaLabel === 'info') action = () => redirectToInfoPage(products[productIndex].prodId!)
                          else if (item.ariaLabel === 'remove from cart') 
                            action = () => handleDelete({
                              cartItemId: cartItem.cartId,
                              prodId: products[productIndex].prodId!,
                              qty: cartItem.quantity
                            })
      
                          return(
                          <React.Fragment key={i}>
                            <CustomIconButton
                              icon={item.icon}
                              lightGradient={item.lightGradient}
                              darkGradient={item.darkGradient}
                              hoverLightGradient={item.hoverLightGradient}
                              hoverDarkGradient={item.hoverDarkGradient}
                              lightColor={item.lightColor}
                              darkColor={item.darkColor}
                              ariaLabel={item.ariaLabel}
                              onAction={action}
                            />
                          </React.Fragment>
                          )
                        })}
                      </HStack>
                    </GridItem>
                  </Grid>
                  <Divider orientation='horizontal'/>
                </VStack>
                </React.Fragment>
            )
        })}
        </>
        <HStack alignItems={'space-between'} justifyContent={'space-between'} px={3} width={'full'}>
          <Heading>Total</Heading>
          <Heading>USD ${total}</Heading>
        </HStack>
        <GradientButton buttonType='green' size={'lg'} onClick={handlePayment}>Pay</GradientButton>
        {/* <PaymentForm isOpen={isOpen} onClose={onClose}/> */}
      </Container>
    </Section>
  )
}

export default withRouter(Cart)