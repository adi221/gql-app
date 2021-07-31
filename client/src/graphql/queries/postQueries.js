import gql from 'graphql-tag';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      _id
      body
      user
      username
      comments {
        _id
        user
        body
        createdAt
      }
      likes {
        _id
        user
      }
    }
  }
`;
