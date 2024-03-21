const paginate = require("../../utils/pagination");
const User = require("./User");
const {
    createHash,
    validateAdmin
} = require("../../utils/auth");

function checkEmail(email) {
    // Regular expression to match the specific domain pattern
    const regex = /@ceng\.metu\.edu\.tr$/;
    return regex.test(email);
}


const signUp = async (userData) => {
    if (userData.role!="ADMIN" && !checkEmail(userData.email)) {
        throw new Error(`Sorry mate! METU Ceng only platform!`);
    }

    const stringToBeHashed = userData.password + userData.email;
    const token = createHash(stringToBeHashed);
    userData.password = token;

    const user = new User(userData);
    await user.save();

    return {"token" : token, "userId": user._id};
};

const logIn = async (body) => {
    const stringToBeHashed = body.password + body.email;
    const token = createHash(stringToBeHashed);
    const user = await User.findOne({ password: token });
    if (!user)
        throw new Error(`Incorrect email or password!`);
    return {"token" : token, "userId": user._id};
};

const deleteUser = async (body,email) => {
    validateAdmin(body.password, body.email);
    const result = await User.deleteOne({ email: email });
    if (result.deletedCount === 0) {
      throw new Error(`No user found with that email: ${email}`);
    }
};

module.exports = {
    signUp,
    logIn,
    deleteUser,
}