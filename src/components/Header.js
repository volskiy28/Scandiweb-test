import { Query } from "@apollo/react-components";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getAllProducts } from "../query/getQueries";
import CartOverlay from "./CartOverlay";
import { Dropdown } from "./Dropdown";
import { connect } from "react-redux";
import logo from "../assets/a-logo.svg";



class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartOpen: false,
    };
  }
  componentDidMount() {
    let target = document.body;
    window.addEventListener("click", (e) => {
      if (e.target.getAttribute("id") !== "cart_overlay" && e.target.getAttribute("id") !== "quantity_gallery_block") {
        this.setState({ cartOpen: false });
        target.classList.remove("disable_scroll");
      } else {
        target.classList.add("disable_scroll");
      }
    });
  }
  displayCurrencySymbols() {
    const data = this.props.data;

    if (data.loading) {
      return ['Loading'];
    } else {
      return data.currencies.map((currency) => {
        const currencyISO = {
          $: 'USD',
          '£': 'GBP',
          A$: 'AUD',
          '¥': 'JPY',
          '₽': 'RUB',
        };

        return currency.symbol + ' ' + currencyISO[currency.symbol];
      });
    }
  }
  render() {
    const { cartOpen } = this.state;
    const {
      currency,
      cart,
      totalQty
    } = this.props;
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
                  <img src={logo} alt="logo" width={40} height={40} />
                </div>
                <div className="currency">
                  <Dropdown selectCurrency = {this.props.selectCurrency}
                    currencyList={this.displayCurrencySymbols()}
                  />
                  <button
                    onClick={() => {
                      this.setState({ cartOpen: !cartOpen });
                    }}
                    className="cart-button "
                  >
                    <img
                      id="cart_overlay"
                      width={22}
                      height={22}
                      alt="cart"
                      src={require("../assets/cart.png")}
                    />
                  </button>
                  {cart.length > 0 && (
                    <p className="cart_items_counter"> {totalQty}</p>
                  )}
                  {cartOpen && (
                    <div className="cart_overlay_bag">
                      <div className="sidebar show-cart">
                        <CartOverlay
                          currency={currency}
                        />
                      </div>
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

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    totalQty: state.shop.totalQty,
  };
};

const functionFromConnect = connect(mapStateToProps, null);

export default functionFromConnect(Header);
