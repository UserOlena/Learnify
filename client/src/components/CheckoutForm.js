import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const style = {
        width: '33%',
        margin: '0 auto',
        marginBottom: '2rem',
        border: '2px solid black', 
        padding: '1rem',
        userSelect: 'none',

    };
    const buttonStyle = {
        marginTop: '1rem',
        backgroundColor: '#FAF0E6',
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`,
            },
        });

        if (error) {
            setMessage(`Payment failed: ${error.message}`);
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} id="payment-form" style={style}>
            <PaymentElement />
            <button disabled={isProcessing} id="submit" style={buttonStyle}>
                <span id="button-text" >
                    {isProcessing ? "Processing..." : "Make Payment"}
                </span>
            </button>
            {/* show error or success messages */}
            {message && <div className="message">{message}</div>}
        </form>
    );
}
