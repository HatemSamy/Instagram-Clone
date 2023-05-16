import joi from "joi"



export const addpost={

body:joi.object().required().keys({

caption:joi.string().max(50).min(5),

})

}
export const like={

     params:joi.object().required().keys({
    
     id:joi.string().required(),
    
    })

    }