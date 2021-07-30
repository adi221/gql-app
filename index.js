const { ApolloServer } = require('apollo-server');
const dotenv = require('dotenv');
const { PubSub } = require('graphql-subscriptions');
const express = require('express');

const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');

dotenv.config();
const connectDB = require('./config/db');
connectDB();

const pubsub = new PubSub();

const server = new ApolloServer({
  modules: [require('./modules/posts'), require('./modules/users')],
  context: ({ req }) => ({ req, pubsub }),
});

server.listen().then(({ url }) => console.log(`Server started at ${url}`));
