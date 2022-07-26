import React, { Component } from "react";
import { Query } from "@apollo/react-components";
import { getAllCategories } from "../query/getQueries";

export class Dropdown extends Component {
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
                <select
                  onChange={this.props.selectCurrency}
                  id="select"
                  className="select"
                >
                  {currencies.map((s) => {
                    return (
                      <option value={s.symbol} className="option">
                        {s.symbol}
                      </option>
                    );
                  })}
                </select>
              );
            }}
          </Query>
        </div>
      );
    }
  }