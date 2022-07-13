import React, { Component } from "react";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Pdp from "./Pages/Pdp";
import { Query } from "@apollo/react-components";
import { getAllCategories } from "./query/getQueries";
import Cart from "./Pages/Cart";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currencyKey: 0,
      itemNames: [],
    };
    this.addToOrder = this.addToOrder.bind(this);
  }
  componentDidMount() {
    const currencyDropdown = document.querySelector(".dropdown-text");
    document.addEventListener("click", () => {
      switch (currencyDropdown.textContent.charAt(0)) {
        case "£":
          this.setState({
            currencyKey: 1,
          });
          break;
        case "A":
          this.setState({
            currencyKey: 2,
          });
          break;
        case "¥":
          this.setState({
            currencyKey: 3,
          });
          break;
        case "₽":
          this.setState({
            currencyKey: 4,
          });
          break;
        default:
          this.setState({
            currencyKey: 0,
          });
      }
    });
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
              const { currencyKey, orders, itemNames } = this.state;

              return (
                <div>
                  <Header
                    currency={currencyKey}
                    orders={orders}
                    data={data}
                    total={this.state.total}
                  />
                  <Routes>
                    <Route path="/Scandiweb-test" element={<Navigate to="/all" />} />
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
                        />
                      }
                    />
                    <Route
                      exact
                      path="/cart"
                      element={
                        <Cart
                          total={this.state.total}
                          orders={this.state.orders}
                          currency={currencyKey}
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
}

export default App;
