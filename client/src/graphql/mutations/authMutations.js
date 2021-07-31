import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      name
      username
      token
    }
  }
`;

export const REGISTER = gql`
  mutation Register(
    $username: String!
    $name: String!
    $password: String
    $confirmPassword: String!
    $email: String!
  ) {
    register(
      username: $username
      name: $name
      password: $password
      confirmPassword: $confirmPassword
      email: $email
    ) {
      _id
      name
      username
      token
    }
  }
`;
