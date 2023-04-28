import express from "express";
const router = express.Router();
import { 
    createAgendamento,
    getAgendamentos,
    getAgendamentoById,
    updateAgendamentoById,
    deleteAgendamentoById
} from "../controllers/agendamento";

router.post("", createAgendamento);
router.get("", getAgendamentos);

router.get("/:id", getAgendamentoById);
router.put("/:id", updateAgendamentoById);
router.delete("/:id", deleteAgendamentoById);

// obs. da erro se tentar utilizar export default
module.exports = router