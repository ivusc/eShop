import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  chakra,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { useContext } from 'react';
import Image from 'next/image';

import { darkGradient, lightGradient } from '../constants';
import { FontContext } from '../context/FontContext';
import HeroSvg from '../assets/hero.svg';
import { GradientButton } from './common/GradientButton';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';
import { ChevronRightIcon } from '@chakra-ui/icons';


export const Hero : React.FC = () => {
  const { headingFontSize } = useContext(FontContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Stack
        as={Box}
        textAlign={'center'}
        alignItems={'center'}
        spacing={{ base: 8, md: 14 }}
        py={10}>
        <Box width={{ base: '80vw', md: '30vw'}} height={{ base: '80vw', md: '30vh' }} position={'relative'} overflow={'hidden'} borderRadius={'2xl'}>
          <Image src={HeroSvg} layout='fill' objectFit='contain'/>
        </Box>
        <Heading
          fontWeight={700}
          textTransform={'full-width'}
          fontSize={headingFontSize}
          lineHeight={'110%'}>
          The Best<br />
          <Heading fontWeight={700} fontSize={headingFontSize} lineHeight={'110%'} textTransform={'full-width'} as={'span'} bgClip={'text'} bgGradient={useColorModeValue(lightGradient,darkGradient)}>
            E-Commerce&nbsp;
          </Heading>
          Site.
        </Heading>
        <Text width={'90%'}>
          The most unified ecommerce platform for order management and recurring billing
          to lasting customer bonds.
        </Text>
        <Stack
          direction={'column'}
          spacing={3}
          align={'center'}
          alignSelf={'center'}
          position={'relative'}>
          <Link href={!currentUser ? '/auth' : '/products'}>
            <GradientButton
              buttonType={'green'}
              size={'lg'}
            >
              {!currentUser ? 'Login' : 'Start Shopping'} &nbsp;
              <Icon as={ChevronRightIcon} fontSize={20} />
            </GradientButton>
          </Link>
          <Button variant={'link'} colorScheme={'green'} size={'sm'}>
            Learn more
          </Button>
        </Stack>
      </Stack>
    </>
  );
}