import mongoose from "mongoose";

const agendamentoSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    pacienteId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    // Aluno que vai atender o paciente:
    alunoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    // Data marcada para o atendimento:
    dataConsulta: {
      type: Date,
      required: true,
    },
    // Sala em que a consulta ira ocorrer:
    sala: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Agendamento", agendamentoSchema);
