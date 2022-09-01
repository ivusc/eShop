import { User } from "firebase/auth";

export interface IRating{
  user: string;
  rating: number;
  comment?: string;
}

export interface IProduct{
  prodName: string;
  prodDesc: string;
  prodPrice: number;
  prodRating: Array<IRating>;
  prodStock: number;
  prodCategory: string;
  prodId?: string;
  sellerEmail?: string;
  imageUrl?: string;
  discount?: boolean;
  dtCreated?: {
    seconds: number;
    nanoseconds: number;
  }
}

export interface IUser extends User{
  role: 'seller' | 'user' | 'admin';
}


export interface ICart{
  cartId: string;
  // prodId: string;
  quantity: number;
  // prodName: string;
  // prodStock: number;
  // prodPrice: number;
  // imageUrl: string;
  // dtAdded: {
  //   seconds: number;
  //   nanoseconds: number;
  // }
  prodId: string;
  paid: boolean;
}

export interface ICartProduct extends IProduct{
  quantity: number;
  cartId: string;
}

export interface IModalContent{
  type: 'delete' | 'addToCart' | 'filter';
  header: string;
  description: React.ReactNode;
  action: string;
}

export interface ICustomIconButton{
  icon: JSX.Element;
  lightGradient: string;
  darkGradient: string;
  hoverLightGradient: string;
  hoverDarkGradient: string;
  lightColor: string;
  darkColor: string;
  ariaLabel: string;
}