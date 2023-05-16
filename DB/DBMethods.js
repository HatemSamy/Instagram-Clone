//find method
export const findOne = async ({ model, filter = {}, select = "", populate = [] } = {}) => {

    const resualt = await model.findOne(filter).select(select).populate(populate)
    return resualt

}
export const findById = async ({model, filter= {}, select = "", populate = []} = {}) => { // name argument

    const resualt = await model.findById(filter).select(select).populate(populate)
    return resualt

}

export const find = async ({model, select = "", filter= {}, skip = 0, limit = 2, populate = [] }= {}) => { // name argument

    const resualt = await model.find(filter).select(select).populate(populate).skip(skip).limit(limit)
    return resualt

}
//update
export const findoneAndupdate = async ({ model, filter = {}, data = {}, options = {}, select = "" } = {}) => {
    const resualt = await model.findOneAndUpdate(filter, data, options).select(select)
    return resualt
}
export const findByIdAndUpdate = async ({ model, filter ={}, data = {}, options = {}, select = "" } = {}) => {
    const resualt = await model.findByIdAndUpdate(filter,data, options).select(select)
    return resualt
}
export const updateOne = async ({ model, filter = {}, data = {} } = {}) => {
    const resualt = await model.updateOne(filter, data).select(select)
    return resualt
}
//delete

export const deleteOne = async ({ model, filter = {} } = {}) => {
    const resualt = await model.deleteOne(filter, data).select(select)
    return resualt
}

export const findoneAndDelete = async ({ model, filter = {}, select = "" } = {}) => {
    const resualt = await model.findOneAndDelete(filter).select(select)
    return resualt
}
export const findBYIdDelete = async ({ model, filter = {}, select = "" } = {}) => {
    const resualt = await model.findBYIdDelete(filter).select(select)
    return resualt
}
//create
export const create= async({model,data={}}={})=>{
    const resualt = await model.create(data)
       return resualt
   }
   //save
   export const createAndsave= async({model,data={}}={})=>{
    const newobj = new model(data)
    const saveobj= await newobj.save()
       return saveobj
   }
   export const insertMany= async({ model,data=[{}] }={})=>{
    const resualt = await model.insertMany([data])
       return resualt
   }
