import { Router } from "express"
import userController from "../controllers/userController.mjs"
import { requireAuth } from "../../../middlewares/auth.mjs"

const router = Router()

router.get("/", requireAuth, userController.getAll)

export default router
