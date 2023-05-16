


import userModel from '../../../../DB/model/User.model.js'
import sendEmail from '../../../services/email.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { asynchandlier } from '../../../services/erroeHandling.js'
import { findById, findByIdAndUpdate, findOne, findoneAndDelete, findoneAndupdate, updateOne } from '../../../../DB/DBMethods.js'




export const signup = asynchandlier(async (req, res, next) => {
    const { email, password, userName, age, gender } = req.body
    const user = await findOne({ model: userModel, filter: { email } })
    if (user) {
        res.status(401).json({ message: "user aready exist" })
        // next(new Error("email aready exist", { cause: 401 }))

    } else {

        const newuser = new userModel({ email, password, userName, age, gender })

        const token = jwt.sign({ id: newuser._id }, process.env.emailToken, { expiresIn: "6h" })
        const refreshtoken = jwt.sign({ id: newuser._id }, process.env.emailToken, { expiresIn: "6h" })

        const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
        const link2 = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/refreshtoken/${refreshtoken}`

        const messege = `
        <a href='${link}'>confirmEmail<a/>
        <br><br>
        <a href='${link2}'>refreshtoken<a/>`

        const info = await sendEmail(email, "ConfirmEmail", messege)
        if (info?.accepted?.length) {
            const saveduser = await newuser.save()
            res.status(200).json({ message: " add User successflly", saveduser })

        } else {

            return next(new Error(" fail to add User", { casue: 400 }))

        }
    }

}
)

export const confirmEmail = asynchandlier(async (req, res, next) => {

    const { token } = req.params
    const decoded = jwt.verify(token, process.env.emailToken)
    if (!decoded?.id) {
        next(new (Error("in-valid token", { cause: 401 })))
    } else {
        const findUser = await findById({ model: userModel, filter: { _id: decoded.id } })
        if (!findUser) {
            next(new (Error("not found user", { cause: 403 })))

        } else {
            if (findUser.confirmEmail) {
                next(Error("email aready confirmed", { cause: 403 }))

            } else {
                const useractivation = await findByIdAndUpdate({ model: userModel, filter: { _id: decoded.id, confirmEmail: false }, data: { confirmEmail: true } })
                res.status(201).json({ massage: "email confirmed" })
            }
        }


    }

})
export const refreshtoken = asynchandlier(async (req, res, next) => {

    const { token } = req.params
    const decoded = jwt.verify(token, process.env.emailToken)
    if (!decoded?.id) {
        next(new (Error("in-valid token", { cause: 401 })))
    } else {
        const user = await findById({ model: userModel, filter: { _id: decoded.id } })
        if (!user) {
            next(new (Error("not found user", { casue: 404 })))
        } else {
            const token = jwt.sign({ id: user._id }, process.env.emailToken)
            const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`

            const messege = `
                <a href='${link}'>confirmEmail<a/>
              `

            const info = await sendEmail(user.email, "ConfirmEmail", messege)
            if (info?.accepted?.length) {
                res.status(200).json({ message: " we send new link" })

            } else {

                return next(new Error(" fail to send new link", { casue: 400 }))

            }

        }


    }

})
export const login = asynchandlier(async (req, res, next) => {
    const { email, password } = req.body
     if (!email) {
        const err = new Error('Invalid username or password');
          err.status = 401;
    next(err);
     } 
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(Error("user not register", { cause: 404 }))

    } else {
        if (!user.confirmEmail) {
            res.status(400).json({ massage: "confirm your email frist" })
            return next(Error("confirm your email frist", { cause: 403 }))

        } else {

            if (user.isblocked) {
                return next(Error("your account is blocked", { cause: 404 }))

            } else {
                const match = bcrypt.compareSync(password, user.password)
                if (!match) {
                    return next(new Error("in-valid password", { cause: 404 }))


                } else {

                    const token = jwt.sign({ id: user._id, isLoggedIn: true, userName: user.userName }, process.env.tokenSignature)
                    const status = await userModel.findOneAndUpdate({ email }, { online: true }, { new: true }).select("online")
                    return res.status(200).json({ massage: "login success", token, status })

                }
            }


        }

    }

})




export const Resetcode = async (req, res, next) => {
    const { email } = req.body
    const user = await findOne({ model: userModel, filter: { email } })
    if (!user) {
        next(new (Error("user not found", { cause: 404 })))
    } else {
        const accessCode = Math.floor(100000 + Math.random() * 900000);
        await findoneAndupdate({ model: userModel, filter: { email }, data: { accessCode: accessCode } })

        const messege = `
        <h1>${accessCode}<h1/>
        `

        const info = await sendEmail(email, messege, "accessCode")
        if (info?.accepted?.length) {

            res.status(200).json({ message: " accessCode sended", accessCode })

        }


    }


}

export const ResetPassword = async (req, res, next) => {
    const { email, accessCode, NewPassword } = req.body
    const user = await findOne({ model: userModel, filter: { email, accessCode } })

    if (!user) {
        return next(new Error("user not register", { cause: 404 }))
    } else {

        const hashPassword = bcrypt.hashSync(NewPassword, parseInt(process.env.SALTROUND))

        const ResetPassword = await findoneAndupdate({ model: userModel, filter: { email }, data: { password: hashPassword, accessCode: "" } })
        res.status(200).json({ message: " password updated", })

    }


}

export const updatePassword = async (req, res, next) => {
    const { newPassword, oldPassword } = req.body

    if (newPassword == oldPassword) {
        next(new Error("do not  jocking with me it is the same password", { cause: 409 }))

    } else {
        const user = await findById({ model: userModel, filter: { _id: req.user._id } })
        if (!user) {
            next(new Error("not found user", { cause: 409 }))

        } else {
            if (!oldPassword || !user.password) {
                next(new Error("oldPassword or user password is undefined", { cause: 409 }))
            } else {
                const match = await bcrypt.compare(oldPassword, user.password)
                if (!match) {
                    next(new Error("oldPassword wrong", { cause: 409 }))
                } else {

                    const hashPassword = bcrypt.hashSync(newPassword, parseInt(process.env.SALTROUND))
                    await findoneAndupdate({ model: userModel, filter: { _id: req.user._id }, data: { password: hashPassword } })


                    res.status(200).json({ message: " password updated" })

                }
            }

        }


    }

}

export const logout = asynchandlier(async (req, res, next) => {

     await userModel.findOneAndUpdate({ _id:req.user._id }, { online: false ,lastseen:Date.now() }, { new: true }).select("online")
    return res.status(200).json({ massage: "logout success"})


})




















