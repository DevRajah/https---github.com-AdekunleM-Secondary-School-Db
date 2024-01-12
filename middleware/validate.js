const hapiJoiValidator = require("@hapi/joi");

const validatorSchool = (data) => {
    const validateStudent = hapiJoiValidator.object({
        name: hapiJoiValidator.string().required().min(3).max(40).messages({
            'string.empty': 'name cannot be empty',
            'string.min': 'Min 3 characters',
          }),
        email: hapiJoiValidator.string().email({ tlds: { allow: false } }).required().max(40).messages({
            'string.empty': 'email cannot be empty',
          }),
        password: hapiJoiValidator.string().required().min(8),

    })
    return validateStudent.validate(data);
};


const validatorSchool2 = (data) => {
    const validateStudent = hapiJoiValidator.object({
        email: hapiJoiValidator.string().email({ tlds: { allow: false } }).required().max(40).messages({
            'string.empty': 'name cannot be empty',
          }),
        password: hapiJoiValidator.string().required().min(8),

    })
    return validateStudent.validate(data);
};



module.exports = {
    validatorSchool, 
    validatorSchool2 

};