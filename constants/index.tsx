import { BsTrashFill } from "react-icons/bs";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { ICustomIconButton, IModalContent } from "../interfaces";

export const lightGradient = 'linear(30deg, green.500, teal.500 90%)';
export const darkGradient = 'linear(30deg, green.300, teal.300 90%)';
export const hoverDarkGradient = 'linear(30deg, green.400, teal.400)';
export const hoverLightGradient = 'linear(30deg, green.600, teal.600)';

export const errorLightGradient = 'linear(30deg, #ee094a, #ff3a00)';
export const errorDarkGradient = 'linear(30deg, #ee095d, #ff2a00)';
export const hoverErrorLightGradient = 'linear(30deg, #d60843, #e63400)';
export const hoverErrorDarkGradient = 'linear(30deg, #f0226d, #ff3f1a)';

export const warningLightGradient = 'linear(30deg, #f46541, #f7b147)';
export const warningDarkGradient = 'linear(30deg, #f17211, #f59d19)';
export const hoverWarningLightGradient = 'linear(30deg, #f68467, #f6a730)';
export const hoverWarningDarkGradient = 'linear(30deg, #c37234, #c47e14)';


export const Categories = [
  'Appliance',
  'Books',
  'Electronics',
  'Food',
  'Games',
  'Others'
]

export const deleteModalContent : IModalContent = {
  type: 'delete',
  header: 'Delete Product',
  description: <>Are you sure you want to delete this product?<br/>This action cannot be undone.</>,
  action: 'Delete'
}

export const addToCartModalContent : IModalContent = {
  type: 'addToCart',
  header: 'Add to Cart',
  description: <>Add the following item to cart?</>,
  action: 'Add'
}

export const iconButtonContent : Array<ICustomIconButton>  = [
  {
    icon: <FaEdit/>,
    lightGradient: warningLightGradient,
    darkGradient: warningDarkGradient,
    hoverLightGradient: hoverWarningLightGradient,
    hoverDarkGradient: hoverWarningDarkGradient,
    lightColor: 'white',
    darkColor: 'white',
    ariaLabel: 'edit'
  },
  {
    icon: <FaInfoCircle/>,
    lightGradient: lightGradient,
    darkGradient: darkGradient,
    hoverLightGradient: hoverLightGradient,
    hoverDarkGradient: hoverDarkGradient,
    lightColor: 'white',
    darkColor: 'gray.900',
    ariaLabel: 'info',
    
  },
  {
    icon: <BsTrashFill/>,
    lightGradient: errorLightGradient,
    darkGradient: errorDarkGradient,
    hoverLightGradient: hoverErrorLightGradient,
    hoverDarkGradient: hoverErrorDarkGradient,
    lightColor: 'white',
    darkColor: 'white',
    ariaLabel: 'remove from cart'
  }
]