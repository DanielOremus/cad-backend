import { Router } from "express"
import userController from "../controllers/userController.mjs"

const router = Router()

router.get("/", userController.getAll)

export default router
