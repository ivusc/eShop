import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Badge,
  useDisclosure,
  HStack,
  Icon,
} from '@chakra-ui/react';
import Image from 'next/image';
import { NextRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { addToCartModalContent, darkGradient, lightGradient } from '../../constants';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { FontContext } from '../../context/FontContext';
import { ProductsContext } from '../../context/ProductsContext';
import { IProduct } from '../../interfaces';
import { GradientButton } from '../common/GradientButton';
import { CustomModal } from './CustomModal';
import { CustomSlider } from './CustomSlider';
import { RatingDisplay } from './RatingDisplay';
import { RatingInput } from './RatingInput';

interface IDetails extends IProduct{
  onAdd: (qty:number) => void;
  router: NextRouter;
}


export const Details : React.FC<IDetails> = ({router, sellerEmail, prodName, prodPrice, imageUrl, prodDesc, prodId, prodCategory, prodRating, prodStock, onAdd }) => {
  const { textFontSize } = useContext(FontContext);
  const { currentUser } = useContext(AuthContext);
  const { updateRating } = useContext(ProductsContext);
  const { isProductBoughtBefore } = useContext(CartContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState(1);
  const [bought, setBought] = useState(false);
  const [totalRating, setTotalRating] = useState(0);
  const [ratingDone, setRatingDone] = useState(false);

  useEffect(()=>{
    const bought = isProductBoughtBefore({prodId: prodId!});
    setBought(bought);
  },[prodId])

  useEffect(()=>{
    setTotalRating(0);
    setRatingDone(false)
    prodRating.forEach((item) => {
      console.log(item.user)
      setTotalRating(totalRating => totalRating + item.rating)
      if (item.user === currentUser?.email) setRatingDone(true);
    })
  },[prodRating])

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 2 }}
        py={{ base: 18, md: 12 }}>
        <Flex direction={'column'}> 
          <Box borderRadius={'2xl'} boxShadow={'lg'} overflow={'hidden'} alignItems={'center'} justifyContent=      {'center'} position={'relative'} w={'90%'} h={{ base: '100%', sm: '400px', lg: '500px' }}>
            <Image alt={'product image'} src={imageUrl!} objectFit={'cover'} layout={'fill'}/>
          </Box>
          {((currentUser !== null) && !ratingDone && bought) && (
            <Box mt={4} display={'flex'} flexDir={'column'}>
              <Text textAlign={'center'}>You bought this product before.<br/>Please comment or rate the product.</Text>
              <RatingInput 
                size={28}
                scale={5}
                fillColor="gold"
                strokeColor="grey"
                updateRating={updateRating}
                prodId={prodId!}
              /> 
            </Box>
          )}
          {ratingDone && (
            <Box mt={4} display={'flex'} flexDir={'column'}>
              <Text textAlign={'center'}>You have already rated the product before.</Text>
            </Box>
          )}
        </Flex>
        
        <VStack spacing={{ base: 6, md: 10 }} alignItems={'left'}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {prodName}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}>
              ${prodPrice}
            </Text>
          </Box>
            <VStack spacing={{ base: 4, sm: 6 }} display={'flex'} flexDir={'column'} alignItems={'left'}>
              <Badge 
                borderRadius={'md'}
                width={'20%'}
                py={2}
                color={useColorModeValue('gray.200','gray.900')}
                textAlign={'center'} 
                bgGradient={useColorModeValue(lightGradient, darkGradient)}
              >{prodCategory}</Badge>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}>
                Seller: {sellerEmail}
              </Text>
              <Text fontSize={textFontSize}>
                <Text as={chakra.span} fontWeight={'semibold'}>Product Name: </Text> {prodName}
              </Text>
              <Text fontSize={'lg'}>
                <Text as={chakra.span} fontWeight={'semibold'}>Description: </Text> {prodDesc}
              </Text>
              <Text fontSize={'lg'}>
                <Text as={chakra.span} fontWeight={'semibold'}>Stock: </Text> {prodStock}
              </Text>
              <RatingDisplay rating={totalRating/prodRating.length} numReviews={prodRating.length} showNumReviews={true}/>
            </VStack>
            <Text fontWeight={'semibold'}>Select Quantity:</Text>
            <CustomSlider 
              prodStock={prodStock}
              quantity={quantity}
              setQuantity={setQuantity}
            />
            <GradientButton
              buttonType={'green'}
              textTransform={'uppercase'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              onClick={ currentUser !== null ? onOpen : ()=>router.push('/auth')}
            >
              Add To Cart
            </GradientButton>
          <HStack alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </HStack>
          </VStack>

        <CustomModal 
          isOpen={isOpen} 
          onClose={onClose} 
          onAction={()=>onAdd(quantity)}
          type={addToCartModalContent.type}
          header={addToCartModalContent.header}
          description={addToCartModalContent.description}
          action={addToCartModalContent.action}
          qty={quantity}
          prodName={prodName}
          prodPrice={prodPrice}
        />
      </SimpleGrid>
    </Container>
  );
}