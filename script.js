let activeCurrency = 'INR';
let bookingBaseINR = 11500;
let bookingBaseUSD = 165;
const INR_TO_USD = 84;

const DESTINATION_PHOTOS = {
  'Varanasi': [
    { file: 'images/VNS.jpeg', label: 'VNS.jpeg', fallback: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/VNS2.jpeg', label: 'VNS2.jpeg', fallback: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/VNS3.jpeg', label: 'VNS3.jpeg', fallback: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/VNS4.jpeg', label: 'VNS4.jpeg', fallback: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/VNS5.jpeg', label: 'VNS5.jpeg', fallback: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80' }
  ],
  'Prayagraj': [
    { file: 'images/pra1.jpeg', label: 'pra1.jpeg', fallback: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/pra2.jpeg', label: 'pra2.jpeg', fallback: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/pra3.jpeg', label: 'pra3.jpeg', fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80' }
  ],
  'Ayodhya': [
    { file: 'images/ayo1.jpeg', label: 'ayo1.jpeg', fallback: 'https://images.unsplash.com/photo-1706186839147-0d708602587b?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/ayo2.jpeg', label: 'ayo2.jpeg', fallback: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/ayo3.jpeg', label: 'ayo3.jpeg', fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80' }
  ],
  'Sasaram': [
    { file: 'images/ssm1.jpeg', label: 'ssm1.jpeg', fallback: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/ssm2.jpeg', label: 'ssm2.jpeg', fallback: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/ssm3.jpeg', label: 'ssm3.jpeg', fallback: 'https://images.unsplash.com/photo-1623057000049-e220f79c7051?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/ssm4.jpeg', label: 'ssm4.jpeg', fallback: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/ssm5.jpeg', label: 'ssm5.jpeg', fallback: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80' }
  ],
  'Mundeshwari': [
    { file: 'images/mund1.jpeg', label: 'mund1.jpeg', fallback: 'https://images.unsplash.com/photo-1623057000049-e220f79c7051?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/mund2.jpeg', label: 'mund2.jpeg', fallback: 'https://images.unsplash.com/photo-1623057000049-e220f79c7051?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/mund3.jpeg', label: 'mund3.jpeg', fallback: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80' }
  ],
  'Gaya & Bodh Gaya': [
    { file: 'images/bodh1.jpeg', label: 'bodh1.jpeg', fallback: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/bodh2.jpeg', label: 'bodh2.jpeg', fallback: 'https://images.unsplash.com/photo-1623057000049-e220f79c7051?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/bodh4.jpeg', label: 'bodh4.jpeg', fallback: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80' },
    { file: 'images/bodh5.jpeg', label: 'bodh5.jpeg', fallback: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' }
  ]
};

function attachImageFallbacks() {
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.onerror = function () {
      if (this.dataset.fallback && this.src !== this.dataset.fallback) {
        this.src = this.dataset.fallback;
      }
    };
  });
}

function toggleNavDrawer(force) {
  const drawer = document.getElementById('navDrawer');
  const show = typeof force === 'boolean' ? force : drawer.classList.contains('hidden');
  drawer.classList.toggle('hidden', !show);
}

function swapCardImg(mainId, btn, localSrc, fallbackSrc) {
  const img = document.getElementById(mainId);
  if (!img) return;
  img.dataset.fallback = fallbackSrc;
  img.src = localSrc;
  btn.parentElement.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function formatMoney(inr, usdOverride) {
  if (activeCurrency === 'USD') {
    const val = typeof usdOverride === 'number' ? usdOverride : Math.round(inr / INR_TO_USD);
    return '$' + val.toLocaleString('en-US') + ' USD';
  }
  return '₹' + Math.round(inr).toLocaleString('en-IN');
}

function setCurrency(curr) {
  activeCurrency = curr;
  const isUSD = curr === 'USD';
  document.getElementById('currBtnINR').classList.toggle('active', !isUSD);
  document.getElementById('currBtnUSD').classList.toggle('active', isUSD);
  document.getElementById('plannerCurrINR').className = isUSD ? 'btn-sec' : 'btn-pri';
  document.getElementById('plannerCurrUSD').className = isUSD ? 'btn-pri' : 'btn-sec';

  document.querySelectorAll('.price-tag').forEach(el => {
    el.textContent = formatMoney(Number(el.dataset.inr), Number(el.dataset.usd));
  });
  recalculatePlan();
}

function handleSearchFilter(q) {
  const term = q.trim().toLowerCase();
  let count = 0;
  document.querySelectorAll('.filterable-card').forEach(card => {
    const match = !term || (card.dataset.keywords + ' ' + card.textContent).toLowerCase().includes(term);
    card.classList.toggle('hidden', !match);
    if (match) count++;
  });
  const st = document.getElementById('searchStatusText');
  if (term) {
    st.classList.remove('hidden');
    st.textContent = `Showing ${count} result(s) for "${q}"`;
  } else {
    st.classList.add('hidden');
  }
}

function recalculatePlan() {
  const checked = Array.from(document.querySelectorAll('.dest-checkbox:checked')).map(c => c.value);
  const travellers = Math.max(1, parseInt(document.getElementById('travellersInput').value || '1', 10));
  const days = Math.max(1, parseInt(document.getElementById('daysInput').value || '1', 10));
  const transport = document.getElementById('transportSelect').value;
  const hotel = document.getElementById('hotelSelect').value;
  const meals = document.getElementById('mealsSelect').value;

  const order = ['Varanasi', 'Ayodhya', 'Prayagraj', 'Gaya & Bodh Gaya', 'Mundeshwari', 'Sasaram'];
  const stops = order.filter(s => checked.includes(s));
  document.getElementById('summaryRouteText').textContent =
    `${stops.length ? stops.join(' -> ') : 'Select at least 1 destination'} (${days}d · ${travellers}p)`;

  const stopCount = Math.max(1, stops.length);
  let transportINR = 0;
  if (transport === 'cab') transportINR = days * 2200 + stopCount * 1000;
  else if (transport === 'bike') transportINR = days * 900 * Math.ceil(travellers / 2) + stopCount * 400;
  else if (transport === 'tempo') transportINR = days * 4200 + stopCount * 1500;
  else if (transport === 'bus') transportINR = days * 6800 + stopCount * 2200;

  const hotelRate = hotel === '2star' ? 750 : hotel === '3star' ? 1250 : 1900;
  const hotelINR = travellers * days * hotelRate;

  const mealRate = meals === 'excluded' ? 0 : meals === 'breakfast' ? 250 : 600;
  const mealsINR = travellers * days * mealRate;

  const totalINR = transportINR + hotelINR + mealsINR;

  document.getElementById('summaryTransportCost').textContent = formatMoney(transportINR);
  document.getElementById('summaryHotelCost').textContent = formatMoney(hotelINR);
  document.getElementById('summaryMealsCost').textContent = formatMoney(mealsINR);
  document.getElementById('summaryTotalCost').textContent = formatMoney(totalINR);

  document.getElementById('vehicleTipBox').textContent =
    travellers >= 7 && (transport === 'cab' || transport === 'bike')
      ? 'Tip: Bus or Tempo Traveller fits groups of 7 or more travellers.'
      : `${stops.length} stop(s) selected for ${travellers} traveller(s) across ${days} day(s).`;

  return { stops, travellers, days, totalINR };
}

function applyPreset(stops, days) {
  document.querySelectorAll('.dest-checkbox').forEach(cb => {
    cb.checked = stops.includes(cb.value);
  });
  document.getElementById('daysInput').value = days;
  recalculatePlan();
}

function loadTrailIntoPlanner(stops, days) {
  applyPreset(stops, days);
  document.getElementById('planner-section').scrollIntoView();
}

function toggleAcc(btn) {
  btn.parentElement.classList.toggle('open');
}

function openBookingModal(title = 'Custom Kashi-Magadh Trail', inr = 11500, usd = 165, days = 3, stops = ['Varanasi', 'Ayodhya']) {
  bookingBaseINR = Number(inr) || 0; bookingBaseUSD = Number(usd) || Math.round(bookingBaseINR / INR_TO_USD);
  document.getElementById('bookingSuccessBox').classList.add('hidden');
  document.getElementById('bookingForm').classList.remove('hidden');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalStops').textContent = stops.join(' -> ');
  document.getElementById('modalDuration').textContent = `${days} Days`;
  document.getElementById('modalTravellers').value = Math.max(1, parseInt(document.getElementById('travellersInput')?.value || '2', 10));
  document.getElementById('bkDate').min = new Date().toISOString().split('T')[0];
  updateBookingCurrency(); updateBookingTotal();
  document.getElementById('bookingModal').classList.add('show');
}
function updateBookingTotal() {
  const count = Math.min(60, Math.max(1, parseInt(document.getElementById('modalTravellers').value || '1', 10)));
  document.getElementById('modalTravellers').value = count;
  const isUSD = document.getElementById('bkCountry')?.value !== 'IN';
  const total = isUSD ? bookingBaseUSD * count : bookingBaseINR * count;
  document.getElementById('modalPrice').textContent = isUSD ? '$' + total.toLocaleString('en-US') + ' USD' : '₹' + total.toLocaleString('en-IN');
}
function updateBookingCurrency() { updateBookingTotal(); }
function openBookingFromPlanner() {
  const p = recalculatePlan();
  const count = Math.max(1, p.travellers);
  openBookingModal('Custom Route Planner Itinerary', p.totalINR / count, Math.round(p.totalINR / count / INR_TO_USD), p.days, p.stops.length ? p.stops : ['Varanasi']);
  document.getElementById('modalTravellers').value = count; updateBookingTotal();
}
function closeBookingModal() { document.getElementById('bookingModal').classList.remove('show'); }
async function startPaymentCheckout(e) {
  e.preventDefault();
  const form = document.getElementById('bookingForm');
  if (!form.reportValidity()) return;
  const notice = document.getElementById('paymentSetupNotice');
  const button = form.querySelector('button[type="submit"]');
  const setNotice = (message, isError = true) => {
    notice.textContent = message;
    notice.classList.add('payment-setup-notice-visible');
    notice.style.color = isError ? '#b42318' : '#087443';
  };
  if (typeof Razorpay === 'undefined') {
    setNotice('Payment window could not load. Please check your internet connection and try again.');
    return;
  }
  const country = document.getElementById('bkCountry').value;
  const currency = country === 'IN' ? 'INR' : 'USD';
  const count = Math.min(60, Math.max(1, parseInt(document.getElementById('modalTravellers').value || '1', 10)));
  const amountMajor = currency === 'INR' ? bookingBaseINR * count : bookingBaseUSD * count;
  if (!Number.isFinite(amountMajor) || amountMajor <= 0) {
    setNotice('The booking amount is invalid. Please contact us for a quotation.');
    return;
  }
  const booking = {
    name: document.getElementById('bkName').value.trim(),
    email: document.getElementById('bkEmail').value.trim(),
    phone: document.getElementById('bkPhone').value.trim(),
    travelDate: document.getElementById('bkDate').value,
    country,
    currency,
    amount: Math.round(amountMajor * 100),
    amountMajor,
    packageName: document.getElementById('modalTitle').textContent,
    stops: document.getElementById('modalStops').textContent,
    duration: document.getElementById('modalDuration').textContent,
    travellers: count
  };
  button.disabled = true;
  button.textContent = 'Opening secure checkout…';
  notice.classList.remove('payment-setup-notice-visible');
  try {
    const orderResponse = await fetch('/api/create-order', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(booking)
    });
    const orderData = await orderResponse.json();
    if (!orderResponse.ok) throw new Error(orderData.error || 'Could not create payment order.');
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Kashi & Beyond',
      description: booking.packageName,
      order_id: orderData.orderId,
      prefill: { name: booking.name, email: booking.email, contact: booking.phone },
      notes: { package: booking.packageName, travel_date: booking.travelDate, travellers: String(count) },
      theme: { color: '#087f5b' },
      modal: { ondismiss: () => { button.disabled = false; button.textContent = 'Proceed to Secure Payment'; } },
      handler: async function (response) {
        setNotice('Payment received by gateway. Verifying securely…', false);
        try {
          const verifyResponse = await fetch('/api/verify-payment', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...booking, razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature })
          });
          const verified = await verifyResponse.json();
          if (!verifyResponse.ok || !verified.verified) throw new Error(verified.error || 'Payment verification failed.');
          form.classList.add('hidden');
          const success = document.getElementById('bookingSuccessBox');
          success.classList.remove('hidden');
          document.getElementById('bookingRefText').textContent = `Booking reference: ${verified.bookingId}. Payment verified. Confirmation details will be sent to ${booking.email}.`;
        } catch (err) {
          setNotice('Payment may have been completed, but automatic verification is pending. Please contact us with payment ID: ' + response.razorpay_payment_id + '.');
        } finally {
          button.disabled = false; button.textContent = 'Proceed to Secure Payment';
        }
      }
    };
    const checkout = new Razorpay(options);
    checkout.on('payment.failed', function (response) {
      setNotice('Payment was not completed: ' + (response.error?.description || 'Please try another payment method.'));
      button.disabled = false; button.textContent = 'Proceed to Secure Payment';
    });
    checkout.open();
  } catch (err) {
    setNotice(err.message || 'Payment service is not configured. Please try again later.');
    button.disabled = false;
    button.textContent = 'Proceed to Secure Payment';
  }
}
function submitGeneralEnquiry(e) {
  e.preventDefault();
  const name = document.getElementById('enqName').value.trim();
  const email = document.getElementById('enqEmail').value.trim();
  const phone = document.getElementById('enqPhone').value.trim();
  const message = document.getElementById('enqMessage').value.trim();
  const body = `Kashi & Beyond Enquiry%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AEnquiry: ${encodeURIComponent(message)}`;
  window.open(`https://wa.me/919905418003?text=${body}`, '_blank', 'noopener');
  document.getElementById('enquiryFeedback').textContent = 'WhatsApp enquiry opened. Please press Send in WhatsApp to deliver it.';
  document.getElementById('enquiryFeedback').classList.remove('hidden');
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('newsName').value.trim();
  const fb = document.getElementById('newsletterFeedback');
  fb.textContent = `Thank you, ${name}! Subscribed to Kashi-Magadh trail updates.`;
  fb.classList.remove('hidden');
  e.target.reset();
}

function openGalleryModal(key) {
  const grid = document.getElementById('galleryGrid');
  const title = document.getElementById('galleryModalTitle');
  grid.innerHTML = '';
  let items = [];
  if (key === 'all') {
    title.textContent = 'All 23 Local Destination Photos';
    Object.values(DESTINATION_PHOTOS).forEach(arr => items.push(...arr));
  } else {
    title.textContent = `${key} Photos`;
    items = DESTINATION_PHOTOS[key] || [];
  }
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `<img src="${item.file}" data-fallback="${item.fallback}" alt="${item.label}" /><div>${item.label}</div>`;
    grid.appendChild(div);
  });
  attachImageFallbacks();
  document.getElementById('galleryModal').classList.add('show');
}

document.addEventListener('DOMContentLoaded', () => {
  attachImageFallbacks();
  recalculatePlan();
});