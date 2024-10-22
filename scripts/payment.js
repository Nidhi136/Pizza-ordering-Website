// Function to initialize and handle Razorpay payment
function initializeRazorpay(totalAmount) {
    var options = {
        "key": "rzp_test_xQJcS49E6NLbJj", // Enter the Key ID generated from the Dashboard
        "amount": totalAmount * 100, // Amount is in currency subunits. 1 INR = 100 paise
        "currency": "INR",
        "name": "Pizza Shop", // Your business name
        "description": "Pizza Shop Transaction",
        "image": "https://example.com/your_logo", // Your business logo
        "handler": function (response) {
            alert("Payment Done....");
            alert("Payment ID: " + response.razorpay_payment_id);
            alert("Order ID: " + response.razorpay_order_id);
            alert("Signature: " + response.razorpay_signature);
        },
        "prefill": { // Prefill customer's contact information
            "name": "Customer Name", // Your customer's name
            "email": "customerEmail@example.com",
            "contact": "CustomerPhone" // Provide the customer's phone number
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    var rzp1 = new Razorpay(options);

    rzp1.on('payment.failed', function (response) {
        alert("Payment Failed");
        alert("Error Code: " + response.error.code);
        alert("Description: " + response.error.description);
        alert("Source: " + response.error.source);
        alert("Step: " + response.error.step);
        alert("Reason: " + response.error.reason);
        alert("Order ID: " + response.error.metadata.order_id);
        alert("Payment ID: " + response.error.metadata.payment_id);
    });

    return rzp1;
}

// Function to handle payment
function handlePayment() {
    // Calculate total amount (from cart or other sources)
    const totalAmount = calculateTotalAmount(); // Implement this function to fetch total amount
    const rzp1 = initializeRazorpay(totalAmount);
    rzp1.open();
}

// Function to calculate the total amount (mock implementation)
function calculateTotalAmount() {
    // Implement logic to fetch total amount from cart
    return 500; // Return total amount in INR (for example purposes)
}

// Bind the payment button to handlePayment function
document.getElementById('rzp-button1').addEventListener('click', function (e) {
    handlePayment();
    e.preventDefault(); // Prevent default form submit behavior
});