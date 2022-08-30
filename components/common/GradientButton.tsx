import { Button, ButtonProps, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { darkGradient, errorDarkGradient, errorLightGradient, hoverDarkGradient, hoverErrorDarkGradient, hoverErrorLightGradient, hoverLightGradient, hoverWarningDarkGradient, hoverWarningLightGradient, lightGradient, warningDarkGradient, warningLightGradient } from '../../constants'

interface IButtonProps extends ButtonProps{
  buttonType: 'green' | 'red' | 'orange'; 
  children: React.ReactNode;
}

export const GradientButton : React.FC<IButtonProps> = (props) => {
  const { children, buttonType, ...rest } = props;

  let theme = {
    lightgradient: '',
    darkgradient: '',
    hoverLight: '',
    hoverDark: '',
    colorLight: '',
    colorDark: '',
  }

  switch(buttonType){
    case 'green':
      theme = {
        lightgradient: lightGradient,
        darkgradient: darkGradient,
        hoverLight: hoverLightGradient,
        hoverDark: hoverDarkGradient,
        colorLight: 'white',
        colorDark: 'gray.900',
      };
    break;

    case 'red':
      theme = {
        lightgradient: errorLightGradient,
        darkgradient: errorDarkGradient,
        hoverLight: hoverErrorLightGradient,
        hoverDark: hoverErrorDarkGradient,
        colorLight: 'white',
        colorDark: 'white',
      };
    break;
    
    case 'orange':
      theme = {
        lightgradient: warningLightGradient,
        darkgradient: warningDarkGradient,
        hoverLight: hoverWarningLightGradient,
        hoverDark: hoverWarningDarkGradient,
        colorLight: 'white',
        colorDark: 'white',
      }
    break;

  }

  return (
    <Button
      rounded={'lg'}
      bgGradient={ useColorModeValue(theme.lightgradient, theme.darkgradient) }
      color={ useColorModeValue(theme.colorLight, theme.colorDark) }
      _hover={{
        transform: 'translateY(2px)',
        boxShadow: 'lg',
        _dark:{
          bgGradient: theme.hoverDark,
        },
        _light: {
          bgGradient: theme.hoverLight
        }
      }}
      {...rest}
      >
      {children}
    </Button>
  )
}
