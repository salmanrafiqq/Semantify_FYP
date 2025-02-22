import express from "express"
import { getallproposal, getproposalbyid, updateProposal, deleteProposal, createproposal, getproposalbyname } from "../controllers/proposal.js"

import { verifyToken } from "../middleware/verifyauth.js"
const router = express.Router()





router.get('/', verifyToken, getallproposal);
router.get('/:creator', verifyToken, getproposalbyname);
router.get("/:id", verifyToken, getproposalbyid);

router.post('/', verifyToken, createproposal);
router.put('/:id', verifyToken, updateProposal);
router.delete('/:id', verifyToken, deleteProposal);




export default router;