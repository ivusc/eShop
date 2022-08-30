import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, DocumentSnapshot, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { v4 } from 'uuid';
import { IProduct } from '../interfaces';
import { db, storage } from '../lib/firebase';
import { AuthContext } from './AuthContext';

interface IProductContext{
  products: Array<IProduct>;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  product: IProduct;
  setProduct: React.Dispatch<React.SetStateAction<IProduct>>;
  loading: boolean;
  success: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  submitImg: (picture: File) => void;
  handleDelete: ({ id, e }: {
    id: string;
    e: any;
  }) => Promise<void>;
  handleSubmit: (e:any) => Promise<void>;
  handleUpdate: ({ id, qty }: {
    id: string;
    qty?: number | undefined;
  }) => Promise<void>
  getProductById: (id: string) => Promise<DocumentData | undefined>;
  getProductByRef: (ref: DocumentReference<DocumentData>) => Promise<DocumentData | undefined>;
  updateStock:  ({ id, qty, type }: {
    id: string;
    qty: number;
    type: 'add' | 'subtract';
  }) => Promise<void> 
}


export const ProductsContext = createContext({} as IProductContext)

export const ProductsProvider = ({children}: { children: React.ReactNode}) => {
  const [products, setProducts] = useState([] as Array<IProduct>);
  const [product, setProduct] = useState<IProduct>({
    prodName: '', prodDesc: '', prodPrice: 0, imageUrl: '', prodRating: 0, prodStock: 0, prodCategory: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(()=>{
    const q = query(collection(db, 'products'), orderBy('dtCreated', 'desc'))
    onSnapshot(q, (querySnapshot) => {
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
  },[])

  const handleSubmit = async (e?:any) => {
    e.preventDefault();
    setSuccess(false)
    try{
      console.log(product)
      await addDoc(collection(db,'products'),{
        name: product?.prodName,
        description: product?.prodDesc,
        price: product?.prodPrice,
        sellerEmail: currentUser?.email,
        rating: Math.random()*10,
        stock: product?.prodStock,
        dtCreated: Timestamp.now(),
        category: product?.prodCategory,
        url: product?.imageUrl,
      })
      setSuccess(true)
    } catch (err){
      alert(err);
    }
  }

  const submitImg = (picture:File) => {
    setProduct({...product, imageUrl: ''})
    if (picture === null) return;
    const imgRef = ref(storage, `products/${picture.name + v4()}`)
    setLoading(true)
    uploadBytes(imgRef, picture).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) =>{
        setProduct({...product, imageUrl: url})
        alert(`Successfully uploaded. Url: ${url}`)
        //setProdImg(null)
        //handleSubmit();
      })
    })
    setLoading(false)
  }

  const handleDelete = async ({id, e}:{ id: string, e: any}) => {
    e.preventDefault();
    setSuccess(false);
    const productDocRef = doc(db,'products',id);
    try{
      setLoading(true);
      await deleteDoc(productDocRef);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      alert(err)
    }
  }

  const handleUpdate = async ({id}:{ id: string}) => {
    setSuccess(false);
    const productDocRef = doc(db,'products',id)
    try{
      setLoading(true);
      await updateDoc(productDocRef,{
        name: product.prodName,
        description: product.prodDesc,
        price: product.prodPrice,
        rating: product.prodRating || Math.random()*10,
        stock: product.prodStock,
        category: product.prodCategory,
        sellerEmail: currentUser?.email,
      })
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      alert(err);
    }
  }

  const updateStock = async ({id, qty, type}: {id: string, qty: number, type: 'add' | 'subtract'}) => {
    const productDocRef = doc(db,'products',id);
    const product = await getDoc(productDocRef);
    try{
      if (type === 'add'){
        await updateDoc(productDocRef,{
          stock: product.data()?.stock + qty,
        })
      } else {
        await updateDoc(productDocRef,{
          stock: product.data()?.stock - qty,
        })
      }
    } catch (err){
      alert(err)
    }
  }

  const getProductById = async (id: string) => {
    const productRef = doc(db,'products',id);
    const product = await getDoc(productRef);
    return product.data();
  }

  const getProductByRef = async (ref: DocumentReference<DocumentData>) => {
    const productRef = ref;
    console.log(ref);
    const product = await getDoc(productRef);
    return product.data();
  }
  
  const productData = { 
    products, 
    setProducts, 
    product, 
    setProduct, 
    loading, 
    setLoading, 
    success, 
    submitImg,
    handleSubmit, 
    handleDelete, 
    handleUpdate,
    getProductById,
    getProductByRef,
    updateStock
  }
  
  return (
    <ProductsContext.Provider value={productData}>
      {children}
    </ProductsContext.Provider>
  )
}
