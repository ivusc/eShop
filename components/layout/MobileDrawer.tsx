import { 
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  StackDivider,
  useColorModeValue, 
  VisuallyHidden
} from "@chakra-ui/react";
import Link from "next/link";
import { NextRouter } from "next/router";
import { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

import { darkGradient, errorDarkGradient, errorLightGradient, hoverErrorDarkGradient, hoverErrorLightGradient, lightGradient, navMenu } from "../../constants";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../hooks";
import { Logo } from "./Logo";


interface IMobileDrawer {
  mobileNavOpen: boolean;
  toggleMobileNav: () => void;
  btnRef: any,
  router: NextRouter,
}

interface IMobileNavItems {
  label: string;
  href: string;
  onClose: () => void;
  handleLogout: () => Promise<void>;
  icon: JSX.Element;
  type: 'nav' | 'auth';
}

export const MobileDrawer: React.FC<IMobileDrawer> = ({mobileNavOpen, toggleMobileNav, btnRef, router}) => {
  const gradient = useColorModeValue(lightGradient,darkGradient);
  const { currentUser } = useContext(AuthContext);
  const { handleLogout } =  useAuth(router);

  return(
    <Drawer
        isOpen={mobileNavOpen}
        placement='right'
        onClose={toggleMobileNav}
        finalFocusRef={btnRef}
        variant={useColorModeValue('light','dark')}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton 
            _hover={{
              _dark: {
                bgGradient: hoverErrorDarkGradient,
              },
              bgGradient: hoverErrorLightGradient,
            }}
          />
          <DrawerHeader>
            <Logo 
              onClose={toggleMobileNav} 
              fontSm={'lg'} 
              fontMd={'xl'} 
              fontLg={'3xl'} 
              pyBase={2}
              pxBase={1}
              fontFamily={'heading'}
              />
          </DrawerHeader>

          <DrawerBody>
            <Stack
              mt={'5em'}
              px={3}
              pb={5}
              divider={<StackDivider height={'2px'} bgGradient={gradient} />}
              display={{ md: 'none' }}>
                <VisuallyHidden />
                <MobileNavItem 
                  href={'/'}
                  icon={<FaHome size={20}/>}
                  label={'Home'}
                  type={'nav'}
                  onClose={toggleMobileNav}
                  handleLogout={handleLogout}
                />
                {navMenu.map((item) => {
                  if ((!currentUser) && (item.type === 'auth')){
                    console.log('here')
                    return <MobileNavItem 
                      href={item.href}
                      icon={item.icon}
                      label={item.ariaLabel}
                      onClose={toggleMobileNav}
                      type={item.type}
                      handleLogout={handleLogout}
                    />
                  } else if (item.type === 'nav' && (currentUser)) {
                    return <MobileNavItem 
                    href={`${item.href}${currentUser?.email}`}
                    icon={item.icon}
                    label={item.ariaLabel}
                    onClose={toggleMobileNav}
                    type={item.type}
                    handleLogout={handleLogout}
                  />
                  }
                })}
                {currentUser && (
                  <MobileNavItem 
                  href={'/'}
                  icon={<HiOutlineLogout size={20}/>}
                  label={'Logout'}
                  type={'auth'}
                  onClose={toggleMobileNav}
                  handleLogout={handleLogout}
                />
                )}
              
              <VisuallyHidden />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
  )
 }

const MobileNavItem: React.FC<IMobileNavItems> = ({ label, href, icon, onClose, handleLogout, type }) => {
  const handleClick = () => {
    handleLogout();
    onClose();
  }

  return (
    <Link href={href}>
      <Box 
        display={'flex'}
        flexDir={'row'}
        fontWeight={'semibold'}
        borderRadius={'lg'}
        onClick={ type === 'auth' ?  handleClick : onClose}
        p={{base: 2, md: 4}}
        _hover={{ 
          color: label === 'Logout' ? 'white' : 'gray.900',
          cursor: 'pointer',
          bgGradient: label === 'Logout' ? useColorModeValue(errorLightGradient, errorDarkGradient) : useColorModeValue(lightGradient,darkGradient),
        }}>
          <>
            {icon} &nbsp;&nbsp;
            {label}
          </>
      </Box>
    </Link>
   );
};