import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

interface PaymentFormProps {
  appointmentId: Id<'appointments'>;
  serviceId: Id<'services'>;
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function PaymentForm({ appointmentId, serviceId, amount, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const createPaymentIntent = useMutation(api.stripe.createPaymentIntent);
  const handlePaymentSuccess = useMutation(api.stripe.handlePaymentSuccess);
  const handlePaymentFailure = useMutation(api.stripe.handlePaymentFailure);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create a payment intent
      const { clientSecret } = await createPaymentIntent({
        amount,
        serviceId,
        appointmentId,
      });

      // Confirm the payment
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/booking/confirmation',
        },
        redirect: 'if_required',
      });

      const { error, paymentIntent } = result;

      if (error) {
        await handlePaymentFailure({
          appointmentId,
          paymentIntentId: error.payment_intent?.id || '',
        });
        onError(error.message);
      } else if (paymentIntent) {
        await handlePaymentSuccess({
          appointmentId,
          paymentIntentId: paymentIntent.id,
        });
        onSuccess();
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
}
