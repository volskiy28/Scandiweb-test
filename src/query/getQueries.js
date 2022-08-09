import { gql } from "@apollo/client";

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
 const GET_PRODUCTS_BY_CATEGORY = gql`
  query category($input: CategoryInput) {
    category(input: $input) {
      products {
        id
        brand
        name
        inStock
        gallery
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
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
const productRequest = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
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
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export { getAllProducts, getAllCategories, productRequest, categoryRequest, GET_PRODUCTS_BY_CATEGORY };
