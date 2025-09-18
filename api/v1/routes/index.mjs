import { Router } from "express"
import mainRoutes from "./main.mjs"
import authRoutes from "./auth.mjs"
const router = Router()

router.use("/", mainRoutes)
router.use("/auth", authRoutes)

export default router
