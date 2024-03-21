const mongoose = require('mongoose');

const dbURI = "mongodb+srv://ozan-1:ozan-1-cloud@cloud-hw-1.makf8rj.mongodb.net/?retryWrites=true&w=majority&appName=cloud-hw-1";
exports.connectDatabase = () => {
    return mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
};
