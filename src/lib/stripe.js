const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

export const isStripeConfigured = Boolean(stripeKey);

export const PRICES = {
  monthly: {
    id: import.meta.env.VITE_STRIPE_PRICE_MONTHLY || 'price_monthly',
    amount: 499,
    label: '$4.99/month',
    interval: 'month',
  },
  yearly: {
    id: import.meta.env.VITE_STRIPE_PRICE_YEARLY || 'price_yearly',
    amount: 3900,
    label: '$39/year',
    interval: 'year',
  },
};

let stripePromise = null;

export async function getStripe() {
  if (!isStripeConfigured) return null;
  if (!stripePromise) {
    const { loadStripe } = await import('@stripe/stripe-js');
    stripePromise = loadStripe(stripeKey);
  }
  return stripePromise;
}

/**
 * Redirect to Stripe Checkout.
 * In production, the checkout session should be created server-side
 * (e.g. via a Supabase Edge Function or Vercel Serverless Function).
 * This stub shows the client-side redirect pattern.
 */
export async function redirectToCheckout({ priceId, customerEmail, successUrl, cancelUrl }) {
  const stripe = await getStripe();
  if (!stripe) {
    console.warn('Stripe not configured — set VITE_STRIPE_PUBLISHABLE_KEY');
    return { error: { message: 'Stripe not configured' } };
  }

  return stripe.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    customerEmail,
    successUrl: successUrl || `${window.location.origin}/?upgraded=true`,
    cancelUrl: cancelUrl || window.location.origin,
  });
}
