import React, { Component } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { Query } from "@apollo/react-components";
import { categoryRequest } from "../query/getQueries";

class Home extends Component {
  render() {
    const { categoryName, addQuantity, quantities, itemNames } = this.props;
    return (
      <div>
        <Query query={categoryRequest(categoryName)}>
          {({ loading, data }) => {
            if (loading) {
              return <div>loading</div>;
            }
            const { category } = data;
            const {currency, onAdd} = this.props
            return (
              <div>
                <div className="container">
                  <h1 className="category_name">
                    {categoryName.toUpperCase()}
                  </h1>
                </div>
                <div className="card_set container">
                  {category.products.map((product) => {
                    return (
                      <Link to={`/product/${product.id}`}>
                        <Card
                          key={product.id}
                          onAdd={onAdd}
                          item={product}
                          inStock={product.inStock}
                          source={product.gallery[0]}
                          name={`${product.brand} ${product.name}`}
                          price={
                            product.prices[currency].currency.symbol +
                            product.prices[currency].amount
                          }
                          addQuantity = {addQuantity}
                          quantities = {quantities}
                          itemNames = {itemNames}
                          
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
