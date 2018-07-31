'use strict';

/* handler.js */
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

// This method just inserts the user's gift name into the response message.
const getGiftName = giftName => `Hello, ${giftName}.`

/*
 * stolen from https://github.com/serverless/examples/tree/master/aws-node-graphql-api-with-dynamodb
 */

// Here we declare the schema and resolvers for the query
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'TestQueryType', // an arbitrary name
    fields: {
      greeting: {
        args: { gifttName: { gift: 'gifttName', type: new GraphQLNonNull(GraphQLString) } },
        type: GraphQLString,
        resolve: (parent, args) => getGiftName(args.gifttName)
      }
    }
  }),
});

let graph = (event, context, callback) =>
  graphql(schema, event.queryStringParameters.query)
  .then(
    result => callback(null, { statusCode: 200, body: JSON.stringify(result) }),
    err => callback(err)
  );

module.exports.graph = graph