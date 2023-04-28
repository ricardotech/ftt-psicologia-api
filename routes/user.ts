import express from "express";
const router = express.Router();
import { 
    getUsersByRole,
    getUserById,
    updateUserById,
    deleteUserById
} from "../controllers/user";

router.get("/role/:role", getUsersByRole);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

// obs. da erro se tentar utilizar export default
module.exports = router