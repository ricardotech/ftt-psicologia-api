import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      nome: {
        type: String,
        trim: true,
        lowercase: true
      },
      cpf: {
        type: Number,
        unique: true
      },
      role: {
        type: String,
        enum: ["admin", "student", "secretary", "professor"],
      },
      matricula: {
        type: Number
      },
      periodoCursado: {
        type: Number
      },
      disciplina: {
        type: String
      },
      idOrientador: {
        type: Number
      },
      disciplinaMinistrada: {
        type: String
      },
      email: {
        type: String,
        lowercase: true
      },
      telefone: {
        type: Number
      },
      senha: {
        type: String,
        min: 8,
        max: 20,
      },
    },
    { timestamps: true }
  );

export default mongoose.model("User", userSchema);