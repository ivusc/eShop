import { FormControl, FormLabel, HStack, Input, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Textarea, VStack } from '@chakra-ui/react'
import React from 'react'
import { Categories } from '../../constants'
import { IProduct } from '../../interfaces'
import FileInput from '../common/FileInput'
import { GradientButton } from '../common/GradientButton'

interface IForm{
  type: 'create' | 'update';
  onSubmit: (e: any) => void;
  openDeleteModal?: () => void;
  product: IProduct;
  setProduct: React.Dispatch<React.SetStateAction<IProduct>>;
}

export const Form : React.FC<IForm> = ({ type, onSubmit, openDeleteModal, product, setProduct }) => {
  return (
    <form onSubmit={(e) => onSubmit(e)} name='addTask'>
      <VStack spacing={4}>
      {type === 'create' && (
        <FormControl isRequired>
          <FormLabel>Product Picture</FormLabel>
          <FileInput />
        </FormControl>
      )}
      <FormControl isRequired>
        <FormLabel>Product Name</FormLabel>
        <Input value={type === 'update' ? product.prodName : undefined} placeholder='Product name' onChange={(e) => setProduct({...product, prodName: e.target.value})}/>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Product Description</FormLabel>
        <Textarea value={type === 'update' ? product.prodDesc : undefined} placeholder='Product description' onChange={(e) => setProduct({...product, prodDesc: e.target.value})}/>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Product Price</FormLabel>
        <InputGroup>
          <InputLeftAddon children={'USD'} />
          <Input value={type === 'update' ? product.prodPrice : undefined} placeholder='Enter amount' onChange={(e) => setProduct({...product, prodPrice: Number(e.target.value)})}/>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
      <FormLabel>Product Stock</FormLabel>
      <NumberInput max={10000} min={1}
        value={type === 'update' ? product.prodStock : undefined}
        keepWithinRange={false}
        clampValueOnBlur={false}
        onChange={(value) => setProduct({...product, prodStock: Number(value)})}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      </FormControl>
      <FormControl isRequired>
      <FormLabel>Product Category</FormLabel>
        <Select value={type === 'update' ? product.prodCategory : undefined} placeholder='Categories' onChange={(e)=>setProduct({...product, prodCategory: e.target.value})}>
          {Categories.map((category) => (
            <option value={category} key={category}>{category}</option>
          ))}
        </Select>
      </FormControl>
      <HStack spacing={5}>
        {type === 'update' && ( 
          <GradientButton size={'lg'} buttonType={'red'} onClick={openDeleteModal}>Delete</GradientButton>
        )}
        <GradientButton type='submit' size={'lg'} buttonType={'orange'} >Cancel</GradientButton>
        <GradientButton type='submit' size={'lg'} buttonType={'green'} >Submit</GradientButton>
      </HStack>
      </VStack>
    </form>
  )
}