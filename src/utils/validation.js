const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
      throw new Error("Name is not valid!");
    } else if (!validator.isEmail(emailId)) {
      throw new Error("Email is not valid!");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Please enter a strong Password!");
    }

};

const validateEditProfile = (req) => {
    const allowedEditFieldsSet = new Set(["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"]);
    const invalidField = Object.keys(req.body).find((field) => !allowedEditFieldsSet.has(field));
    return invalidField;
}   

module.exports = {
    validateSignUpData,validateEditProfile
};