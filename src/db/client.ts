import mongoose from 'mongoose';

import config from '../config';

mongoose
  .connect(config.mongoConnectURI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
    dbName: config.mongoDbName,
  })
  .then(() => {
    console.log(`MongoDb started`);
  })
  .catch((err) => console.log(`Mongodb connecting error | ${err}`));
mongoose.connection.on('error', (err) => {
  console.log(`MongoDb error | ${err}`);
});
mongoose.connection.on('reconnect', () => {
  console.log('MongoDb reconnected');
});
mongoose.connection.on('disconnected', () => {
  console.log('MongoDb disconnected');
});
mongoose.Promise = global.Promise;
