const computerRouter = require('../domains/computers/computerRouter');
const userRouter = require("../domains/users/userRouter");
const vehicleRouter = require("../domains/vehicles/vehicleRouter");

module.exports = function(app) {
    app.use("/computers", computerRouter);
    app.use("/users", userRouter);
    app.use("/vehicles", vehicleRouter);


    // Mount other routers
    app.get("/", (req, res) => res.send("Welcome to the Cloud HW1 API!")); // TEST ENDPOINT
};
