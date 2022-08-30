import { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51KyyxlLfuuo8qWeLp39xtr5Ml6n6ldgWKpO6l15vs4UUctnl7GXvA35vfrLNgiZqWBp97AQO5tukuCzKPZFtELgy00B5RiDGKC',{apiVersion:'2022-08-01'});

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const checkoutItems = req.body.checkoutItems;
  const user = req.body.user;

  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card','paynow','grabpay'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1KyzNZLfuuo8qWeLXu74DFwV' },
          { shipping_rate: 'shr_1KyzQmLfuuo8qWeLG6xCW80R' }
        ],
        line_items: checkoutItems.map((item:any) => {

          return {
            price_data : {
              currency: 'sgd',
              product_data: {
                name: item.prodName,
                images: [item.imageUrl],
              },
              unit_amount: item.prodPrice * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${req.headers.origin}/cart/checkout-success`,
        cancel_url: `${req.headers.origin}/cart/${user}`,
      }

      // Create Checkout Sessions from body params.
      //@ts-ignore
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err:any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}