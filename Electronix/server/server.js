const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("YOUR_SECRET_KEY"); 

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { total } = req.body; 

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Electronics Order" },
            unit_amount: total * 100, 
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/order-success?status=success",
      cancel_url: "http://localhost:3000/payment",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(4242, () => console.log("Server running on port 4242"));
