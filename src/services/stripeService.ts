/**
 * Stripe Service - Funções para integração com Stripe
 */

interface PaymentIntentData {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
}

interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

/**
 * Cria um Payment Intent no Stripe
 */
export async function createPaymentIntent(
  data: PaymentIntentData
): Promise<PaymentIntentResponse> {
  try {
    const response = await fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: data.amount,
        currency: data.currency || 'brl',
        metadata: data.metadata || {},
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar payment intent');
    }

    const result = await response.json();
    return {
      clientSecret: result.clientSecret,
      paymentIntentId: result.paymentIntentId,
    };
  } catch (error) {
    console.error('Erro ao criar payment intent:', error);
    throw error;
  }
}

/**
 * Confirma um pagamento no Stripe
 */
export async function confirmPayment(paymentIntentId: string): Promise<boolean> {
  try {
    const response = await fetch('/api/stripe/confirm-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentIntentId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao confirmar pagamento');
    }

    return true;
  } catch (error) {
    console.error('Erro ao confirmar pagamento:', error);
    throw error;
  }
}

/**
 * Cancela um pagamento no Stripe
 */
export async function cancelPayment(paymentIntentId: string): Promise<boolean> {
  try {
    const response = await fetch('/api/stripe/cancel-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentIntentId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao cancelar pagamento');
    }

    return true;
  } catch (error) {
    console.error('Erro ao cancelar pagamento:', error);
    throw error;
  }
}

/**
 * Verifica se o Stripe está configurado
 */
export function isStripeConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
    process.env.STRIPE_SECRET_KEY
  );
}
