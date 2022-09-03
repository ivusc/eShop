import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Container, Divider, Grid, GridItem, Heading, Hide, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Stat, StatLabel, StatNumber, Text, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import withRouter, { WithRouterProps } from 'next/dist/client/with-router'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import { BsTrash } from 'react-icons/bs'
import { FaInfo } from 'react-icons/fa'
import { CustomIconButton, GradientButton, Section } from '../../components'
import { darkGradient, errorDarkGradient, errorLightGradient, hoverDarkGradient, hoverErrorDarkGradient, hoverErrorLightGradient, hoverLightGradient, iconButtonContent, lightGradient } from '../../constants'
import { FontContext } from '../../context/FontContext'
import { useCart } from '../../hooks'
import { ICart, IProduct } from '../../interfaces'

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
      <Container maxW={{base: '95%', md: '80%'}} display={'flex'} flexDir={'column'} justifyContent={'space-between'} alignItems={'center'}>
        <Heading mb={{base: '1em', md: '0.5em'}} mt={{ base: '1em', md: '0.5em'}}> My Cart 🛒</Heading>
        <>
        {cartItems?.map((cartItem,i) => {
          let productIndex: number = -1;
          if (cartItem.paid === false)
            productIndex = products.findIndex((item) => item.prodId === cartItem.prodId)
          if (productIndex !== -1)
            return (
              <React.Fragment key={i}>
                <VStack width={'100%'} alignItems={'start'} spacing={5} mb={'1em'}>
                  <Grid templateColumns={'repeat(12,1fr)'} gap={{base: '2em', md: '3em'}}>
                    <GridItem colSpan={{base: 3, md: 2}}>
                      <Box borderRadius={'2xl'} boxShadow={'lg'} overflow={'hidden'} alignItems={'center'} justifyContent={'center'} position={'relative'} w={{base: 20, md: 32}} h={{base: 20, md: 32}}>
                        <Image alt={'product image'} src={products[productIndex].imageUrl!} objectFit={'cover'} layout={'fill'}/>
                      </Box>
                    </GridItem>
                    <GridItem colSpan={{base: 5, md: 6}} display={'flex'} flexDir={'column'} alignItems={'left'} justifyContent={'space-evenly'}>
                      <Heading fontSize={titleFontSize} fontWeight={'bold'} noOfLines={1}>{products[productIndex].prodName}</Heading>
                      <Text fontSize={smallFontSize} fontWeight={'medium'} noOfLines={1}> USD ${products[productIndex].prodPrice}</Text>
                      {products[productIndex].prodStock > 0 ?
                        <Text fontSize={smallFontSize} as={'span'} bgClip={'text'} fontWeight={'medium'} bgGradient={useColorModeValue(lightGradient,darkGradient)}>
                          In Stock
                        </Text> : 
                        <Text fontSize={smallFontSize} as={'span'} bgClip={'text'} fontWeight={'medium'} bgGradient={useColorModeValue(errorLightGradient,errorDarkGradient)}>
                          Out of Stock
                        </Text> 
                      }
                    </GridItem>
                    <GridItem colSpan={{base: 1, md: 2}} display={'flex'} flexDir={'row'} alignItems={'center'} justifyContent={'center'}>
                      <Stat textAlign={'center'}>
                        <StatLabel display={{base:'none', md: 'flex'}}>Quantity</StatLabel>
                        <StatNumber fontSize={titleFontSize}>{cartItem.quantity}</StatNumber>
                      </Stat>
                    </GridItem>
                    <GridItem colSpan={{base: 3, md: 2}} display={'flex'} flexDir={'row'} justifyContent={{base: 'start', md:'end'}} alignItems={'center'}>
                      <Hide below={'md'}>
                        <MdButtonContent
                          products={products}
                          productIndex={productIndex}
                          redirectToInfoPage={redirectToInfoPage}
                          handleDelete={handleDelete}
                          cartItem={cartItem}
                        />
                      </Hide>
                      <Hide above={'md'}>
                        <SmButtonContent 
                          products={products}
                          productIndex={productIndex}
                          redirectToInfoPage={redirectToInfoPage}
                          handleDelete={handleDelete}
                          cartItem={cartItem}
                        />
                      </Hide>
                    </GridItem>
                  </Grid>
                  <Divider orientation='horizontal'/>
                </VStack>
                </React.Fragment>
            )
        })}
        </>
        <HStack alignItems={'space-between'} justifyContent={'space-between'} px={3} width={'full'} mb={'1.5em'}>
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

interface IButtonContent {
  products: IProduct[];
  productIndex: number;
  redirectToInfoPage: (prodId: string) => Promise<boolean>;
  handleDelete: ({ cartItemId, prodId, qty }: {
    cartItemId: string;
    prodId: string;
    qty: number;
  }) => Promise<void>;
  cartItem: ICart;
}

const MdButtonContent : React.FC<IButtonContent> = ({ redirectToInfoPage, products, productIndex, cartItem, handleDelete }) => (
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
)

const SmButtonContent : React.FC<IButtonContent> = ({ cartItem, productIndex, products, handleDelete}) => {
  
  const handleRemove = () => {
    handleDelete({
      cartItemId: cartItem.cartId,
      prodId: products[productIndex].prodId!,
      qty: cartItem.quantity
    });
  }

  return (
    <Menu isLazy closeOnSelect>
      <MenuButton
        as={IconButton}
        icon={<ChevronDownIcon />}
        bg={'transparent'}
        variant={'outline'}
      />
      <MenuList 
          bg={useColorModeValue('gray.100','gray.900')} 
          color={useColorModeValue('gray.900','gray.100')}
        >
        <Link href={`/product/${products[productIndex].prodId}`}>
          <MenuItem icon={<FaInfo />} _hover={{ bgGradient: hoverLightGradient }} _dark={{ _hover: { bgGradient: hoverDarkGradient }}}>
            Details
          </MenuItem>
        </Link>
        <MenuItem icon={<BsTrash />} _hover={{ bgGradient: hoverErrorLightGradient }} _dark={{ _hover: { bgGradient: hoverErrorDarkGradient }}} onClick={handleRemove}>
          Remove
        </MenuItem>
      </MenuList>
    </Menu>
  )
}