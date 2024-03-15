import Order from "../Models/orderModel.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Tutor from "../Models/tutorModel.js";
import ErrorHandler from "../utils/errorHandle.js";

export const addToCart = catchAsyncError(async (req, res, next) => {
  const tutorial = await Tutor.findById(req.params.id);

  if (!tutorial) return next(new ErrorHandler("No tutorial found", 404));

  const orderr = {
    name: tutorial.title,
    price: tutorial.fee,
    tutorialId: req.params.id,
    image: "kuchh bhi",
  };

  let order = await Order.findOne({ user: req.user._id });

  if (order) {
    order.orderItems.push(orderr);
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
    order,
  });
});

export const getMyOrders = catchAsyncError(async(req, res, next) => {

    const myOrders = await Order.find({user: req.user._id});

    if(!myOrders) return next(new ErrorHandler("No order placed", 400));

    res.status(200).json({
        success: true,
        message: myOrders
    })
})

export const deleteOrder = catchAsyncError(async(req, res, next) => {
    let order = await Order.findOne({ user: req.user._id });

    if (!order) return next(new ErrorHandler("No order placed", 400));

    const tutId = req.params.id;
    let list = order.orderItems;

    // Use filter to create a new array without the item to be removed
    list = list.filter(item => !item.tutorialId.equals(tutId));

    // Update the order with the new list of orderItems
    order.orderItems = list;

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
        message: 'Order item deleted successfully',
    });
});

export const getClientOrders = catchAsyncError(async(req, res, next) => {
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
        message: list
    });
});



