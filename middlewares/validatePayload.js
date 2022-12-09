const Joi = require('joi');

module.exports = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(20).required(),
    price: Joi.number().max(2000).required(),
    desc: Joi.string(),
  });

  const { error } = schema.validate(req.body, { convert: false });

  if (error)
    return res.status(400).send({
      ok: false,
      message: `Bad request : ${error.details[0].message}`,
    });

  next();
};
