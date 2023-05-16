import { Router } from "express";
const router = Router()

import * as userprofile from "./controller/userProfile.js"
import { auth, roles } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import * as profileValidation from "./user.validation.js";


router.get('/',validation(profileValidation.profile),auth(roles.user),userprofile.disPlayProfile)

export default router