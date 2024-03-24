import Order from "../Models/orderModel.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Tutor from "../Models/tutorModel.js";
import ErrorHandler from "../utils/errorHandle.js";
import stripePackage from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SECRET);

export const addToCart = catchAsyncError(async (req, res, next) => {
  const tutorial = await Tutor.findById(req.params.id);

  if (!tutorial) return next(new ErrorHandler("No tutorial found", 404));

  const orderr = {
    name: tutorial.title,
    price: tutorial.fee,
    tutorialId: req.params.id,
    image: tutorial.image,
  };

  let order = await Order.findOne({ user: req.user._id });

  if (order) {
    let isPresent = order.orderItems.some(
      (odr) => String(odr.tutorialId) === String(req.params.id)
    );
    console.log(isPresent);
    if (!isPresent) {
      order.orderItems.push(orderr);
      order.totalPrice += tutorial.fee;
    }

    await order.save();
  } else {
    order = await Order.create({
      orderItems: [orderr], // Wrap orderr inside an array
      paymentInfo: { id: "sample payment", status: "pending" },
      itemsPrice: tutorial.fee,
      taxPrice: 0,
      totalPrice: tutorial.fee,
      paidAt: Date.now(),
      user: req.user._id,
    });
  }

  res.status(201).json({
    success: true,
    message: order,
  });
});

export const getMyOrders = catchAsyncError(async (req, res, next) => {
  const myOrders = await Order.find({ user: req.user._id });

  if (!myOrders) return next(new ErrorHandler("No order placed", 400));

  res.status(200).json({
    success: true,
    message: myOrders,
  });
});

export const deleteOrder = catchAsyncError(async (req, res, next) => {
  try {
    let order = await Order.findOne({ user: req.user._id });

    if (!order) {
      return next(new ErrorHandler("No order placed", 400));
    }

    const tutId = req.params.id;
    let list = order.orderItems;
    let x = await Tutor.findById(tutId);

    if (!x) {
      return next(new ErrorHandler("Tutorial not found", 404));
    }

    let fee = x.fee;

    // Use filter to create a new array without the item to be removed
    list = list.filter((item) => !item.tutorialId.equals(tutId));

    // Update the order with the new list of orderItems
    order.orderItems = list;
    let y = parseInt(order.totalPrice, 10);
    y -= fee;

    if (y < 0) {
      return next(new ErrorHandler("Invalid total price", 400));
    }

    order.totalPrice = String(y);

    // Check if the list is empty after filtering
    if (list.length === 0) {
      // Delete the entire order
      await Order.findByIdAndDelete(order._id);
    } else {
      // Save the updated order if it still has items
      await order.save();
    }

    res.status(200).json({
      success: true,
      message: "Order item deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getClientOrders = catchAsyncError(async (req, res, next) => {
  const list = [];

  const orders = await Order.find();

  for (const order of orders) {
    for (const item of order.orderItems) {
      const tutorial = await Tutor.findById(item.tutorialId);
      if (tutorial && tutorial.name.equals(req.user._id)) {
        list.push(order);
      }
    }
  }

  res.status(200).json({
    success: true,
    message: list,
  });
});

export const getKey = (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
};

export const checkOut = catchAsyncError(async (req, res, next) => {
  const { cartItems, successUrl, cancelUrl } = req.body;

  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.name,
        images: [item.image],
      },
      unit_amount: (item.price) * 100,
    },
    quantity: 1,
    
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (!session) {
      return next(new ErrorHandler("Failed to create checkout session", 500));
    }

    res.json({ sessionId: session.id });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
