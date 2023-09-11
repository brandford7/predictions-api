import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
