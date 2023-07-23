import { useEffect, useState } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "../components/CheckoutForm";

export function Payment(props) {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch('/config').then(async (res) => {
            const { publishableKey } = await res.json();
            
            setStripePromise(loadStripe(publishableKey));
        })
    }, []);

    useEffect(() => {
        fetch('/create-payment-intent', {
            method: 'POST',
            body: JSON.stringify({}),
        }).then(async (res) => {
            const { clientSecret } = await res.json();
            console.log(clientSecret)
            setClientSecret(clientSecret);
        })
    }, []);

    return (
        <div>
            <h1>Payment</h1>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm  />
                </Elements>
            )}
        </div>
    );
};

export default Payment;