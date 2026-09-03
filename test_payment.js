async function testPayment() {
  try {
    const res = await fetch('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '9876543210',
        shipping_address: '123 Otaku Street, Mumbai - 400001',
        items: [{ product_id: 'prod-1', product_name: 'Goku Tee', size: 'M', quantity: 1, price: 29.99 }]
      })
    });
    const data = await res.json();
    console.log('CREATE ORDER RESPONSE:', data);

    if (data.success && data.razorpay_order_id) {
      const verifyRes = await fetch('http://localhost:3000/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: data.razorpay_order_id,
          razorpay_payment_id: 'pay_test_' + Date.now(),
          razorpay_signature: 'test_sig',
          order_id: data.order_id
        })
      });
      const verifyData = await verifyRes.json();
      console.log('VERIFY RESPONSE:', verifyData);
    }
  } catch (err) {
    console.error('Test error:', err);
  }
}

testPayment();
