import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { NextRouter } from 'next/router';
import React from 'react'
import { ICustomIconButton } from '../../interfaces';

interface ICustomButtonEvent extends ICustomIconButton{
  onAction : () => void;
}

export const CustomIconButton : React.FC<ICustomButtonEvent> = ({
  icon, lightGradient, darkGradient, hoverLightGradient, hoverDarkGradient, lightColor, darkColor, ariaLabel, onAction
}) => {

  return (
    <IconButton icon={icon} aria-label={ariaLabel} size={'lg'}
      rounded={'lg'}
      color={useColorModeValue(lightColor,darkColor)}
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
      onClick={onAction}
    />
  )
}
