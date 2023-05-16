import { Router } from "express";
import * as commentController from "./controller/comment.js"
import endpoint from "./comment.endpoint.js"
import { auth } from "../../middleware/auth.js";
import * as validators from "./comment.validation.js"
import validation from "../../middleware/validation.js";



const router = Router({mergeParams:true})



router.post("/",auth(endpoint.addcomment),validation(validators.CreateCmmente),commentController.CreateCmmente)

router.delete("/:commentId",auth(endpoint.addcomment),commentController.deletecomment)










export default router