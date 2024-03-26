const {
  prepareFilterQuery
} = require("./query");


/**
 * Paginate any mongoose model
 * @param {Mongoose.Model} model - Mongoose model for which to perform pagination
 * @param {Object} req - Request from client
 * @param {String} type - Type for query generation
 * @returns {Object} - Object containing pagination results and info
 */
async function paginate(model, req, type) {
  const { limit, startIndex, page } = preparePagination(req);
  const  query = prepareFilterQuery(req, type);

  // Find items with pagination and filtering
  const items = await model.find(query).limit(limit).skip(startIndex);
  const totalCount = await model.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    totalCount,
    totalPages,
    currentPage: page,
    data: items
  };
}

function preparePagination(req) {
  const page = parseInt(req?.query?.page) || 1;
  const limit = parseInt(req?.query?.limit) || 4;
  const startIndex = (page - 1) * limit;
  //const endIndex = page * limit;
  return {
      limit,
      startIndex,
      page
  };
}
  
module.exports = paginate;
  