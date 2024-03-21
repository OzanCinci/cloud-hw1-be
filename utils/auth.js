const crypto = require('crypto');
const User = require("../domains/users/User");

function createHash(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}

const checkOwnership = async (password, email, model, itemId) => {
    const stringToBeHashed = password + email;
    const token = createHash(stringToBeHashed);
    
    const user = await User.findOne({ password: token });
    if (!user) 
        return false;

    const item = await model.findById(itemId);
    if (!item)
        return false;

    const userId = user._id;
    const ownerId = item.userId;
    if (!userId || !ownerId)
        return false;

    return userId==ownerId;
};

const validateAdmin = async (password, email) => {
    const stringToBeHashed = password + email;
    const token = createHash(stringToBeHashed);
    
    const user = await User.findOne({ password: token });
    if (!user || user.role!="ADMIN") 
        throw new Error(`No ADMIN user found with that email: ${email}`);
    return true;
};

const validateUser = async (password, email) => {
    const stringToBeHashed = password + email;
    const token = createHash(stringToBeHashed);
    
    const user = await User.findOne({ password: token });
    if (!user) 
        throw new Error(`No user found with that email: ${email}`);
    return user;
};


module.exports = {
    createHash,
    checkOwnership,
    validateAdmin,
    validateUser,
}