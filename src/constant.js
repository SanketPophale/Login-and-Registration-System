module.exports = {
    PUBLIC_DATA: {
      port: process.env.PORT || 5000,
      mongo_uri: process.env.MONGO_URI || `mongodb://localhost:27017/yourDatabaseName`


    },
  };
  