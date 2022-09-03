import { FormControl, FormLabel, Hide, HStack, Input, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Switch, Textarea, useColorModeValue, VStack } from '@chakra-ui/react'
import { NextRouter } from 'next/router'
import React from 'react'
import { Categories, darkGradient, lightGradient } from '../../constants'
import { IProduct } from '../../interfaces'
import { FileInput } from '../common/FileInput'
import { GradientButton } from '../common/GradientButton'

interface IForm{
  type: 'create' | 'update';
  onSubmit: (e: any) => void;
  openDeleteModal?: () => void;
  product: IProduct;
  setProduct: React.Dispatch<React.SetStateAction<IProduct>>;
  router: NextRouter,
}

export const Form : React.FC<IForm> = ({ type, onSubmit, openDeleteModal, product, setProduct, router }) => {
  return (
    <form onSubmit={(e) => onSubmit(e)} name='addTask'>
      <VStack spacing={4}>
      {type === 'create' && (
        <FormControl isRequired>
          <FormLabel>Product Picture</FormLabel>
          <FileInput type={'product'}/>
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
          <InputLeftAddon children={'SGD'} />
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
      <FormControl>
        <HStack>
          <FormLabel>Product on discount?</FormLabel>
          <Switch colorScheme='green' size='lg' onChange={(e)=>setProduct({...product, discount: e.target.checked})}/>
        </HStack>
      </FormControl>
        <Hide below={'mdsm'}>
          <MdContent 
            openDeleteModal={openDeleteModal}
            router={router}
            type={type}
          />
        </Hide>
        <Hide above={'mdsm'}>
            <SmContent
              openDeleteModal={openDeleteModal}
              router={router}
              type={type}
            />
        </Hide>
      </VStack>
    </form>
  )
}

interface IContent {
  openDeleteModal: (() => void) | undefined;
  router: NextRouter;
  type: "create" | "update"
}

const MdContent : React.FC<IContent> = ({ openDeleteModal, router, type}) => (
  <HStack spacing={4}>
    {type === 'update' && ( 
      <GradientButton size={'lg'} buttonType={'red'} onClick={openDeleteModal}>Delete</GradientButton>
    )}
    <GradientButton size={'lg'} buttonType={'orange'} onClick={()=>router.push('/')}>Cancel</GradientButton>
    <GradientButton type='submit' size={'lg'} buttonType={'green'} >Submit</GradientButton>
  </HStack>
)

const SmContent : React.FC<IContent> = ({ openDeleteModal, router, type }) => (
  <VStack spacing={4}>
    <HStack spacing={4}>
      {type === 'update' && ( 
        <GradientButton buttonType={'red'} onClick={openDeleteModal}>Delete</GradientButton>
      )}
      <GradientButton buttonType={'orange'} onClick={()=>router.push('/')}>Cancel</GradientButton>
    </HStack>
    <GradientButton type='submit' buttonType={'green'} >Submit</GradientButton>
  </VStack>
)