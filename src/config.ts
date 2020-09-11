const config = {
  apiKey: process.env.API_KEY,
  mongoConnectURI: process.env.MONGODB_URI,
  mongoDbName: process.env.MONGO_DBNAME,
  port: process.env.PORT,
};

export default config;
