import { Query } from "@apollo/react-components";
import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import { getAllProducts } from "../query/getQueries";
import CartOverlay from "./CartOverlay";
import { Dropdown } from "./Dropdown";
import { connect } from "react-redux";
import logo from "../assets/a-logo.svg";
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
  };
  close = () => {
    this.setState({ cartOpen: false });
  };
  render() {
    const { cartOpen } = this.state;
    const { currency, cart, totalQty } = this.props;
    return (
      <Query key={"key1"} query={getAllProducts}>
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
                  <Dropdown
                    selectCurrency={this.props.selectCurrency}
                    currencyList={this.displayCurrencySymbols()}
                    isOpen={this.state.isOpen}
                    handleClick={this.handleClick}
                  />
                  <button
                    onClick={() => {
                      this.setState({ cartOpen: true });
                      this.setState({ isOpen: false });
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
                      <div
                        className="sidebar show-cart"
                        onClick={() => {
                          this.close();
                        }}
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <CartOverlay close={this.close} currency={currency} />
                        </div>
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
