import React, { Component } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { Query } from "@apollo/react-components";
import { GET_PRODUCTS_BY_CATEGORY } from "../query/getQueries";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }
  render() {
    const { categoryName } = this.props;
    return (
      <div>
        <Query
          key={"key"}
          query={GET_PRODUCTS_BY_CATEGORY}
          variables={{ input: { title: window.location.pathname.slice(1) } }}
          fetchPolicy="no-cache"
          onCompleted={(data) =>
            this.setState({ product: data.category.products })
          }
        >
          {({ loading, data }) => {
            if (loading) {
              return <div>loading</div>;
            }
            const products = data.category.products;
            const { currency } = this.props;
            products.map(p =>{
              console.log(p)
            })
            return (
              <div>
                <div className="container">
                  <h1 className="category_name">
                    {categoryName.toUpperCase()}
                  </h1>
                </div>
                <div className="card_set container">
                  {products.map((product) => {
                    return (
                      <Link to={`/product/${product.id}`}>
                        <Card
                          item={product}
                          price={
                            product.prices[currency].currency.symbol +
                            product.prices[currency].amount
                          }
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default Home;
