import Wishlist from "../models/wishlist.model";
import Product from "../models/products.model";

//controller untuk menambahkan product ke wishlist
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id; //Pastikan sudah ada middleware authentikasi nanti
    const productId = req.body.productId;

    //Cari wishlist pengguna
    let wishlist = await Wishlist.findOne({ user: userId });

    // Jika wishlist belum ada, buat baru
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
    } else {
      // jika product sudah ada di wishlist jangan tambahkan lagi
      if (wishlist.products.includes(productId)) {
        return res
          .status(400)
          .json({ message: "Produk sudah ada di wishlist" });
      }
      wishlist.products.push(productId);
    }
    await wishlist.save();
    res
      .status(201)
      .json({ message: "Produk berhasil ditambahkan ke wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menambahkan produk ke wishlist" });
  }
};

//Controller untuk melihat wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "products"
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist tidak ditemukan" });
    }
    res.status(200).json(wishlist.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil wishlist" });
  }
};

//Controller untuk menghapus produk dari wishlist
// Controller untuk menghapus produk dari wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Kamu belum terautentikasi, login terlebih dahulu" });
    }

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist tidak ditemukan" });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );
    await wishlist.save();

    res.status(200).json({ message: "Produk berhasil dihapus dari wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus produk dari wishlist" });
  }
};
