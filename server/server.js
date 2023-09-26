const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.on("error", console.error.bind(console, "connection error:"));

  
  db.once('open', () => {
    console.log("We are connected to the database!");
    checkConnectionState();

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };

  function checkConnectionState() {
    switch (db.readyState) {
      case 0:
        console.log("Mongoose connection state: disconnected");
        break;
      case 1:
        console.log("Mongoose connection state: connected");
        break;
      case 2:
        console.log("Mongoose connection state: connecting");
        break;
      case 3:
        console.log("Mongoose connection state: disconnecting");
        break;
      default:
        console.log("Mongoose connection state: unknown");
        break;
    }
  }

  
// Call the async function to start the server
  startApolloServer();
