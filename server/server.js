const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const graphqlHTTP = require('express-graphql');

const schema = require('./model/schema.js');

//Set test data
// const testData = require('./model/testData.js');
// testData();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/graphql', graphqlHTTP({ schema, context: {user: 'Andrew'}, graphiql: true, extensions: (test) => sendUpdates }));

app.get('/', (req, res) => res.send('hi'));

app.listen(3001);
console.log('listening on 3001');

const sendUpdates = (val) => {
  // io.sockets.emit(handle, 'whatever the fuck I want');
  // console.log('Started from the bottom. Now were here. --Drake');
  console.log(val);
  //io.sockets.emit('news', val);
  const handlers = Object.keys(RDL.queue);
  handlers.forEach((handler) => {
    const query = RDL.subscriptions[handler];
    console.log('hello world');
    graphql(schema, query).then((result) => {
      console.log(result);
      io.sockets.emit(handler, result);
    }); // io.sockets.emit(handle, 'whatever the fuck I want'););
  });
  return val;
};

module.exports = app;
