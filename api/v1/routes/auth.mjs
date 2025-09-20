import { Router } from "express"
import AuthController from "../controllers/authController.mjs"
import { requireAuth } from "../../../middlewares/auth.mjs"

const router = Router()

router.post("/login", AuthController.login)

router.post("/register", AuthController.register)

router.post("/refresh", AuthController.refresh)

router.post("/logout", requireAuth, AuthController.logout)

export default router
