import React, { Component } from "react";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Pdp from "./Pages/Pdp";
import { Query } from "@apollo/react-components";
import { getAllCategories } from "./query/getQueries";
import Cart from "./Pages/Cart";

class Currency extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Query query={getAllCategories}>
          {({ loading, data }) => {
            if (loading) {
              return <div>loading</div>;
            }
            const { currencies } = data;
            return (
              <select onChange={this.props.selectCurrency} id="select" className="select">
               {currencies.map((s) =>{
               return <option value={s.symbol} className="option">{s.symbol}</option>
               })}
              </select>
            );
          }}
        </Query>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currencyKey: 0,
      itemNames: [],
      quantities: [],
    };
    this.addToOrder = this.addToOrder.bind(this);
    this.selectCurrency = this.selectCurrency.bind(this);
  }
  selectCurrency() {
    const select = document.querySelector("#select");
    if (select.value === "$") {
      console.log("$");
      this.setState({ currencyKey: 0 });
    }
    if (select.value === "£") {
      console.log("£");
      this.setState({ currencyKey: 1 });
    }
    if (select.value === "A$") {
      console.log("A$");
      this.setState({ currencyKey: 2 });
    }
    if (select.value === "¥") {
      this.setState({ currencyKey: 3 });
    }
    if (select.value === "₽") {
      this.setState({ currencyKey: 4 });
    }
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <Query query={getAllCategories}>
            {({ loading, data }) => {
              if (loading) {
                return <div>loading</div>;
              }
              const { categories } = data;
              const { currencyKey, orders, itemNames, quantities } = this.state;
              return (
                <div>
                  <Header
                    currency={currencyKey}
                    orders={orders}
                    data={data}
                    quantities={quantities}
                    addQuantity={this.addQuantity}
                    removeQuantity={this.removeQuantity}
                    emptyCart={this.emptyCart}
                    removeItem={this.removeItem}
                    selectCurrency={this.selectCurrency}
                  />
                  <Routes>
                    <Route
                      path="/Scandiweb-test"
                      element={<Navigate to="/home" />}
                    />
                    <Route
                      path={`/${categories[0].name}`}
                      element={
                        <Home
                          onAdd={this.addToOrder}
                          categoryName={categories[0].name}
                          currency={currencyKey}
                        />
                      }
                    />
                    <Route
                      path={`/${categories[1].name}`}
                      element={
                        <Home
                          currency={currencyKey}
                          categoryName={categories[1].name}
                        />
                      }
                    />
                    <Route
                      path={`/${categories[2].name}`}
                      element={
                        <Home
                          currency={currencyKey}
                          categoryName={categories[2].name}
                        />
                      }
                    />

                    <Route
                      exact
                      path="/product/:productID"
                      element={
                        <Pdp
                          itemNames={itemNames}
                          onAdd={this.addToOrder}
                          currency={currencyKey}
                          quantities={quantities}
                          addQuantity={this.addQuantity}
                        />
                      }
                    />
                    <Route
                      exact
                      path="/cart"
                      element={
                        <Cart
                          orders={orders}
                          currency={currencyKey}
                          quantities={quantities}
                          addQuantity={this.addQuantity}
                          removeQuantity={this.removeQuantity}
                          emptyCart={this.emptyCart}
                          removeItem={this.removeItem}
                        />
                      }
                    />
                  </Routes>
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }

  addToOrder = (item, itemName) => {
    this.setState((prevState) => ({
      orders: [...prevState.orders, item],
      itemNames: [...this.state.itemNames, itemName],
    }));
  };
  addQuantity = (quantity) => {
    this.setState({
      quantities: [...this.state.quantities, quantity],
    });
  };
  removeQuantity = (toremove) => {
    this.setState({
      quantities: this.state.quantities.filter((prod) => prod !== toremove),
    });
  };
  emptyCart = () => {
    this.setState({
      orders: [],
      itemNames: [],
      quantities: [],
    });
  };
  removeItem = (index) => {
    this.setState({
      orders: this.state.orders.filter((_, i) => i !== index),
    });
  };
}

export { App, Currency };
