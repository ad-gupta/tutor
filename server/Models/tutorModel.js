import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  tutor: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "I am a tutor at Smart Tutor",
  },
  fee: {
    type: Number,
    required: [true, "Please Enter course fee per hour"],
    maxLength: [4, "Price cannot exceed 4 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  image: { 
    type: String,
    default: ""
  },
  video: {
    type: String,
    default: "sample video",
  },
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      commentedAt: {
        type: Date,
        default: Date.now,
      },
      image: {
        type: String,
        default: "https://pbs.twimg.com/profile_images/973144443833540609/pIqkAE59_400x400.jpg"
      }
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("tutors", tutorSchema);
