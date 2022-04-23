// pulling the models to build cart
const Order = require("./Order");
const LineItem = require("./Lineitem");
const Product = require("./Product");

module.exports = (User, db) => {
  User.prototype.getCart = async function () {
    // finding the cart for the specific userId in the user model
    const where = {
      userId: this.id,
      status: "CART",
    };

    //builidng cart
    let cart = await Order.findOne({
      where,
    });
    // for above to work, we need to have an association between order and user

    //if cart doesn't exist, we are creating an cart in the order model
    if (!cart) {
      cart = await Order.create(where);
    }

    return Order.findByPk(cart.id, {
      include: [{ model: LineItem, include: [Product] }],
    });
  };

  User.prototype.removeFromCart = async function (product) {
    const cart = await this.getCart();
    const lineItem = cart.dataValues.lineitems.find(
      (lineItem) => lineItem.productId === product.id
    );
    lineItem.quantity--;
    if (lineItem.quantity) {
      await lineItem.save();
    } else {
      await lineItem.destroy();
    }
    return this.getCart();
  };

  User.prototype.addToCart = async function (product) {
    const cart = await this.getCart();
    const lineItem = cart.dataValues.lineitems.find(
      (lineItem) => lineItem.productId === product.id
    );
    if (lineItem) {
      lineItem.quantity++;
      await lineItem.save();
    } else {
      await LineItem.create({
        productId: product.id,
        orderId: cart.id,
      });
    }
    return this.getCart();
  };
};
