// ozan-1 : username
// ozan-1-cloud : password
const port = process.env.PORT || 3001;
const express = require("express");
const app = express();
const setupMiddlewares = require('./appSetup/middlewares');
const setupRouters = require('./appSetup/routers');
const { connectDatabase } = require('./appSetup/db');


// Apply middlewares
setupMiddlewares(app);
// Setup routers
setupRouters(app);


connectDatabase()
  .then(()=>{
    console.log("connected to db!");
    const server = app.listen(port, () => console.log(`App listening on port ${port}!`));
    server.keepAliveTimeout = 120 * 1000;
    server.headersTimeout = 130 * 1000; // Slightly more than keepAliveTimeout
  })
  .catch((err) => console.log(err));
