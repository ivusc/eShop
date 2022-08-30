import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react';
import { darkGradient, hoverDarkGradient } from '../../../constants';
import { IProduct } from '../../../interfaces';
import React, { useContext } from 'react';
import { WithRouterProps } from 'next/dist/client/with-router';
import { CardMenu } from './CardMenu';
import { AuthContext } from '../../../context/AuthContext';
import { RatingDisplay } from '../../product/RatingDisplay';

export const ProductCard : React.FC<IProduct & WithRouterProps> = (
  {sellerEmail, prodName, prodPrice, imageUrl, prodId, prodRating, router }) => {
  
  const { currentUser } = useContext(AuthContext);

  return (
      <Box
        role={'group'}
        pb={8}
        mb={5}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'lg'}
        rounded={'lg'}
        pos={'relative'}
        overflow={'hidden'}
        zIndex={1}
        _hover={{
          transform: 'scale(1.05)',
          WebkitTransform: 'scale(1.05)',
          cursor:'pointer',
          color: 'white',
          _light: {
            bgGradient: darkGradient,
          },
          _dark: {
            bgGradient: hoverDarkGradient,
          }
        }}
        >
        {sellerEmail === currentUser?.email ? (<CardMenu prodId={prodId!} />) : undefined}
        <Box onClick={()=>{router.push(`/products/${prodId}`)}}>
          <Image
            height={230}
            width={'100%'}
            objectFit={'cover'}
            src={imageUrl}
          />
          <Stack pt={10} align={'center'}>
            <Text color={useColorModeValue('gray.500','gray.200')} fontSize={'sm'} textTransform={'uppercase'}>
              {sellerEmail}
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {prodName}
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Text fontWeight={800} fontSize={'xl'} color={useColorModeValue('gray.500','gray.200')}>
                $ {prodPrice}
              </Text>
            </Stack>
            <RatingDisplay rating={prodRating} showNumReviews={false} />
          </Stack>
        </Box>
      </Box>
  );
}