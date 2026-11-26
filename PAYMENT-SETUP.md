# Kashi & Beyond – Razorpay Checkout Setup

The booking form now calls a backend to create a Razorpay order, opens Razorpay Checkout, and verifies the payment signature plus captured amount/status before showing confirmation.

## Run locally
1. Install Node.js 18+.
2. Run `npm install` in this folder.
3. Copy `.env.example` to `.env`.
4. Add Razorpay **TEST** Key ID and Key Secret from your Razorpay Dashboard. Never put the secret in browser JavaScript or share it in chat.
5. Run `npm start`; open `http://localhost:3000`.
6. Test the complete payment flow in Razorpay test mode.

## Hosting requirement
This is no longer a static-only site: it needs a Node.js host (such as Render, Railway, or a Node-capable VPS) to run `server.js`. GitHub Pages or plain static hosting cannot run this backend. Set environment variables in the host dashboard.

## Email notifications
After verified payment, admin and customer emails are sent if SMTP settings are configured. For Gmail, use a Google App Password, not your normal account password.

## International payments
The site chooses INR for India and USD for non-India billing country. USD checkout requires Razorpay to enable international payments and USD presentment for your merchant account. Actual methods depend on account approval, currency and customer location. UPI/QR are generally India methods; international customers will see eligible options such as international cards if enabled.

## Important before going live
The current site price is calculated in browser JavaScript. Before accepting public payments, package prices and calculations must be moved to the server and independently validated to prevent amount tampering. Use test keys first, then complete Razorpay live activation, KYC and payment-method approvals.

## WhatsApp alerts
Automated WhatsApp notifications still require Meta WhatsApp Business Cloud API credentials and approved templates. This package does not pretend to send WhatsApp alerts; SMTP email alerts are supported once configured.
