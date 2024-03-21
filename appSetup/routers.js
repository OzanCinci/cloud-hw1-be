const computerRouter = require('../domains/computers/computerRouter');

module.exports = function(app) {
    app.use("/computers", computerRouter);
    
    
    // Mount other routers
    app.get("/", (req, res) => res.send("Welcome to the Cloud HW1 API!")); // TEST ENDPOINT
};
