import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Logo } from './Logo';

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'semibold'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export const Footer : React.FC = () => {
  return (
    <Box
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={{base: '90%', md: '6xl'}} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'} display={{base: 'none', md: 'flex'}}>
            <ListHeader>eShop App</ListHeader>
            <Link href={'#'}>Overview</Link>
            <Link href={'#'}>Features</Link>
            <Link href={'#'}>FAQ</Link>
          </Stack>
          <Stack align={'flex-start'} display={{base: 'none', md: 'flex'}}>
            <ListHeader>Company</ListHeader>
            <Link href={'#'}>About Us</Link>
            <Link href={'#'}>Contact Us</Link>
            <Link href={'#'}>Partners</Link>
          </Stack>
          <Stack align={'flex-start'} display={{base: 'none', md: 'flex'}}>
            <ListHeader>Legal</ListHeader>
            <Link href={'#'}>Cookies Policy</Link>
            <Link href={'#'}>Privacy Policy</Link>
          </Stack>
          <Stack align={'flex-start'} display={{base: 'none', md: 'flex'}}>
            <ListHeader>Follow Us</ListHeader>
            <Link href={'#'}>Facebook</Link>
            <Link href={'#'}>Twitter</Link>
            <Link href={'#'}>Instagram</Link>
            <Link href={'#'}>LinkedIn</Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          <Logo fontFamily={'heading'} hoverGradient={false} />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © 2022 eShop. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}