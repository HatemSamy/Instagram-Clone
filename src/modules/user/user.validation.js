import joi from "joi";




export const profile={

  headers:joi.object().required().keys({

    authorization:joi.string().required()

  }).options({allowUnknown:true})

}