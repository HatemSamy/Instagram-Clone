import joi from "joi";

export const CreateCmmente = {

    params: joi.object().required().keys({

        PostId: joi.string().required()

    }),
    body: joi.object().required().keys({

        text: joi.string().required()


    })

}