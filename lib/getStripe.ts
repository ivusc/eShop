import { loadStripe } from "@stripe/stripe-js";

let stripePromise : any;

export const getStripe = async () => {
  if (!stripePromise) {
    console.log('1')
    stripePromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    console.log('2')
  }

  return stripePromise;
}