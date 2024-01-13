const hapiJoiValidator = require("@hapi/joi");

const validatorSchool = (data) => {
    const validateStudent = hapiJoiValidator.object({
        name: hapiJoiValidator.string().trim().required().min(3).max(40)
          .pattern(/^[A-Za-z\s]+$/).messages({
            'string.empty': 'Name cannot be empty',
            'string.min': 'Minimum 3 characters required',
            'string.max': 'Maximum 40 characters allowed',
            'any.pattern.base': 'Name should only contain letters and spaces',
            'any.required': 'Name is required',
          }),
        email: hapiJoiValidator.string().email({ tlds: { allow: false } }).required().max(40).messages({
          'string.empty': 'Email cannot be empty',
          'any.required': 'Email is required',
        }),
        password: hapiJoiValidator.string().required().min(8)
        .pattern(/^[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/).messages({
          'string.empty': 'Password cannot be empty',
          'string.min': 'Minimum 8 characters required',
          'any.pattern.base': 'Password should contain letters, numbers, and special characters',
          'any.required': 'Password is required',
        }),
    
      });

// const validateStudent = hapiJoiValidator.object({
//   name: hapiJoiValidator.string().trim().required().min(3).max(40).custom((value, helpers) => {
//     if (/^[A-Za-z\s]+$/.test(value)) {
//       return helpers.error('string.invalid');
//     }
//     return value;}).messages({
//     'string.empty': 'Name cannot be empty',
//     'string.min': 'Minimum 3 characters required',
//     'string.max': 'Maximum 40 characters allowed',
//     'any.required': 'Name is required',
//     "any.custom" : "Name cannot be a number"
//   }),
//   email: hapiJoiValidator.string().email({ tlds: { allow: false } }).required().max(40).messages({
//     'string.empty': 'Email cannot be empty',
//     'any.required': 'Email is required',
//   }),
//   password: hapiJoiValidator.string().required().min(8),
// });

const validationResult = validateStudent.validate(data);

return validationResult;
}

        
        
        // name: hapiJoiValidator.string().required().min(3).max(40).messages({
        //     'string.empty': 'name cannot be empty',
        //     'string.min': 'Min 3 characters',
        //   }),
        // email: hapiJoiValidator.string().email({ tlds: { allow: false } }).required().max(40).messages({
        //     'string.empty': 'email cannot be empty',
        //   }),
        // password: hapiJoiValidator.string().required().min(8),
        

//     })
    

//     return validateStudent.validate(data);
// };


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