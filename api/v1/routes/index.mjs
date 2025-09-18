import { Router } from "express"
import mainRoutes from "./main.mjs"
import authRoutes from "./auth.mjs"
import userRoutes from "./users.mjs"
const router = Router()

router.use("/", mainRoutes)
router.use("/auth", authRoutes)
router.use("/users", userRoutes)

export default router
