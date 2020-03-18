const Joi = require('joi');
schema = {
    director_id : Joi.number().integer(),
   // director_name :Joi.string()
};
schema1 = {
    director_id : Joi.number().integer(),
   director_name :Joi.string()
};
async function validateDirector(inputobj){
    const result = await Joi.validate(inputobj,schema);
    console.log(result.error);
    return result;
}
 async function validateputDirector(inputobj){
        const result = await Joi.validate(inputobj,schema1);
        console.log(result.error);
        return result;
}
module.exports = {validateDirector,validateputDirector}
