import { Checkbox, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Categories, hoverDarkGradient, hoverErrorDarkGradient, hoverErrorLightGradient, hoverLightGradient } from '../../constants';
import { IModalContent } from '../../interfaces'
import { GradientButton } from '../common/GradientButton'

interface IModal extends IModalContent{
  isOpen: boolean;
  qty?: number;
  prodName?: string;
  prodPrice?: number;
  selectedCategories?: string[];
  size?: {
    base: string,
    md: string,
  };
  setSelectedCategory?: React.Dispatch<React.SetStateAction<string[]>>;
  onClose: ()=>void;
  onAction: (e:any) => void;
}

export const CustomModal : React.FC<IModal> = (
  {type, header, description, size, qty, prodName, prodPrice, action, isOpen, onClose, onAction, selectedCategories, setSelectedCategory}
  ) => {
  
  const handleAction = (e:any) => {
    onClose();
    onAction(e);
  }

  const removeFilter = (e:any) => {
    onClose();
    setSelectedCategory!([])
    onAction(e);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
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
            {(type === 'filter') ? (
              <VStack spacing={5} alignItems={'start'} justifyContent={'flex-start'}>
                {Categories.map((cat) => (
                  <Checkbox colorScheme={'green'} key={cat} value={cat} onChange={(e)=> selectedCategories?.includes(cat) ? setSelectedCategory!(selectedCategories => selectedCategories.filter((item) => item !== cat)) : setSelectedCategory!([...selectedCategories!, e.target.value])}>{cat}</Checkbox>
                ))}
              </VStack>
            ): undefined}
          </ModalBody>

          <ModalFooter>
            {(type === 'delete') ? (
              <>
                <GradientButton buttonType={'red'} mr={3} onClick={(e)=>handleAction(e)}>
                  {action}
                </GradientButton>
              <GradientButton buttonType={'green'} px={6} onClick={onClose}>Close</GradientButton>
              </>
            ): undefined}
            {(type === 'addToCart') ? (
              <>
                <GradientButton buttonType={'red'} mr={3} onClick={onClose}>
                  Close
                </GradientButton>
                <GradientButton buttonType={'green'} px={6} onClick={(e)=>handleAction(e)}>{action}</GradientButton>
              </>
            ):undefined}
            {(type === 'filter') ? (
              <>
                <GradientButton buttonType={'red'} mr={3} onClick={onClose}>
                  Close
                </GradientButton>
                <GradientButton buttonType={'orange'} mr={3} onClick={(e)=>removeFilter(e)}>
                  Remove filter
                </GradientButton>
                <GradientButton buttonType={'green'} px={6} onClick={(e)=>handleAction(e)}>{action}</GradientButton>
              </>
            ):undefined}
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}
