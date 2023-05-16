import joi from "joi";

export const signu={
  body:joi.object().required().keys({

     userName:joi.string().required(),
     email:joi.string().email().required(),
     password:joi.string().required(),      ///pattern
     cpassword:joi.string().valid(joi.ref("password")).required(),
     age:joi.number().max(40).min(16)

  })


}
export const confirmEmail={
    params:joi.object().required().keys({
  
       token:joi.string().required(),
       
  
    })
  
  
  }
  export const login={
    body:joi.object().required().keys({
       email:joi.string().email().required(),
       password:joi.string().required(),      ///pattern
     
    })
  
  
  }