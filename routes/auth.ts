import express from "express";
const router = express.Router();
import { 
    createUser,
    loginUser
} from "../controllers/auth";

router.post("/register", createUser);
router.post("/login", loginUser);

// obs. da erro se tentar utilizar export default
module.exports = router