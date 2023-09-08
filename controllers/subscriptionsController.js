// controllers/subscriptionsController.js
import Stripe from "stripe";

// Initialize Stripe with your API key
const stripe = new Stripe("YOUR_STRIPE_API_KEY");

// Function to create a subscription
export const createSubscription = async (req, res) => {
  try {
    // Get user location from the request (you can replace this with your actual logic)
    const userLocation = req.body.userLocation; // Example: 'Ghana' or 'USA'

    // Define the product and price IDs based on the user's location
    let productId, priceId;

    if (userLocation === "Ghana") {
      productId = "YOUR_GHANAIAN_PRODUCT_ID";
      priceId = "YOUR_GHANAIAN_PRICE_ID";
    } else {
      productId = "YOUR_FOREIGNER_PRODUCT_ID";
      priceId = "YOUR_FOREIGNER_PRICE_ID";
    }

    // Create a customer in Stripe (if not already created)
    const customer = await stripe.customers.create({
      // Add customer details (e.g., email)
    });

    // Create a subscription with the selected product and price
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
    });

    res.json({ message: "Subscription created successfully", subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
