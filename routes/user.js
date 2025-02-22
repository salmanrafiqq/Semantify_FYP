import express from "express"
import { getallusers, deleteUser, updateUser } from "../controllers/user.js"

import { verifyToken } from "../middleware/verifyauth.js"
const router = express.Router()




router.get("/", verifyToken, getallusers)
router.put("/:id", verifyToken, updateUser)
router.delete("/:id", verifyToken, deleteUser)

export default router