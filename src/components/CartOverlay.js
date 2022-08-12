import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../Redux/shop/actions";

class CartOverlay extends PureComponent {
  addItem = (product) => {
    this.props.addProductToCart(product);
  };
  deleteItem = (product) => {
    this.props.removeProductFromCart(product);
  };
  render() {
    const { currency, cart } = this.props;
    let s = [];
    cart.map((item) => {
      return s.push(item.prices[currency].amount * item.qty);
    });
    let total = s.reduce((a, b) => a + b, 0);
    return (
      <div id="cart_overlay_bag" className="cart_overlay_bag">
        <h3 id="quantity_gallery_block"> My bag</h3>
        {cart.map((item, index) => {
          return (
            <div className="cart_overlay ">
              <div className="mn">
                <div className="bag">
                  <h3 className="item_brand">{item.brand}</h3>
                  <h4 className="item_name">{item.name}</h4>
                  <p>
                    {item.prices[currency].currency.symbol}
                    {item.prices[currency].amount}
                  </p>
                  {item.attributes.map((att) => (
                    <div className="attributes" key={`${item.id} ${att.name}`}>
                      <p className="mini-cart-item__attributes-title">{`${att.name}:`}</p>
                      <div className="mini-cart-item__attributes-list">
                        {att.items.map((item) => (
                          <div key={`${item.id} ${item.id}`}>
                            <input
                              type="radio"
                              id={`${att.id} ${item.id}`}
                              name={att.name + index}
                              value={item.value}
                            />
                            <label htmlFor={`${att.id} ${item.id}`}>
                              <div
                                className={
                                  att.type !== "swatch"
                                    ? "mini-cart-item__attributes-text_" +
                                      item.selected
                                    : "mini-cart-item__attributes-color_" +
                                      item.selected
                                }
                                style={
                                  att.type === "swatch"
                                    ? {
                                        background: item.value,
                                        border: `1px solid ${
                                          item.id === "White"
                                            ? "black"
                                            : item.value
                                        }`,
                                      }
                                    : null
                                }
                              >
                                {att.type === "swatch" ? "" : item.value}
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  id="quantity_gallery_block"
                  className="quantity_gallery_block"
                >
                  <div id="quantity_block" className="quantity_block">
                    <button
                      id="quantity_gallery_block"
                      className="add_quantity_btn"
                      onClick={() => {
                        this.addItem(item);
                      }}
                    >
                      +
                    </button>
                    <p>{item.qty}</p>
                    <button
                      id="quantity_gallery_block"
                      className="add_quantity_btn"
                      onClick={() => {
                        this.deleteItem(item);
                      }}
                    >
                      -
                    </button>
                  </div>
                  <div className="cart_overlay_img">
                    <img src={item.gallery[0]} alt={item.name} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div>
          {cart.length > 0 && (
            <div className="total_price">
              <h4>
                Total: {cart[0].prices[currency].currency.symbol}
                {total.toFixed(2)}
              </h4>
            </div>
          )}
          {cart.length > 0 ? (
            <div className="button_block">
              <Link to={"/cart"}>
                <button
                  onClick={() => {
                    this.props.close();
                    this.props.enebleOverflow();
                  }}
                  className="viev_bag_btn"
                >
                  Viev bag
                </button>
              </Link>
              <button className="check_out_btn">Check out</button>
            </div>
          ) : (
            <h4 className="empty_cart">Your cart is empty</h4>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    totalQty: state.shop.totalQty,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeProductFromCart: (product) => dispatch(removeProductFromCart(product)),
  addProductToCart: (product) => dispatch(addProductToCart(product)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CartOverlay);
