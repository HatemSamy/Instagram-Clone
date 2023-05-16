import { Router } from "express";

import { auth } from "../../middleware/auth.js";

import validation from "../../middleware/validation.js";
import * as admincontroller from "./controller/admin.js"
import  endpoint from "./admin.endpoint.js"

import commentRouter from "../comment/comment.router.js"


const router=Router()
router.get("/",auth(endpoint.getusers),admincontroller.getAllUsers)
router.patch("/:id",auth(endpoint.ChangeRole),admincontroller.ChangeRole)
router.patch("/:id/Block",auth(endpoint.Blockuser),admincontroller.BlockUser)








export default router