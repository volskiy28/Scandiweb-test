import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ImageSlider from "../components/ImageSlider";
import { addToCart, removeFromCart, cart, totalQty } from "../Redux/cartSlice";
class Cart extends PureComponent {
  addItem = (product) => {
    this.props.addToCart(product);
  };
  deleteItem = (product) => {
    this.props.removeFromCart(product);
  };
  render() {
    const cart = this.props.cart;
    const { currency, totalQty } = this.props;
    let s = [];
    cart.map((item) => {
      return s.push(item.prices[currency].amount * item.qty);
    });
    let total = s.reduce((a, b) => a + b, 0);
    let tax = total * 0.21;
    return (
      <div className="cart_component">
        <h1 className="cart_title">Cart</h1>
        <div className="grey-line">
          <hr width="auto" color="#E5E5E5" size="1" />
        </div>
        <div></div>
        {cart.length === 0 ? (
          <p className="empty">Cart Is Empty</p>
        ) : (
          <div>
            {cart.map((item, index) => {
              return (
                <div key={item.id}>
                  <div className="cart_item">
                    <div>
                      <div className="details_of_item">
                        <h2 className="product__name">{item.name}</h2>
                        <p className="product__brand">{item.brand}</p>
                        <div className="price">
                          {item.prices[currency].currency.symbol}
                          {item.prices[currency].amount}
                        </div>
                      </div>

                      <div className="attribute_section">
                        {item.attributes.map((att) => (
                          <div
                            className="attributes"
                            key={`${item.id} ${att.name}`}
                          >
                            <p className="cart-item__attributes-title attributes__title title">{`${att.name}:`}</p>
                            <div className="attributes__list">
                              {att.items.map((item) => (
                                <div key={item.id}>
                                  <input
                                    type="radio"
                                    id={`${att.id} ${item.id}`}
                                    name={att.name + index}
                                    value={item.value}
                                    defaultChecked={item.selected}
                                  />
                                  <label>
                                    <div
                                      className={
                                        att.type !== "swatch"
                                          ? "attributes__text cart-item__attributes-text_" +
                                            item.selected
                                          : "attributes__color cart-item__attributes-color_" +
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
                    </div>
                    <div className="images_of_item">
                      <div className="activity">
                        <button
                          onClick={() => {
                            this.addItem(item);
                          }}
                          className="activity_button"
                        >
                          +
                        </button>

                        <div className="qty">
                          <span>{item.qty}</span>
                        </div>

                        <button
                          className="activity_button"
                          onClick={() => {
                            this.deleteItem(item);
                          }}
                        >
                          -
                        </button>
                      </div>
                      <div className="image_slider">
                        <ImageSlider
                          length={item.gallery.length}
                          imgGallery={item.gallery}
                          imgAlt={item.name}
                        />
                      </div>
                    </div>
                  </div>

                  <hr width="auto" color="#E5E5E5" size="1" />
                </div>
              );
            })}
            <div className="total_price_block">
              <h4>
                Tax 21%: {cart[0].prices[currency].currency.symbol}
                {tax.toFixed(2)}
              </h4>
              <h4>Quantity: {totalQty} </h4>
              <h4>
                Total:
                {cart[0].prices[currency].currency.symbol}
                {total.toFixed(2)}
              </h4>
              <button className="order_button">Order</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({ cart: cart(state), totalQty: totalQty(state) }),
  { addToCart, removeFromCart }
)(Cart);
