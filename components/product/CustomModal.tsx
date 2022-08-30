import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { hoverDarkGradient, hoverErrorDarkGradient, hoverErrorLightGradient, hoverLightGradient } from '../../constants';
import { IModalContent } from '../../interfaces'
import { GradientButton } from '../common/GradientButton'

interface IModal extends IModalContent{
  isOpen: boolean;
  qty?: number;
  prodName?: string;
  prodPrice?: number;
  onClose: ()=>void;
  onAction: (e:any) => void;
}

export const CustomModal : React.FC<IModal> = (
  {type, header, description, qty, prodName, prodPrice, action, isOpen, onClose, onAction}
  ) => {
  
  const handleAction = (e:any) => {
    onClose();
    onAction(e);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('gray.100','gray.800')}>
          <ModalHeader>{header}</ModalHeader>
          {type === 'delete' ? (
            <ModalCloseButton 
            _hover={{
              _dark: {
                bgGradient: hoverDarkGradient,
              },
              bgGradient: hoverLightGradient,
            }}
          />
          ):(
            <ModalCloseButton 
            _hover={{
              _dark: {
                bgGradient: hoverErrorDarkGradient,
              },
              bgGradient: hoverErrorLightGradient,
            }}
          />
          )}
          <ModalBody>
            <Text fontWeight='medium' mb='1rem'>
              {description}
            </Text>
            {(type === 'addToCart')? (
              <>
                <Text>Product Name: {prodName} </Text>
                <Text>Quantity: {qty}</Text>
                <Text fontWeight={'semibold'} mt={'1em'}> Total Price: USD ${qty!*prodPrice!}</Text>
              </>
            ) : undefined}
          </ModalBody>

          <ModalFooter>
            {(type === 'delete') ? (
              <>
                <GradientButton buttonType={'red'} mr={3} onClick={(e)=>handleAction(e)}>
                  {action}
                </GradientButton>
              <GradientButton buttonType={'green'} px={6} onClick={onClose}>Close</GradientButton>
              </>
            ):(
              <>
                <GradientButton buttonType={'red'} mr={3} onClick={onClose}>
                  Close
                </GradientButton>
                <GradientButton buttonType={'green'} px={6} onClick={(e)=>handleAction(e)}>{action}</GradientButton>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}
