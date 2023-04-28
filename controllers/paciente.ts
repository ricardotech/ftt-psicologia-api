import { Request, Response } from "express";
import Paciente from "../models/Paciente";
import mongoose from "mongoose";

export async function createPaciente(request: Request, response: Response) {
  const {
    nome,
    cpf,
    idade,
    enderecoCep,
    enderecoNumero,
    religiao,
    profissao,
    estadoCivil,
    sexo,
    naturalidade,
    nacionalidade,
    rendaFamiliar,
    nomeContato,
    telefoneContato,
    instituicaoDeEstudo,
    nomeResponsavelLegal,
    contatoResponsavelLegal,
    dataInicioTratamento,
    dataTerminoTratamento,
    nomePessoaEncaminhamento,
    funcionarioUnievangelica,
    alunoUnievangelica,
    tratamentoOferecido,
  } = request.body;

  if (!nome) {
    return response
      .status(203)
      .send("Insira seu nome.");
  }

  if (!cpf) {
    return response
      .status(203)
      .send("Insira seu CPF");
  }

  // Validando o comprimento do CPF:
  if (String(cpf).length !== 11) {
      return response
        .status(203)
        .send("CPF inválido. Deve possuir 11 caracteres.");
    }

  if (!funcionarioUnievangelica) {
    return response
      .status(203)
      .send("Insira se é um funcionário da instituição.");
  }

  // Verificando a existência desse paciente no BD. Se já existir não tenta criar.
  const pacienteInDatabaseByCpf = await Paciente.findOne({ cpf }).lean();
  if (pacienteInDatabaseByCpf?.cpf) {
    return response
      .status(203)
      .send("Já existe um paciente no BD com esse cpf.");
  }

  const paciente = await new Paciente({
    nome,
    cpf,
    idade,
    enderecoCep,
    enderecoNumero,
    religiao,
    profissao,
    estadoCivil,
    sexo,
    naturalidade,
    nacionalidade,
    rendaFamiliar,
    nomeContato,
    telefoneContato,
    instituicaoDeEstudo,
    nomeResponsavelLegal,
    contatoResponsavelLegal,
    dataInicioTratamento,
    dataTerminoTratamento,
    nomePessoaEncaminhamento,
    funcionarioUnievangelica,
    alunoUnievangelica,
    tratamentoOferecido,
  });

  // Salvamento do novo paciente no banco de dados:
  try {
    await paciente.save();
    return response
      .status(200)
      .send("Paciente criado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
      .status(203)
      .send("Não foi possivel criar paciente.");
  }
}

export async function getPacientes(request: Request, response: Response) {
  const pacientes = await Paciente.find({}).lean();
  
  // Se não encontrar pacientes.
  if (!pacientes) {
    return response
      .status(203)
      .send("Não existem pacientes no BD.");
  }

  return response
    .status(200)
    .json(pacientes);
}

export async function getPacienteById(request: Request, response: Response) {
  const _id = request.params.id;

  // Validando a id:
  const isIdValid = mongoose.Types.ObjectId.isValid(_id);
  if (!isIdValid) {
    return response
      .status(203)
      .send("A ObjectId passada no parametro, não é válida. Insira uma Mongodb ObjectId válida.");
  }

  // Validando a existência do paciente:
  const pacienteById = await Paciente.findOne({ _id: _id }).lean();
  if (!pacienteById) {
    return response.status(203).send("Não existe paciente com esse ID no BD.");
  }

  return response.status(200).json(pacienteById);
}

export async function updatePacienteById(request: Request, response: Response) {
  const _id = request.params.id;

  // Validando a id:
  const isIdValid = mongoose.Types.ObjectId.isValid(_id)
  if (!isIdValid){
    return response
      .status(203)
      .send("A ObjectId passada no parametro, não é válida. Insira uma Mongodb ObjectId válida.")
  }
  
  // Validando a existência do paciente:
  const pacienteById = await Paciente.findById(_id).lean();
  if (!pacienteById){
    return response
      .status(203)
      .send("Não existe paciente com esse id.");
  }

  // Operação no BD:
  try {
    await Paciente.findByIdAndUpdate(_id, request.body);
    return response
      .status(200)
      .send("Paciente modificado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
      .status(203)
      .send("Não foi possivel modificar o paciente.");
  }
}

export async function deletePacienteById(request: Request, response: Response) {
  const _id = request.params.id;

  // Validando a id:
  const isIdValid = mongoose.Types.ObjectId.isValid(_id)
  if (!isIdValid){
    return response
      .status(203)
      .send("A ObjectId passada no parametro, não é válida. Insira uma Mongodb ObjectId válida.")
  }

  // Validando a existência do paciente:
  const pacienteById = await Paciente.findById(_id).lean();
  if (!pacienteById){
    return response
      .status(203)
      .send("Não existe paciente com esse id.");
  }
  
  // Operação no BD:
  try {
    await Paciente.findByIdAndDelete(_id);
    return response
      .status(200)
      .send("Paciente deletado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
      .status(203)
      .send("Não foi possivel deletar o paciente.");
  }
}
