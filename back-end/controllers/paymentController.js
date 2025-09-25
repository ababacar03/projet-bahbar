require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.paymentSession = async (req, res) => {
  try {
    let { amount, barId, barName } = req.body;

    // Sécurise la conversion du montant : euros -> centimes (entier)
    if (typeof amount === "string") amount = parseFloat(amount);
    const amountInCents = Math.round(Number(amount) * 100);

    if (amountInCents < 50) {
      return res.status(400).json({ error: "Montant minimum : 0,50€" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: barName || "Paiement Bar"
          },
          unit_amount: amountInCents,
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: 'https://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://localhost:3000/cancel',
      metadata: { barId }
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('❌ Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
