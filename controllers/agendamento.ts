import { Request, Response } from "express";
import Agendamento from "../models/Agendamento";
import mongoose from "mongoose";

export async function createAgendamento(request: Request, response: Response) {
  const { pacienteId, alunoId, dataConsulta, sala } = request.body;

  if (!pacienteId) {
    return response.status(203).send("Selecione um paciente cadastrado.");
  }

  if (!alunoId) {
    return response.status(203).send("Selecione um aluno cadastrado.");
  }

  if (!dataConsulta) {
    return response.status(203).send("Insira um data para a consulta.");
  }

  if (!sala) {
    return response.status(203).send("Insira a sala para a consulta.");
  }

  // Validando a data da consulta:
  // obs. impossibilitando a criação de uma consulta no passado.
  const dateNow = new Date();
  const dateConsulta = new Date(String(dataConsulta));
  const dataDifference = dateConsulta.getTime() - dateNow.getTime();
  if (dataDifference < 0) {
    return response
      .status(203)
      .send("A data da consulta não pode estar no passado.");
  }

  // Validando a id do paciente:
  const isPacienteIdValid = mongoose.Types.ObjectId.isValid(pacienteId);
  if (!isPacienteIdValid) {
    return response
      .status(203)
      .send(
        "A ObjectId inserida para o paciente, não é válida. Insira uma Mongodb ObjectId válida."
      );
  }

  // Validando a id do aluno:
  const isAlunoIdValid = mongoose.Types.ObjectId.isValid(alunoId);
  if (!isAlunoIdValid) {
    return response
      .status(203)
      .send(
        "A ObjectId inserida para o aluno, não é válida. Insira uma Mongodb ObjectId válida."
      );
  }

  // Criando agendamento:
  const agendamento = await new Agendamento({
    pacienteId,
    alunoId,
    dataConsulta,
    sala,
  });

  // Salvamento do novo agendamento no BD:
  try {
    await agendamento.save();
    return response.status(200).send("Agendamento criado com sucesso.");
  } catch (e) {
    console.error(e);
    return response.status(203).send("Não foi possivel criar o agendamento.");
  }
}

export async function getAgendamentos(request: Request, response: Response) {
  const agendamentos = await Agendamento.find({}).lean();

  // Se não encontrar agendamentos.
  if (!agendamentos) {
    return response.status(203).send("Não existem agendamentos no BD.");
  }

  return response.status(200).json(agendamentos);
}

export async function getAgendamentoById(request: Request, response: Response) {
  const _id = request.params.id;

  // Validando a id:
  const isIdValid = mongoose.Types.ObjectId.isValid(_id);
  if (!isIdValid) {
    return response
      .status(203)
      .send(
        "A ObjectId passada no parametro, não é válida. Insira uma Mongodb ObjectId válida."
      );
  }

  // Validando a existência do agendamento:
  const agendamentoById = await Agendamento.findOne({ _id: _id }).lean();
  if (!agendamentoById) {
    return response.status(203).send("Não existe agendamento com esse ID no BD.");
  }

  return response.status(200).json(agendamentoById);
}

export async function updateAgendamentoById(request: Request, response: Response) {
  const _id = request.params.id;

  // Validando a id:
  const isIdValid = mongoose.Types.ObjectId.isValid(_id)
  if (!isIdValid){
    return response
      .status(203)
      .send("A ObjectId passada no parametro, não é válida. Insira uma Mongodb ObjectId válida.")
  }
  
  // Validando a existência do agendamento:
  const agendamentoById = await Agendamento.findById(_id).lean();
  if (!agendamentoById){
    return response
      .status(203)
      .send("Não existe agendamento com esse id.");
  }

  // Operação no BD:
  try {
    await Agendamento.findByIdAndUpdate(_id, request.body);
    return response
      .status(200)
      .send("Agendamento modificado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
      .status(203)
      .send("Não foi possivel modificar o agendamento.");
  }
}

export async function deleteAgendamentoById(request: Request, response: Response) {
  const _id = request.params.id;

  // Validando a id:
  const isIdValid = mongoose.Types.ObjectId.isValid(_id)
  if (!isIdValid){
    return response
      .status(203)
      .send("A ObjectId passada no parametro, não é válida. Insira uma Mongodb ObjectId válida.")
  }

  // Validando a existência do agendamento:
  const agendamentoById = await Agendamento.findById(_id).lean();
  if (!agendamentoById){
    return response
      .status(203)
      .send("Não existe agendamento com esse id.");
  }
  
  // Operação no BD:
  try {
    await Agendamento.findByIdAndDelete(_id);
    return response
      .status(200)
      .send("Agendamento deletado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
      .status(203)
      .send("Não foi possivel deletar o agendamento.");
  }
}