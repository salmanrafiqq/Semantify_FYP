import express from "express"
import { login, register, logout } from "../controllers/auth.js"
import expressvalidator from "../middleware/expressvalidator.js"
import { verifyToken } from "../middleware/verifyauth.js"
const router = express.Router()


router.post("/register", expressvalidator, register)
router.post("/", expressvalidator, login)
router.post("/logout", verifyToken, logout);





export default router
