import mongoose from "mongoose";

const schema = new mongoose.Schema({
  orderItems: [
    {
      name: { type: String, require: true },
      price: { type: Number, require: true },
      image: { type: String, require: true },
      tutorialId: {
        type: mongoose.Schema.ObjectId,
        ref: "Tutor",
        require: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: "User",
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    require: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    require: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    require: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    require: true,
    default: "processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("order", schema);
