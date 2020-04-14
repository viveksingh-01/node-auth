const Joi = require('@hapi/joi');

function validateRegistration(data) {
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
}

module.exports.validateRegistration = validateRegistration;
