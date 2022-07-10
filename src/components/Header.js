import { Query } from "@apollo/react-components";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getAllProducts } from "../query/getQueries";
import CartOverlay from "./CartOverlay";
import Dropdown from "./Dropdown";
import logo from "../assets/a-logo.svg"

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartOpen: false,
    };
  }
  displayCurrencySymbols() {
    const data = this.props.data;

    if (data.loading) {
      return ["Loading"];
    }
    return data.currencies.map((currency) => {
      const currencyISO = {
        "$": "USD",
        "£": "GBP",
        "A$": "AUD",
        "¥": "JPY",
        "₽": "RUB",
      };

      return currency.symbol + " " + currencyISO[currency.symbol];
    });
  }

  render() {
    const { cartOpen } = this.state;
    const { orders, currency, total } = this.props;
    console.log(currency);
    return (
      <Query query={getAllProducts}>
        {({ loading, data }) => {
          if (loading) {
            return <div>loading</div>;
          } else {
            return (
              <div className="header">
                <div className="category_list">
                  {data.categories.map((category) => {
                    return (
                      <li key={category.name} className="category">
                        <NavLink
                          activeClassName="active"
                          id={category.name}
                          to={`/${category.name}`}
                        >
                          {category.name}
                        </NavLink>
                      </li>
                    );
                  })}
                </div>

                <div className="logo">
                  <img
                    src={logo}
                    alt="logo"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="currency">
                  <Dropdown currencyList={this.displayCurrencySymbols()} />
                  <button
                    onClick={() => this.setState({ cartOpen: !cartOpen })}
                    className="cart-button "
                  >
                    <img
                      width={20}
                      height={20}
                      alt="cart"
                      src={require ("../assets/cart.png") }
                    />
                  </button>
                  {cartOpen && (
                    <div className="cart_overlay_bag">
                      <CartOverlay
                        currency={currency}
                        orders={orders}
                        total={total}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default Header;
