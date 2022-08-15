import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import CartOverlay from "./CartOverlay";
import { Dropdown } from "./Dropdown";
import { connect } from "react-redux";
import logo from "../assets/a-logo.svg";
import { cart, totalQty } from "../Redux/cartSlice";
class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cartOpen: false,
      isOpen: false,
    };
  }
  displayCurrencySymbols = () => {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading</div>;
    } else {
      return data.currencies.map((currency) => {
        const currencyISO = {
          $: "USD",
          "£": "GBP",
          A$: "AUD",
          "¥": "JPY",
          "₽": "RUB",
        };

        return currency.symbol + " " + currencyISO[currency.symbol];
      });
    }
  };
  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
    this.close();
  };
  close = () => {
    this.setState({ cartOpen: false });
  };
  disableOverflow = () => {
    document.body.style.overflow = "hidden";
  };
  enebleOverflow = () => {
    document.body.style.overflow = "scroll";
  };
  render() {
    const { cartOpen } = this.state;
    const { currency, cart, totalQty, categories } = this.props;
    return (
      <div className="header">
        <div className="category_list">
          {categories.map((category) => {
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
          <Dropdown
            selectCurrency={this.props.selectCurrency}
            currencyList={this.displayCurrencySymbols()}
            isOpen={this.state.isOpen}
            handleClick={this.handleClick}
            close={this.close}
          />
          <button
            onClick={() => {
              this.setState({ cartOpen: true });
              this.setState({ isOpen: false });
              this.disableOverflow();
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
          {cart.length > 0 && <p className="cart_items_counter"> {totalQty}</p>}
          {cartOpen && (
            <div className="cart_overlay_bag">
              <div
                className="sidebar show-cart"
                onClick={() => {
                  this.close();
                  this.enebleOverflow();
                }}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <CartOverlay
                    close={this.close}
                    enebleOverflow={this.enebleOverflow}
                    currency={currency}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  cart: cart(state),
  totalQty: totalQty(state),
}))(Header);
