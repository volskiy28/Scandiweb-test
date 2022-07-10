import React, { Component } from "react";

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

    return (
      <div>
        <h2 className="cart_title">Cart</h2>
        {orders.map((arr) => {
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
                </div>
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
                <div className="cart_quantity_block">
                  <button className="add_quantity_btn">+</button>
                  <p>1</p>
                  <button className="add_quantity_btn">-</button>
                </div>
                <div>
                  <img
                    className="cart_item_img"
                    src={item.gallery[0]}
                    alt={item.name}
                  />
                </div>
              </div>
            );
          });
        })}
      </div>
    );
  }
}
