import React, { Component } from "react";
import cartImg from "../assets/Common.svg"

class Card extends Component {
  displayInStock = () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      if (card.getAttribute("data-in-stock") === "false") {
        card.classList.add("nostock");
      } else {
        card.classList.remove("nostock");
      }
    });
  };
  componentDidMount() {
    this.displayInStock();
  }
  render() {
    return (
      <div data-in-stock={this.props.inStock} className="card">
        <img
          src={this.props.source}
          width={354}
          height={330}
          className="card-img"
          alt="card_img"
        />
        <span>{this.props.name}</span>
        <b>{this.props.price}</b>
        <div
        >
          <img
            width={52}
            height={52}
            src={cartImg}
            alt="item_img"
            className="add_to_cart"
          />
        </div>
      </div>
    );
  }
}

export default Card;
