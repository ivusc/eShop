import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { ICart, IProduct } from '../interfaces'
import { db } from '../lib/firebase';
import { AuthContext } from './AuthContext';

interface ICartContext{
  addToCart : ({ cartItem, quantity }: {
    cartItem: IProduct;
    quantity: number;
  }) => Promise<void>;
  cartItems: ICart[] | undefined;
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  removeFromCart: ({ id }: {
    id: string;
  }) => Promise<void>;
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  clearCart: () => Promise<void>;
  isProductBoughtBefore: ({ prodId }: {
    prodId: string;
  }) => boolean;
  // productsInCart: ICartProduct[];
  //setProductsInCart: React.Dispatch<React.SetStateAction<ICartProduct[]>>;
}


export const CartContext = createContext({} as ICartContext)

export const CartProvider = ({children} : {children: React.ReactNode}) => {
  const { currentUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState<Array<ICart>>();
  const [success, setSuccess] = useState(false);
  const [products, setProducts] = useState<Array<IProduct>>([]);

  useEffect(() => {
    console.log(currentUser)
    if ((currentUser !== undefined) && (currentUser !== null)){
      const cart = query(collection(db, 'carts', currentUser?.email!, 'products'), orderBy('dtAdded', 'desc'))
      const product = query(collection(db,'products'))
      onSnapshot(cart, (querySnapshot) => {
        setCartItems(querySnapshot.docs.map(doc => ({
          quantity: doc.data().quantity,
          prodId: doc.data().prodId,
          paid: doc.data().paid,
          cartId: doc.id,
        })))
      })
      onSnapshot(product,(querySnapshot) => {
        setProducts(querySnapshot.docs.map(doc => ({
          prodId: doc.id,
          prodName: doc.data().name,
          prodDesc: doc.data().description,
          prodPrice: doc.data().price,
          prodRating: doc.data().rating,
          prodStock: doc.data().stock,
          prodCategory: doc.data().category,
          imageUrl: doc.data().url,
          dtCreated: doc.data().dtCreated,
          sellerEmail: doc.data().sellerEmail,
        })))
      })
    }
  }, [currentUser])
  

  const addToCart = async ({cartItem, quantity}: {cartItem: IProduct, quantity: number}) => {
    console.log(cartItem)
    try{
      setSuccess(false);
      const docRef = doc(db,'carts',currentUser?.email!);
      const itemRef = collection(docRef,'products');
      console.log(itemRef)
      await setDoc(docRef,{
        user: currentUser?.email,
      },{ merge: true })
      await addDoc(itemRef,{
        prodId: cartItem.prodId!,
        quantity: quantity,
        dtAdded: Timestamp.now(),
        paid: false,
      })
      setSuccess(true)
    } catch (err) {
      alert(err)
    }
  }

  const removeFromCart = async ({id}:{id: string}) => {
    try{
      setSuccess(false);
      const itemRef = doc(db,'carts',currentUser?.email!,'products',id);
      await deleteDoc(itemRef);
      setSuccess(true);
    } catch (err) {
      alert(err);
    }
  }

  const clearCart = async () => {
    console.log(cartItems)
    cartItems?.forEach(async (item) => {
      const itemRef = doc(db,'carts',currentUser?.email!,'products',item.cartId);
      await setDoc(itemRef,{
        paid: true,
      },{ merge: true });
    })
  }

  const isProductBoughtBefore = ({prodId}:{prodId: string}) => {
    console.log(cartItems)
    console.log(prodId)
    const index = cartItems?.findIndex((item) => (item.paid === true) && (item.prodId === prodId))
    console.log(index)
    if (index === -1)
      return false;
    else return true;
  }

  const cartData = {
    addToCart,
    cartItems,
    setCartItems,
    success,
    setSuccess,
    removeFromCart,
    products,
    setProducts,
    clearCart,
    isProductBoughtBefore,
  }

  return (
    <CartContext.Provider value={cartData}>
      {children}
    </CartContext.Provider>
  )
}
