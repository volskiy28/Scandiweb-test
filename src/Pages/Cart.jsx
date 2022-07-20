import React, { Component } from "react";
import ImageSlider from "../components/ImageSlider";
export default class Cart extends Component {
  convertAllHexToSwatch() {
    const productColor = document.querySelectorAll(".product-color");
    productColor.forEach((child) => {
      const gChild = child.childNodes;
      gChild.forEach((col) => {
        col.style.backgroundColor = col.getAttribute("value");

        if (col.getAttribute("value") === "#FFFFFF") {
          col.classList.add("color-visibility");
        }
      });
    });
  }

  componentDidMount() {
    try {
      this.convertAllHexToSwatch();
    } catch (error) {}
  }

  render() {
    const { orders, currency } = this.props;
    let total = 0;
    orders.map((arr) => {
      return arr[0].map((item) => {
        total += item.prices[currency].amount;
        return total;
      });
    });
    let tax = 0.21 * total;
    return (
      <div>
        <h2 className="cart_title">Cart</h2>
        {orders.length > 0 &&
          orders.map((arr) => {
            return arr[0].map((item) => {
              return (
                <div className="order_item">
                  <div>
                    <h3>{item.brand}</h3>
                    <p>{item.name}</p>
                    <p>
                      {item.prices[currency].currency.symbol +
                        item.prices[currency].amount}
                    </p>
                    {item.attributes.map((atr, index) => {
                      if (atr.name !== "Color") {
                        return (
                          <div className="attributes-section attributes-section-product-page">
                            <p className="attribute-name">{atr.name}:</p>
                            <ul className="product-attributes product-attributes-cart-page">
                              {atr.items.map((atr2, index2) => {
                                return (
                                  <li
                                    className={
                                      arr[1][0].find((el) => {
                                        return el.value === atr2.value;
                                      }) &&
                                      arr[1][0].find(
                                        (ind) => ind.id === `${index}${index2}`
                                      )
                                        ? "attribute-selected"
                                        : ""
                                    }
                                    value={atr2.value}
                                    data-index={`${index}${index2}`}
                                  >
                                    {atr2.value}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      } else {
                        return (
                          <div className="attributes-section attributes-section-product-page">
                            <p className="attribute-name">{atr.name}:</p>
                            <ul className="product-color product-color-cart-page">
                              {atr.items.map((atr2, index2) => {
                                return (
                                  <li
                                    className={
                                      arr[2][0].find(
                                        (el) => el.value === atr2.value
                                      ) &&
                                      arr[2][0].find(
                                        (ind) => ind.id === `${index}${index2}`
                                      )
                                        ? "color-selected"
                                        : ""
                                    }
                                    value={atr2.value}
                                    data-index={`${index}${index2}`}
                                  ></li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      }
                    })}
                  </div>
                  <div className="quantity_img_block">
                    <div className="cart_quantity_block">
                      <button className="add_quantity_btn">+</button>
                      <p>1</p>
                      <button className="add_quantity_btn">-</button>
                    </div>
                    <ImageSlider
                      length={item.gallery.length}
                      imgGallery={item.gallery}
                      imgAlt={item.name}
                    />
                  </div>
                </div>
              );
            });
          })}
        {orders.length > 0 ? (
          <div className="total_price_block">
            <h4>Tax 21%: {tax.toFixed(2)}</h4>
            <h4>Quantity: </h4>
            <h4>Total: {total.toFixed(2)}</h4>
            <button className="order_button">Order</button>
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    );
  }
}
