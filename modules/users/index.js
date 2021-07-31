const { createModule } = require('graphql-modules');
const { gql } = require('apollo-server');
const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../utils/validators');
const { generateToken } = require('../../utils/generate-token');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    username: String!
    email: String!
    password: String!
    posts: [Post]!
    createdAt: String!
    updatedAt: String!
    token: String
  }

  input RegisterInput {
    name: String!
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  extend type Query {
    user(id: ID!): User
    users: [User]!
  }

  extend type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;

const resolvers = {
  Query: {
    async user(_, { id }) {
      try {
        const user = await User.findById(id);
        if (user) return user;
        else throw new Error(`User not found`);
      } catch (error) {
        console.log(error);
      }
    },
    async users() {
      try {
        const allUsers = await User.find({});
        return allUsers;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async login(_, { username, password }, context) {
      if (context.req.headers.authorization) {
        const { id } = req.headers.authorization;
        const user = await User.findById(id);
        return user;
      }

      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      // if (!(await user.matchPassword(password))) {
      //   errors.general = 'Wrong credentials';
      //   throw new UserInputError('Wrong credentials', { errors });
      // }

      const token = generateToken(user._id, user.username);

      return {
        ...user.toObject(),
        token,
      };
    },
    async register(_, { registerInput }) {
      let { name, username, email, password, confirmPassword } = registerInput;
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        name,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // Make sure user doesnt already exist
      const doesUserExists = await User.findOne({ username });
      if (doesUserExists) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        name,
        username,
        password,
        email,
      });

      const res = await newUser.save();

      const token = generateToken(res._id, res.username);

      return {
        ...res.toObject(),
        token,
      };
    },
  },
};

module.exports = { typeDefs, resolvers };
