import React, { Component } from "react";
import cartImg from "../assets/Common.svg";
import { connect } from "react-redux";
import { addToCart, cart } from "../Redux/cartSlice";


class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
    }
  }
  addProductToCart = (product) => {
    let updatedProduct = {};
    if (product.attributes.length === 0) {
      updatedProduct = {
        ...product,
        qty: 1,
        id: `${product.id} `,
      };
      this.props.addToCart(updatedProduct);
    } else {
      const updatedAttributes = product.attributes.map((a) => {
        return {
          ...a,
          items: a.items.map((item, index) => {
            return index === 0
              ? { ...item, selected: true }
              : { ...item, selected: false };
          }),
        };
      });
      const selectedAttribute = updatedAttributes.map((a) =>
        a.items.find((i) => i.selected === true)
      );
      updatedProduct = {
        ...product,
        attributes: updatedAttributes,
        qty: 1,
        id: `${product.id} ${selectedAttribute.map((i) => i.id).join(" ")}`,
      };
      this.props.addToCart(updatedProduct);
      console.log(this.props.cart)
    }
  };
  render() {
    const { item, price } = this.props;
    return (
      
      <div className={`card ${!item.inStock && "nostock"}`}>
        <img
          src={item.gallery[0]}
          width={354}
          height={330}
          className="card-img"
          alt="card_img"
        />
        <div className="title_price">
          <span>{item.name}</span>
          <b>{price}</b>
        </div>
        {item.inStock && (
          <div className="div" onClick={(e) => e.preventDefault()}>
            <img
              onClick={() => this.addProductToCart(item)}
              width={52}
              height={52}
              src={cartImg}
              alt="item_img"
              className="add_to_cart"
            />
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => ({ cart: cart(state) }), { addToCart })(Card)
