import { useToast } from '@chakra-ui/react';
import { NextRouter } from 'next/router';
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ProductsContext } from '../context/ProductsContext';
import { ICartProduct } from '../interfaces';
import { getStripe } from '../lib/getStripe';

export const useCart = (router:NextRouter) => {
  const { cartItems, removeFromCart, success, products, addToCart } = useContext(CartContext);
  const { updateStock, product } = useContext(ProductsContext);
  const toast = useToast();
  const [total, setTotal] = useState(0);
  const [checkoutItems, setCheckoutItems] = useState<Array<ICartProduct>>([]);
  const { currentUser } = useContext(AuthContext);

  const redirectToInfoPage = (prodId: string) => router.push(`/products/${prodId}`);

  const handleDelete = async ({ cartItemId, prodId, qty }: {cartItemId : string, prodId: string, qty: number}) => {
    updateStock({id: prodId, qty: qty, type: 'add'}).then()
    removeFromCart({id: cartItemId}).then(()=>{
      if (success){
        toast({
          title: `Removed from cart.`,
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

  const handlePayment = async () => {
    console.log(checkoutItems)
    const stripe = await getStripe();

    let content = {
      checkoutItems: checkoutItems,
      user: currentUser?.email,
    }

    const response = await fetch('/api/stripe',{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(content),
    });

    if (response.status === 500) return;

    const data = await response.json();
    console.log(data)

    toast({
      title: `Loading...`,
      status: 'info',
      isClosable: true,
      duration: null,
    })

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  const onAddToCart = (qty:number) => {
    console.log(qty)
    updateStock({id: product.prodId!, qty: qty, type: 'subtract'}).then();
    addToCart({cartItem: product, quantity: qty}).then(()=>{
      if (success){
        toast({
          title: `Added successfully!`,
          status: 'success',
          isClosable: true,
          duration: 5000,
        })
      } else {
        toast({
          title: `Failed to add.`,
          status: 'error',
          isClosable: true,
        })
      }
    })
  }

  const handleEdit = () => {}
  
  return{
    cartItems, products, total, setTotal, setCheckoutItems, onAddToCart,
    redirectToInfoPage, handleDelete, handlePayment, handleEdit
  }
}
