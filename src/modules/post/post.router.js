import { Router } from "express";
import * as postController from "./controller/post.js"
import { auth } from "../../middleware/auth.js";
import { accessRole } from "./post.endpoint.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import validation from "../../middleware/validation.js";
import * as postvalidation from "./post.validation.js"
import commentRouter from "../comment/comment.router.js"

const router=Router()


router.use('/:PostId/comment',commentRouter)


router.post("/",auth(accessRole.addpost),validation(postvalidation.addpost),myMulter(fileValidation.image).array("image",3),postController.createPost)
router.patch("/like/:id",auth(accessRole.like),validation(postvalidation.like),postController.Likes)
// router.delete("/:id",auth(accessRole.like),validation(postvalidation.like),postController.deletepost)


router.patch("/Unlike/:id",auth(accessRole.unlike),validation(postvalidation.like),postController.UnLikes)
router.get("/:id",postController.posts)










export default router