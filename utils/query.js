const {
    types
} = require("./constants");

const prepareFilterQuery = (req, type) => {
    switch(type) {
        case types.COMPUTERS:
            return prepareComputersQuery(req);
        case types.PHONES:
            return preparePhonesQuery(req);
        case types.VEHICLES:
            return prepareVehiclesQuery(req);
        case types.PRIVATE_LESSONS:
            return preparePrivateLessonsQuery(req);
        default:
            throw new Error("Not an valid type for query preperation.");
    }
};

const prepareComputersQuery = (req) => {
    const q = req.query;
    let result = {};
    if (!q)
        return result;

    delete q.page;
    delete q.limit;

    // Example of simple sanitation, you might want to use a library for more complex cases
    for (const key in q) {
        result[key] = decodeURIComponent(q[key]);
    }

    return result;
};

const preparePhonesQuery = (req) => {
    return {};
};

const prepareVehiclesQuery = (req) => {
    return {};
};

const preparePrivateLessonsQuery = (req) => {
    return {};
};

module.exports = {
    prepareFilterQuery,
};