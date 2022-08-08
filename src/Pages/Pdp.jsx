import { Query } from "@apollo/react-components";
import React, { Component } from "react";
import { connect } from "react-redux";
import { productRequest } from "../query/getQueries";
import { addProductToCart } from "../Redux/shop/actions";
class Pdp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: [],
      photoSrc: "",
    };
  }

  handleOnChange = ({ target }) => {
    const { attributes } = this.state;
    const nextState = attributes.map((a) => {
      if (a.name !== target.name) return a;

      return {
        ...a,
        items: a.items.map((item) => {
          const checked = item.value === target.value;
          return {
            ...item,
            selected: checked,
          };
        }),
      };
    });
    this.setState({
      attributes: nextState,
    });
  };
  addProductToCart = (product) => {
    const isSelected = this.state.attributes.map((a) =>
      a.items.find((i) => i.selected === true)
    );
    if (isSelected.every((item) => item !== undefined)) {
      const newId = `${product.id} ${isSelected.map((i) => i.id).join(" ")}`;
      const updatedProduct = {
        ...product,
        attributes: this.state.attributes,
        qty: 1,
        id: newId,
      };

      this.props.addProductToCart(updatedProduct);
    }
  };
  setPhotoSrc = (photo) => {
    this.setState({ photoSrc: photo });
  };
  render() {
    const { currency } = this.props;
    const parse = require("html-react-parser");
    return (
      <Query
        query={productRequest}
        variables={{ id: window.location.pathname.slice(9) }}
        onCompleted={(data) =>
          this.setState({ attributes: data.product.attributes })
        }
      >
        {({ loading, data }) => {
          if (loading) {
            return <div>loading</div>;
          }
          const { product } = data;

          return (
            <div className="PDP">
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
                          onClick={() => {
                            this.setPhotoSrc(img);
                          }}
                        />
                      );
                    })}
                  </div>
                  <img
                    className="main_img"
                    src={
                      this.state.photoSrc
                        ? this.state.photoSrc
                        : product.gallery[0]
                    }
                    alt="product_img"
                    width={511}
                    height={511}
                  />
                  <div>
                    <h1>{product.brand}</h1>
                    <h2>{product.name}</h2>
                    {product.attributes.map((a) => (
                      <div className="attributes" key={`${product.id} ${a.id}`}>
                        <p className="attributes__title title">{`${a.name}:`}</p>
                        <div className="attributes__list">
                          {a.items.map((item, i) => (
                            <div key={`${product.id} ${item.id}`}>
                              <input
                                type="radio"
                                id={`${a.id} ${item.id}`}
                                name={a.name}
                                checked={item.selected}
                                value={item.value}
                                disabled={product.inStock ? false : true}
                                onChange={this.handleOnChange}
                              />
                              <label htmlFor={`${a.id} ${item.id}`}>
                                <div
                                  className={
                                    a.name === "Color"
                                      ? "attributes__color"
                                      : "attributes__text"
                                  }
                                  style={
                                    a.name === "Color"
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
                                  {a.name === "Color" ? "" : item.value}
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="price_description_block">
                      <p>Price:</p>
                      <b>
                        {product.prices[currency].currency.symbol}
                        {product.prices[currency].amount}
                      </b>
                      {product.inStock ? (
                        <button
                          className="add_to_cart_btn"
                          onClick={() => {
                            this.addProductToCart(product);
                          }}
                        >
                          Add to cart
                        </button>
                      ) : (
                        <button className="add_to_cart_btn out-of-stock">
                          Out of stock
                        </button>
                      )}

                      <p> {parse(product.description)}</p>
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

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (product) => dispatch(addProductToCart(product)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Pdp);
