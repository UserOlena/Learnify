import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

export function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('/config').then(async (res) => {
      const { publishableKey } = await res.json();

      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch('/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({}),
    }).then(async (res) => {
      const { clientSecret } = await res.json();
      console.log(clientSecret);
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div>
      <Typography component='h1' variant='h4'>
        Donate
      </Typography>
      <Typography component='p' style={{ marginBottom: '1rem' }}>
        Love our site? Donate $10 below to show your appreciation. Thank you in
        advance for the cups of coffee!
      </Typography>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
