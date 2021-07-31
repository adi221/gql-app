import gql from 'graphql-tag';

export const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      likes {
        _id
        user
      }
    }
  }
`;

export const COMMENT_POST = gql`
  mutation CommentPost($postId: ID!, $commentBody: String!) {
    commentPost(postId: $postId, commentBody: $commentBody) {
      _id
      comments {
        body
        user
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      _id
      body
      createdAt
      username
      likes {
        _id
        username
        createdAt
      }
      comments {
        _id
        body
        username
        createdAt
      }
    }
  }
`;
