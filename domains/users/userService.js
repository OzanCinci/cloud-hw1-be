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
    const dto = {...user};
    delete dto.password
    return {"token" : token, "userId": user._id,...dto};
};

const logIn = async (body) => {
    const stringToBeHashed = body.password + body.email;
    const token = createHash(stringToBeHashed);
    const user = await User.findOne({ password: token });
    if (!user)
        throw new Error(`Incorrect email or password!`);
    const dto = {...user};
    delete dto.password
    return {"token" : token, "userId": user._id,...dto};
};

const deleteUser = async (body,email) => {
    validateAdmin(body.password, body.email);
    const result = await User.deleteOne({ email: email });
    console.log(result, email)
    if (result.deletedCount === 0) {
      throw new Error(`No user found with that email: ${email}`);
    }
};

const updateUser = async (body) => {
    let stringToBeHashed = body.oldPassword + body.email;
    let token = createHash(stringToBeHashed);
    const user = await User.findOne({ password: token });
    if (!user)
        throw new Error(`No user found with that email: ${body.email}`);
    
    delete body.oldPassword
    stringToBeHashed = body.password + body.email;
    const newToken = createHash(stringToBeHashed);
    body.password = newToken;
    const updatedUser = await User.findOneAndUpdate({ password: token }, body, { new: true })
    if (!updatedUser)
        throw new Error(`Something went wrong while updating your account`);
    const dto = {...updatedUser};
    delete dto.password
    return {"token" : token, "userId": updatedUser._id,...dto};
}

const getAllNonAdminUser = async (body) => {
    validateAdmin(body.password, body.email);
    const nonAdminUsers = await User.find({ role: { $ne: 'ADMIN' } });
    return nonAdminUsers;
}


module.exports = {
    signUp,
    logIn,
    deleteUser,
    updateUser,
    getAllNonAdminUser
}