const { Product, Inventory, Cart, Order } = require("../../../db");
const { Op } = require("sequelize");

const getOrdersAndProducts = async () => {
  const orders = await Order.findAll({
    where: {
      payment_status: "approved",
      payment_transaction_id: { [Op.not]: null },
    },
    attributes: [
      "id",
      "payment_transaction_id",
      "payment_date",
      "shipping_status",
      "userSub",
      "cartId",
      "total_quantity_all_products",
      "total_amount_all_products",
    ],
    order: [["payment_date", "DESC"]],
  });

  const ordersAndProducts = [];

  for (const order of orders) {
    const cartId = order.cartId;

    const products = await Cart.findAll({
      where: {
        idCart: cartId,
      },
      attributes: ["quantity_unit_product"],
      include: [
        {
          model: Product,
          attributes: ["name", "price", "photo", "product_description"],
        },
        {
          model: Inventory,
          attributes: ["color"],
        },
      ],
    });

    ordersAndProducts.push({ order, products });
  }

  return ordersAndProducts;
};

module.exports = getOrdersAndProducts;
