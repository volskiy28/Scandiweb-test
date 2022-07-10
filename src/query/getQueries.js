import { gql } from '@apollo/client';

const getAllProducts = gql`
  query {
    categories {
      name
      products {
        id
        attributes {
          name
        }
        name
        inStock
        gallery
        description
        category
        brand
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
          }
        }
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`;

const getAllCategories = gql`
  query {
    categories {
      name
    }

    currencies {
      symbol
    }
  }
`;

const categoryRequest = (category) => gql`
query {
  category (input: {title: "${category}"}) {
    products {
          id
          attributes {
            name
          }
          name
          inStock
          gallery
          description
          category
          brand
          attributes {
            id
            name
            type
            items {
              id
              displayValue
              value
            }
          }
          prices {
            currency {
              symbol
            }
            amount
          }
        }
  }
  }
          
`;

const productRequest = (productID) => gql`
query {
  product(id: "${productID}") {
    name
    inStock
    gallery
    description
    category
    attributes {
      
      name
      items {
        id
        value
        displayValue
      }
    }
    prices {
      amount
      currency {
        symbol
      }
    }
    brand
  }
}
`;

export { getAllProducts, getAllCategories, productRequest, categoryRequest };
