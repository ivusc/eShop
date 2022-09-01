import { useToast } from '@chakra-ui/react';
import { NextRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { ProductsContext } from '../context/ProductsContext';

export const useProduct = (router:NextRouter) => {
  const { products, success, handleUpdate, handleDelete, handleSubmit, setProduct, product } = useContext(ProductsContext);
  const [prodId, setProdId] = useState<string>();
  const toast = useToast();

  const onAdd = (e:any) =>{
    handleSubmit(e).then(() => {
      if (success){
        toast({
          title: `Submitted successfully!`,
          status: 'success',
          isClosable: true,
          duration: 5000,
        })
        setProduct({
          prodName: '', prodDesc: '', prodPrice: 0, imageUrl: '', prodRating: [], prodStock: 0, prodCategory: '',
        })
        return router.push('/');
      }
      else toast({
        title: `Failed to submit`,
        status: 'error',
        isClosable: true,
      })
      return;
    })
  }

  const onUpdate = (e:any) => {
    e.preventDefault();
    handleUpdate({id: prodId!}).then(()=>{
      if (success){
        toast({
          title: `Updated successfully!`,
          status: 'success',
          isClosable: true,
          duration: 5000,
        })
        setProduct({
          prodName: '', prodDesc: '', prodPrice: 0, imageUrl: '', prodRating: [], prodStock: 0, prodCategory: '',
        })
        return router.push('/');
      } else toast({
        title: `Failed to update.`,
        status: 'error',
        isClosable: true,
      })
      return;
    })
  } 

  const onDelete = (e:any) => {
    e.preventDefault();
    handleDelete({id: product.prodId!, e}).then(()=>{
      if (success){
        setProduct({
          prodName: '', prodDesc: '', prodPrice: 0, imageUrl: '', prodRating: [], prodStock: 0, prodCategory: '',
        })
        toast({
          title: `Deleted!`,
          status: 'success',
          isClosable: true,
          duration: 5000,
        })
        return router.push('/');
      } else toast({
        title: `Failed to delete.`,
        status: 'error',
        isClosable: true,
      })
    })  
  }
  
  return {
    products, success, handleUpdate, handleDelete, setProduct, product,
    prodId, setProdId,
    onAdd, onUpdate, onDelete
  }
}
