const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(
  '/graphql',

  graphqlHttp({
    schema,
    graphiql: true,
  })
);

app.listen(3000);
