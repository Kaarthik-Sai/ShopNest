import Order from "../model/order.js";
import User from "../model/user.js";
import Product from "../model/product.js";

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const orders = await Order.find({});
    const totalEarnings = orders.reduce(
      (acc, order) => acc + order.totalAmount,
      0,
    );

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalEarnings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAdminStats };
