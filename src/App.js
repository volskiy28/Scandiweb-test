import React, { PureComponent } from "react";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Pdp from "./Pages/Pdp";
import { Query } from "@apollo/react-components";
import { getAllCategories } from "./query/getQueries";
import Cart from "./Pages/Cart";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currencyKey: 0,
    };
    this.selectCurrency = this.selectCurrency.bind(this);
  }
  selectCurrency = (value) => {
    this.setState({ currencyKey: value });
  };
  render() {
    return (
      <div className="App">
        <div className="container">
          <Query
            key={"key4"}
            query={getAllCategories}
            fetchPolicy="network-only"
          >
            {({ loading, data }) => {
              if (loading) {
                return <div>loading</div>;
              }
              const { categories } = data;
              const { currencyKey } = this.state;
              return (
                <div>
                  <Header
                    currency={currencyKey}
                    data={data}
                    selectCurrency={this.selectCurrency}
                  />
                  <Routes>
                    <Route
                      path="/Scandiweb-test"
                      element={<Navigate to="/home" />}
                    />
                    {categories.map((cat) => {
                      return (
                        <Route
                          path={`/${cat.name}`}
                          element={
                            <Home
                              categoryName={cat.name}
                              currency={currencyKey}
                            />
                          }
                        />
                      );
                    })}

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
