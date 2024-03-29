import mongoose = require("mongoose");

export = (client: any) => {
  const dbOptions = {
    useNewUrlParser: true,
    autoIndex: false,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true
  };

  mongoose.connect(client.config.mongodb_uri, dbOptions);
  mongoose.Promise = global.Promise;
  mongoose.connection.on("connected", () => {
    client.logger.info("Connected to Database.");
  });
  mongoose.connection.on("err", err => {
    client.logger.error(`Mongoose have error: ${err}`);
  });
  mongoose.connection.on("disconnected", () => {
    client.logger.info("Disconnected from Database.");
  });
};
