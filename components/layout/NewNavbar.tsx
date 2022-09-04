import React, { useContext } from 'react';
import {
   Box,
   Flex,
   IconButton,
   Stack,
   Collapse,
   useColorModeValue,
   useDisclosure,
   Tooltip
 } from '@chakra-ui/react';
 import {
   HamburgerIcon,
   CloseIcon,
 } from '@chakra-ui/icons';
import { Logo } from './Logo';
import { ThemeButton } from './ThemeButton';
import Link from 'next/link';
import { MobileDrawer } from './MobileDrawer';
import { GradientButton } from '../common/GradientButton';
import { AuthContext } from '../../context/AuthContext';
import { darkGradient, hoverDarkGradient, hoverLightGradient, lightGradient, navMenu } from '../../constants';
import { WithRouterProps } from 'next/dist/client/with-router';
import { useAuth } from '../../hooks';
 
export const Navbar: React.FC<WithRouterProps> = ({router}) => {
  const { isOpen: mobileNavOpen, onToggle: toggleMobileNav } = useDisclosure();
  const mobileNavBtnRef = React.useRef(null);
  const { currentUser } = useContext(AuthContext);
  const { handleLogout } = useAuth(router);

   return (
     <Box position={'sticky'} top={0} as="nav" w="100%" zIndex={10}>
       <Flex
        //bg={'undefined'}
        bg={useColorModeValue('white', 'gray.900')}
         color={useColorModeValue('gray.600', 'white')}
         minH={'60px'}
         py={{ base: 3 , md: 2}}
         px={{ base: 2, md: 10 }}
         align={{base:'left', md:'center'}}>
         <Flex ml={{ base: '2em', mdsm: '2em', md: 0 }} flex={{ base: 1 }} justify={{base:'start', md: 'center'}}>
          <Logo hoverGradient={true} plBase={2} plMd={2} pyMd={2} pyBase={1} fontFamily={'heading'} fontSm={'lg'} fontMd={'xl'} fontLg={'2xl'}/>
           <Flex pt={{base: 0, md: 3}} display={{base: 'none', md:'flex'}} flex={{base:0, md:1}} justify={{base: 'center', md:'end'}} ml={10} px={{base:0, md:2}}>
             <DesktopNav />
           </Flex>
         </Flex>
 
         <Stack
           flex={{ base: 1, md: 0 }}
           justify={'flex-end'}
           display={{base: 'flex', md: 'none'}}
           direction={'row'}
           spacing={6}>
          <IconButton
             ref={mobileNavBtnRef}
             onClick={toggleMobileNav}
             variant={'outline'}
             icon={
              mobileNavOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
             }
             aria-label={'Toggle Navigation'}
           />
            <ThemeButton/>
         </Stack>
         <Stack
           flex={{ base: 1, md: 0 }}
           justify={'flex-end'}
           display={{base: 'none', md: 'flex'}}
           direction={'row'}
           spacing={6}>
            <ThemeButton/>
            {(currentUser === null) || (currentUser === undefined) ? (
            <Link href={'/auth'}>
              <GradientButton
                buttonType={'green'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}>
                Login
              </GradientButton>
            </Link>
            ) : (
              <>
              {navMenu.map((item) => {
                if (item.type === 'auth') return;
                return (
                  <Tooltip hasArrow key={item.ariaLabel} label={item.ariaLabel} bg={useColorModeValue('gray.50', 'gray.700')} color={useColorModeValue('gray.900','white')}>
                    <span>
                    <Link href={`${item.href}${currentUser.email}`}>
                      <IconButton 
                        icon={item.icon} 
                        aria-label={item.ariaLabel}
                        color={useColorModeValue('white','gray.900')}
                        bgGradient={useColorModeValue(lightGradient, darkGradient)}
                        _hover={{
                          bgGradient: useColorModeValue(hoverLightGradient, hoverDarkGradient),
                          transform: 'translateY(2px)',
                          boxShadow: 'lg',
                        }}
                      />
                    </Link>
                    </span>
                  </Tooltip>
                )
                })}
                <GradientButton 
                  buttonType={'red'}
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  onClick={handleLogout}
                >Logout</GradientButton>
              </>
            )}
         </Stack>
       </Flex>

       <Collapse in={mobileNavOpen} animateOpacity>
         <MobileDrawer 
            mobileNavOpen={mobileNavOpen}
            toggleMobileNav={toggleMobileNav}
            btnRef={mobileNavBtnRef}
            router={router}
          />
       </Collapse>

     </Box>
   );
 }
 
 const DesktopNav: React.FC = () => {
   const linkColor = useColorModeValue('gray.600', 'gray.200');
   const linkHoverColor = useColorModeValue('gray.800', 'white');
 
   return (
     <Stack direction={'row'} spacing={4}>
      
     </Stack>
   );
 };

 