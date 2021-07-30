const { createModule } = require('graphql-modules');
const { gql } = require('apollo-server');
const Post = require('../../models/postModel');
const User = require('../../models/userModel');
const checkAuth = require('../../utils/check-auth');

const typeDefs = gql`
  type Post {
    _id: ID!
    body: String!
    user: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    _id: ID!
    user: String!
    body: String!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    _id: ID!
    user: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    post(id: ID!): Post
    posts: [Post]!
  }

  type Mutation {
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    likePost(userId: ID!): Post!
  }

  type Subscription {
    newPost: Post!
  }
`;

const resolvers = {
  Query: {
    async post(_, { id }) {
      try {
        const post = await Post.findById(id);
        if (post) return post;
        else throw new Error('Post not found');
      } catch (error) {
        console.log(error);
      }
    },
    async posts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      try {
        const { id, username } = checkAuth(context);

        const newPost = new Post({
          body,
          user: id,
          username: username,
          comments: [],
          likes: [],
        });

        const post = await newPost.save();

        const user = await User.findById(id);
        user.posts.push(post._id);
        await user.save();

        // context.pubsub.publish('NEW_POST', { newPost: post });
        return post;
      } catch (error) {
        console.log(error);
      }
    },
    async deletePost(_, { postId }, context) {
      try {
        const { id } = checkAuth(context);
        const post = await Post.findById(postId);
        if (!post) throw new Error(`Post not found`);

        if (id === post.user) {
          await post.delete();
          return `Deleted Successfully`;
        } else {
          throw new Error(`Action not allowed`);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async likePost(_, { postId }, context) {
      try {
        const { id } = checkAuth(context);

        const post = await Post.findById(postId);
        if (!post) throw new Error(`Post not found`);

        if (post.likes.find(like => like.user.toString() === id.toString())) {
          // Post already likes, unlike it
          post.likes = post.likes.filter(
            like => like.user.toString() !== id.toString()
          );
        } else {
          // Not liked, like post
          post.likes.push({ user: id });
        }

        await post.save();
        return post;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST'),
    },
  },
};

module.exports = { typeDefs, resolvers };

// module.exports = createModule({
//   id: 'posts',
//   dirname: __dirname,
//   typeDefs: [typeDefs],
//   resolvers,
// });
