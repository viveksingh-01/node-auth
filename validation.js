const Joi = require('@hapi/joi');

const validateRegistrationData = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .min(6)
      .max(255)
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
      .required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

const validateLoginData = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
      .required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.validateRegistrationData = validateRegistrationData;
module.exports.validateLoginData = validateLoginData;
