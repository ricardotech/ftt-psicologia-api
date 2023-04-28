import express from "express";
const router = express.Router();
import { 
    createPaciente,
    getPacientes,
    getPacienteById,
    updatePacienteById,
    deletePacienteById
} from "../controllers/paciente";

router.post("", createPaciente);
router.get("", getPacientes);

router.get("/:id", getPacienteById);
router.put("/:id", updatePacienteById);
router.delete("/:id", deletePacienteById);

// obs. da erro se tentar utilizar export default
module.exports = router