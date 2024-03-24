import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        require: true
    },
    title: {
        type: String,
        require: true,
    },
    file: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    year: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('papers', paperSchema);