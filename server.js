import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: '100kb' }));
app.use(express.static(__dirname));

const required = ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'];
const razorpayReady = required.every(k => process.env[k]);
const razorpay = razorpayReady ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET }) : null;

function validBooking(b) {
  return b && typeof b.name === 'string' && b.name.trim() &&
    typeof b.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.phone === 'string' && b.phone.trim() &&
    Number.isInteger(b.amount) && b.amount >= 100 && b.amount <= 100000000 &&
    ['INR', 'USD'].includes(b.currency) && Number.isInteger(b.travellers) && b.travellers >= 1 && b.travellers <= 60;
}

app.post('/api/create-order', async (req, res) => {
  try {
    if (!razorpayReady) return res.status(503).json({ error: 'Razorpay is not configured on the server. Add your live/test Key ID and Key Secret to the hosting environment.' });
    const b = req.body;
    if (!validBooking(b)) return res.status(400).json({ error: 'Please check your booking details and amount.' });
    const order = await razorpay.orders.create({ amount: b.amount, currency: b.currency, receipt: `kb_${Date.now()}`.slice(0, 40), notes: { customer: b.name.slice(0, 200), email: b.email.slice(0, 200), package: String(b.packageName || '').slice(0, 200), date: String(b.travelDate || '').slice(0, 30), travellers: String(b.travellers) } });
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (e) {
    console.error('create-order:', e);
    res.status(500).json({ error: 'Unable to start payment. Please try again or contact Kashi & Beyond.' });
  }
});

async function sendBookingEmails(b, paymentId, bookingId) {
  const mailReady = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.ADMIN_EMAIL;
  if (!mailReady) return;
  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: String(process.env.SMTP_SECURE || 'false') === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
  const amount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: b.currency }).format(b.amount / 100);
  const details = `Booking ID: ${bookingId}\nCustomer: ${b.name}\nEmail: ${b.email}\nPhone: ${b.phone}\nPackage: ${b.packageName}\nStops: ${b.stops}\nDuration: ${b.duration}\nTravellers: ${b.travellers}\nTravel date: ${b.travelDate}\nAmount paid: ${amount}\nPayment ID: ${paymentId}`;
  await Promise.all([
    transporter.sendMail({ from: process.env.MAIL_FROM || process.env.SMTP_USER, to: process.env.ADMIN_EMAIL, subject: `New paid booking ${bookingId} – Kashi & Beyond`, text: details }),
    transporter.sendMail({ from: process.env.MAIL_FROM || process.env.SMTP_USER, to: b.email, subject: `Booking confirmed – ${bookingId}`, text: `Thank you for booking with Kashi & Beyond. Your payment has been verified.\n\n${details}\n\nOur team will contact you shortly.` })
  ]);
}

app.post('/api/verify-payment', async (req, res) => {
  try {
    if (!process.env.RAZORPAY_KEY_SECRET) return res.status(503).json({ error: 'Payment verification is not configured.' });
    const b = req.body;
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${b.razorpay_order_id}|${b.razorpay_payment_id}`).digest('hex');
    const a = Buffer.from(expected); const c = Buffer.from(String(b.razorpay_signature || ''));
    if (a.length !== c.length || !crypto.timingSafeEqual(a, c)) return res.status(400).json({ verified: false, error: 'Payment signature could not be verified.' });
    const payment = await razorpay.payments.fetch(b.razorpay_payment_id);
    if (payment.order_id !== b.razorpay_order_id || payment.status !== 'captured' || payment.amount !== b.amount || payment.currency !== b.currency) {
      return res.status(400).json({ verified: false, error: 'Payment amount or status does not match this booking.' });
    }
    const bookingId = `KB-${Date.now().toString(36).toUpperCase()}`;
    try { await sendBookingEmails(b, b.razorpay_payment_id, bookingId); }
    catch (mailError) { console.error('booking email failed:', mailError); }
    res.json({ verified: true, bookingId });
  } catch (e) {
    console.error('verify-payment:', e);
    res.status(500).json({ verified: false, error: 'Could not verify payment. Please contact support with your payment ID.' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true, razorpayConfigured: razorpayReady }));
const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Kashi & Beyond running on port ${port}`));
