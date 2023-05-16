import { Router } from "express"; 
const router= Router()
import * as authController from "./controller/registration.js"
import validation from "../../middleware/validation.js"
import* as validationSchema from "./auth.validation.js"
import  {auth,roles } from "../../middleware/auth.js"
import { endpoint } from "./auth.endpoint.js";


router.post("/signup" ,validation(validationSchema.signu), authController.signup)
router.get("/confirmEmail/:token" ,validation(validationSchema.confirmEmail), authController.confirmEmail)
router.get("/refreshtoken/:token" , authController.refreshtoken)
router.get("/login" ,validation(validationSchema.login), authController.login)
router.put("/logout" ,auth(endpoint.logout), authController.logout)

router.post("/sendCode" , authController.Resetcode)
router.post("/REsetPasswod" , authController.ResetPassword)
router.post("/updatePassword" ,auth(roles.user), authController.updatePassword)











export default router