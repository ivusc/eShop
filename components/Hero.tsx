import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  chakra,
  useColorModeValue
} from '@chakra-ui/react';
import { useContext } from 'react';
import Image from 'next/image';

import { darkGradient, lightGradient } from '../constants';
import { FontContext } from '../context/FontContext';
import HeroSvg from '../assets/hero.svg';
import { GradientButton } from './common/GradientButton';


export const Hero : React.FC = () => {
  const { headingFontSize } = useContext(FontContext);
  return (
    <>
      <Stack
        as={Box}
        textAlign={'center'}
        alignItems={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 10 }}>
        <Box width={'30vw'} height={'30vh'} position={'relative'} overflow={'hidden'} borderRadius={'2xl'}>
          <Image src={HeroSvg} layout='fill' objectFit='contain'/>
        </Box>
        <Heading
          fontWeight={700}
          textTransform={'full-width'}
          fontSize={headingFontSize}
          lineHeight={'110%'}>
          The Best<br />
          <Text as={'span'} bgClip={'text'} bgGradient={useColorModeValue(lightGradient,darkGradient)}>
            E-Commerce&nbsp;
          </Text>
          Site.
        </Heading>
        <Text>
          The most unified ecommerce platform for order management and recurring billing
          to lasting customer bonds.
        </Text>
        <Stack
          direction={'column'}
          spacing={3}
          align={'center'}
          alignSelf={'center'}
          position={'relative'}>
          <chakra.a href={'#prods'}>
            <GradientButton
              buttonType={'green'}
              px={10}
              py={4}
            >
              Start Shopping &gt;
            </GradientButton>
          </chakra.a>
          <Button variant={'link'} colorScheme={'green'} size={'sm'}>
            Learn more
          </Button>
        </Stack>
      </Stack>
    </>
  );
}