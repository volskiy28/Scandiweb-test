import React, { Component } from "react";
import cartImg from "../assets/Common.svg";
import { getOccurrence } from "..//utils/utilFunc";

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
    const { onAdd, item, itemNames, quantities, addQuantity } = this.props;
    return (
      <div data-in-stock={this.props.inStock} className="card">
        <img
          src={this.props.source}
          width={354}
          height={330}
          className="card-img"
          alt="card_img"
        />
        <div className="title_price">
          <span>{this.props.name}</span>
          <b>{this.props.price}</b>
        </div>
        <div onClick={(e) => e.preventDefault()}>
          <img
            onClick={() => {
              if (item.attributes.length === 0) {
                if (!itemNames.includes(item.name)) {
                  onAdd(
                    [[item], [item.attributes], [], [item.name]],

                    item.name
                  );
                } else {
                  addQuantity(item.name + getOccurrence(quantities, item.name));
                }
              } else {
                alert("This product has attributes");
              }
            }}
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
