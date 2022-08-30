import { FaSun, FaMoon } from 'react-icons/fa';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { darkGradient, hoverDarkGradient, hoverLightGradient, lightGradient } from '../../constants';

export const ThemeButton : React.FC = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={useColorModeValue('light', 'dark')}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
      <IconButton
        aria-label="Toggle theme"
        variant={'solid'} mr={'0.25em'}
        rounded={'lg'}
        color={useColorModeValue('white','gray.900')}
        bgGradient={useColorModeValue(lightGradient,darkGradient)}
        _hover={{
          transform: 'translateY(2px)',
          boxShadow: 'lg',
          _light: {
            bgGradient: hoverLightGradient
          },
          _dark: {
            bgGradient: hoverDarkGradient
          }
        }}
        icon={useColorModeValue(<FaSun />, <FaMoon />)}
        onClick={toggleColorMode}
      ></IconButton>
    </motion.div>
  </AnimatePresence>
  )
}