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
      currencyKey: 0,
      // show: false,
    };
    this.selectCurrency = this.selectCurrency.bind(this);
    // this.toggleCart = this.toggleCart.bind(this);
  }
  selectCurrency = (value) => {
    this.setState({ currencyKey: value });
  };
  // toggleCart = () => {
  //   this.setState({ show: !this.state.show });
  // };
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
              const { currencyKey } = this.state;
              return (
                <div>
                  <Header
                    // toggleCart={this.toggleCart}
                    currency={currencyKey}
                    data={data}
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
                          categoryName={categories[0].name}
                          currency={currencyKey}
                        />
                      }
                    />
                    <Route
                      path={`/${categories[1].name}`}
                      element={<Home categoryName={categories[1].name} />}
                    />
                    <Route
                      path={`/${categories[2].name}`}
                      element={<Home categoryName={categories[2].name} />}
                    />

                    <Route
                      exact
                      path="/product/:productID"
                      element={<Pdp currency={currencyKey} />}
                    />
                    <Route
                      exact
                      path="/cart"
                      element={<Cart currency={currencyKey} />}
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
}

export { App };
