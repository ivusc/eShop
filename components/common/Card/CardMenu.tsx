import { IconButton, Menu, MenuButton, MenuItem, MenuList, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import Link from 'next/link';
import React, { useContext } from 'react'
import { BsThreeDots, BsTrash } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { deleteModalContent, hoverDarkGradient, hoverErrorDarkGradient, hoverErrorLightGradient, hoverLightGradient } from '../../../constants';
import { ProductsContext } from '../../../context/ProductsContext';
import { CustomModal } from '../../product/CustomModal';

interface ICardMenu{
  prodId: string;
}

export const CardMenu : React.FC<ICardMenu> = ({ prodId }) => {
  const { handleDelete, success, setProduct } = useContext(ProductsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onDelete = (e:any) => {
    e.preventDefault();
    setProduct({
      prodName: '', prodDesc: '', prodPrice: 0, imageUrl: '', prodRating: [], prodStock: 0, prodCategory: '',
    })
    handleDelete({id: prodId, e}).then(()=>{
      if (success){
        toast({
          title: `Deleted!`,
          status: 'success',
          isClosable: true,
          duration: 5000,
        })
      } else toast({
        title: `Failed to delete.`,
        status: 'error',
        isClosable: true,
      })
    })  
  }

  return (
    <Menu isLazy>
      <MenuButton 
        as={IconButton} 
        size={'sm'} 
        bg={'transparent'}
        position={'absolute'} 
        top={2} 
        right={2} 
        aria-label={'more'}
        icon={<BsThreeDots color='black'/>}
        _hover={{ bg: 'gray.500' }}
        _expanded={{ bg: 'gray.100' }}
        _focus={{ boxShadow: 'outline' }}
        />
        <MenuList 
          bg={useColorModeValue('gray.100','gray.900')} 
          color={useColorModeValue('gray.900','gray.100')}
        >
          <Link href={`/product/edit/${prodId}`}>
            <MenuItem icon={<FaEdit />} _hover={{ bgGradient: hoverLightGradient }} _dark={{ _hover: { bgGradient: hoverDarkGradient }}}>
              Edit
            </MenuItem>
          </Link>
          <MenuItem icon={<BsTrash />} _hover={{ bgGradient: hoverErrorLightGradient }} _dark={{ _hover: { bgGradient: hoverErrorDarkGradient }}} onClick={onOpen}>
            Delete
          </MenuItem>
        </MenuList>
        <CustomModal 
          isOpen={isOpen} 
          onClose={onClose} 
          onAction={onDelete}
          type={deleteModalContent.type}
          header={deleteModalContent.header}
          description={deleteModalContent.description}
          action={deleteModalContent.action}
        />
    </Menu>
  )
}
