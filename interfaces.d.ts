export interface IProduct{
  prodName: string;
  prodDesc: string;
  prodPrice: number;
  prodRating: number;
  prodStock: number;
  prodCategory: string;
  prodId?: string;
  sellerEmail?: string;
  imageUrl?: string;
  dtCreated?: {
    seconds: number;
    nanoseconds: number;
  }
}

export interface IUser{
  email: string;
  password: string;
  confirmPassword?: string;
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
  type: 'delete' | 'addToCart';
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