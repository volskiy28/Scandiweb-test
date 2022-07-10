import { Query } from "@apollo/react-components";
import React, { Component } from "react";
import { productRequest } from "../query/getQueries";
import { convertHexToSwatch, getSelectedAtr,
  getSelectedCol, } from "../utils/utilFunc";
export default class Pdp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
    };
  }
  componentDidMount() {
    let id = window.location.pathname;
    id = id.split("/");
    id = id[id.length - 1];

    this.setState({
      productId: id,
    });
  }
  changeImage(e) {
    const imgRight = document.querySelector(".main_img");
    imgRight.src = e.target.src;
  }
  createToggle() {
    const allAttributes = document.querySelectorAll(".product-attributes");
    allAttributes.forEach((attribute) => {
      attribute = attribute.childNodes;
      for (let i = 0; i <= attribute.length - 1; i++) {
        attribute[i].addEventListener("click", () => {
          attribute.forEach((option) => {
            option.classList.remove("attribute-selected");
          });

          attribute[i].classList.add("attribute-selected");
        });
      }
    });
    const colorAttributes = document.querySelector(".product-color").childNodes;
    for (let i = 0; i <= colorAttributes.length - 1; i++) {
      colorAttributes[i].addEventListener("click", () => {
        colorAttributes.forEach((option) => {
          option.classList.remove("color-selected");
        });
        colorAttributes[i].classList.add("color-selected");
      });
    }
  }

  render() {
    const { productId } = this.state;
    const { currency, onAdd, itemNames } = this.props;

    return (
      <Query query={productRequest(productId)}>
        {({ loading, data }) => {
          if (loading) {
            return <div>loading</div>;
          }
          const { product } = data;
          return (
            <div
              className="PDP"
              onLoad={() => {
                this.createToggle();
                convertHexToSwatch();
              }}
            >
              <div className="container">
                <div className="gallery_block">
                  <div className="secondary_img_block">
                    {product.gallery.map((img) => {
                      return (
                        <img
                          key={img.id}
                          className="secondary_img"
                          alt="product_img"
                          width={80}
                          height={80}
                          src={img}
                          onClick={this.changeImage}
                        />
                      );
                    })}
                  </div>
                  <img
                    className="main_img"
                    src={product.gallery[0]}
                    alt="product_img"
                    width={511}
                    height={511}
                  />
                  <div>
                    <h1>{product.brand}</h1>
                    <h2>{product.name}</h2>
                    {product.attributes.map((atr, index) => {
                      if (atr.name !== "Color") {
                        return (
                          <div key={atr + index} className="attributes-section">
                            <p className="attribute-name">{atr.name}:</p>
                            <ul className="product-attributes">
                              {atr.items.map((atr2, index2) => {
                                return (
                                  <li
                                    key={atr2 + index2}
                                    data-index={`${index}${index2}`}
                                    value={atr2.value}
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
                          <div key={atr + index} className="attributes-section">
                            <p className="attribute-name">{atr.name}:</p>
                            <ul className="product-color">
                              {atr.items.map((atr2, index2) => {
                                return (
                                  <li
                                    key={atr2 + index2}
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
                    <div className="price_description_block">
                      <p>Price:</p>
                      <b>
                        {product.prices[currency].currency.symbol}
                        {product.prices[currency].amount}
                      </b>
                      {product.inStock ? 
                        <button  onClick={() => {
                          let allAttributes = document.querySelectorAll(
                            ".product-attributes"
                          );
                          let colorAttributes =
                            document.querySelectorAll(".product-color");

                          if (
                            getSelectedAtr().length !== allAttributes.length ||
                            getSelectedCol().length !== colorAttributes.length
                          ) {
                            alert("Please select product attributes");
                          } else {
                            if (
                              !itemNames.includes(
                                product.name +
                                  getSelectedAtr()
                                    .map((val) => val.value)
                                    .join("") +
                                  getSelectedCol()
                                    .map((val) => val.value)
                                    .join("")
                              )
                            ) {
                              onAdd(
                                [
                                  [product],
                                  [getSelectedAtr()],
                                  [getSelectedCol()],
                                  [
                                    product.name +
                                      getSelectedAtr()
                                        .map((val) => val.value)
                                        .join("") +
                                      getSelectedCol()
                                        .map((val) => val.value)
                                        .join(""),
                                  ],
                                ],

                                product.name +
                                  getSelectedAtr()
                                    .map((val) => val.value)
                                    .join("") +
                                  getSelectedCol()
                                    .map((val) => val.value)
                                    .join("")
                              );
                        }}}} className="add_to_cart_btn"> Add to cart </button>
                       : 
                        <button className="add_to_cart_btn out-of-stock">
                          Out of stock
                        </button>
                        }

                      <p
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
