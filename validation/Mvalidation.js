const Joi = require('joi');
schema = {
    director_id : Joi.number().integer(),
  // title :Joi.string().min(4).max(5).required(),
    //rank: Joi.number().required(),
    //description: Joi.string().min(10).required()
};
schema2 = {
    director_id : Joi.number().integer(),
    title :Joi.string().required(),
    rank: Joi.number().required(),
    description: Joi.string().required()
};
schema3 = {
    director_id : Joi.number().integer(),
    title :Joi.string().required(),
    
};

async function validateMovie(input){
    const result = await Joi.validate(input,schema);
    console.log(result.error);
    return result;
}

async function validatepostMovie(input){
    const result = await Joi.validate(input,schema2);
    console.log(result.error);
    return result;
}
async function validateputMovie(input){
    const result = await Joi.validate(input,schema3);
    console.log(result.error);
    return result;
}
module.exports = {validateMovie,validatepostMovie,validateputMovie}
