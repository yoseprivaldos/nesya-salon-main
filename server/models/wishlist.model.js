import mongoose from "mongoose";
import User from "./user.model.js";
import Product from "./products.model.js";

const wishlistsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Wishlist = mongoose.model("Wishlist", wishlistsSchema);

export default Wishlist;
