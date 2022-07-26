import { Query } from "@apollo/react-components";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getOccurrence } from "..//utils/utilFunc";
import { getAllCategories } from "../query/getQueries";

export default class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }
  convertAllHexToSwatch() {
    const productColor = document.querySelectorAll(".product-color-bag");
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
    const {
      currency,
      orders,
      addQuantity,
      quantities,
      removeQuantity,
      emptyCart,
      removeItem,
    } = this.props;
    let s = [];
    orders.map((arr) => {
      return arr[0].map((item) => {
        return s.push(
          item.prices[currency].amount *
            getOccurrence(quantities, arr[3].join(""), arr[3].join(""))
        );
      });
    });
    let total = s.reduce((a, b) => a + b, 0);
    return (
      <div id="cart_overlay_bag" className="cart_overlay_bag">
        <h3 id="quantity_gallery_block">My bag</h3>
        {orders.map((arr, index) => {
          return arr[0].map((item) => {
            return (
              <div className="cart_overlay">
                <div className="mn">
                  <div className="bag">
                    <h3 className="item_brand">{item.brand}</h3>
                    <h4 className="item_name">{item.name}</h4>
                    <p>
                      {item.prices[currency].currency.symbol}
                      {item.prices[currency].amount}
                    </p>
                    {item.attributes.map((atr, index) => {
                      if (atr.name !== "Color") {
                        return (
                          <div
                            id="quantity_gallery_block"
                            className="attributes-section-product-page-bag"
                          >
                            <p className="attribute-name-bag">{atr.name}:</p>
                            <ul className="product-attributes-bag">
                              {atr.items.map((atr2, index2) => {
                                return (
                                  <li
                                    id="attribute_li_id"
                                    className={
                                      arr[1][0].find((el) => {
                                        return el.value === atr2.value;
                                      }) &&
                                      arr[1][0].find(
                                        (ind) => ind.id === `${index}${index2}`
                                      )
                                        ? "attribute-selected-bag"
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
                            <p className="attribute-name-bag">{atr.name}:</p>
                            <ul className="product-color-bag">
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
                                        ? "color-selected-bag"
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
                  <div
                    id="quantity_gallery_block"
                    className="quantity_gallery_block"
                  >
                    <div id="quantity_block" className="quantity_block">
                      <button
                        id="quantity_gallery_block"
                        onClick={() => {
                          addQuantity(
                            arr[3].join("") +
                              getOccurrence(
                                quantities,
                                arr[3].join(""),
                                arr[3].join("")
                              )
                          );
                        }}
                        className="add_quantity_btn"
                      >
                        +
                      </button>
                      <p>
                        {getOccurrence(
                          quantities,
                          arr[3].join(""),
                          arr[3].join("")
                        )}
                      </p>
                      <button
                        id="quantity_gallery_block"
                        onClick={() => {
                          if (
                            getOccurrence(
                              quantities,
                              arr[3].join(""),
                              arr[3].join("")
                            ) >= 2
                          ) {
                            removeQuantity(
                              arr[3].join("") +
                                parseInt(
                                  getOccurrence(
                                    quantities,
                                    arr[3].join(""),
                                    arr[3].join("")
                                  ) - 1
                                ),
                              quantities[quantities.length - 1].charAt(
                                quantities[quantities.length - 1].length - 1
                              )
                            );
                          } else {
                            if (orders.length >= 2) {
                              removeItem(index);
                            } else {
                              emptyCart();
                            }
                          }
                        }}
                        className="add_quantity_btn"
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
          });
        })}
        <Query query={getAllCategories}>
          {({ loading, data }) => {
            if (loading) {
              return <div>loading</div>;
            }
            const { currencies } = data;
            return (
              <div>
                {orders.length > 0 && (
                  <div className="total_price">
                    <h4>Total: {currencies[currency].symbol} {total.toFixed(2)}</h4>
                  </div>
                )}
                {orders.length > 0 ? (
                  <div className="button_block">
                    <Link to={"/cart"}>
                      <button className="viev_bag_btn">Viev bag</button>
                    </Link>
                    <button className="check_out_btn">Check out</button>
                  </div>
                ) : (
                  <h4 className="empty_cart">Your cart is empty</h4>
                )}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
