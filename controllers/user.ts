import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";

export async function getUsersByRole(request: Request, response: Response) {
    const role = request.params.role

    if (!role) {
        return response.status(203).send("Parametro 'role' inexistente.");
    }
    
    // Validando role:
    const possibleRoles = ["admin", "student", "secretary", "professor"]
    if (!possibleRoles.includes(role)) {
      return response
          .status(203)
          .send("O role/cargo/função é invalido.");
    }

    // Validando existência do user:
    const usersByRole = await User.find({role}).lean();
    if (!usersByRole) {
      return response
        .status(203)
        .send("Não existem usuários que se encaixam nesse role.");
    }

    return response.status(200).json(usersByRole);
}

export async function getUserById(request: Request, response: Response) {
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

  // Validando a existência do user:
  const userById = await User.findOne({ _id: _id }).lean();
  if (!userById) {
    return response.status(203).send("Não existe user com esse ID no BD.");
  }

  return response.status(200).json(userById);
}

export async function updateUserById(request: Request, response: Response) {
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

  // Validando a existência do user:
  const userById = await User.findById(_id).lean();
  if (!userById) {
    return response.status(203).send("Não existe user com esse ID no BD.");
  }

  // Operação no BD:
  try {
    await User.findByIdAndUpdate(_id, request.body);
    return response.status(200).send("User modificado com sucesso.");
  } catch (e) {
    console.error(e);
    return response.status(203).send("Não foi possivel modificar o user.");
  }
}

export async function deleteUserById(request: Request, response: Response) {
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

  // Validando a existência do user:
  const userById = await User.findById(_id).lean();
  if (!userById) {
    return response.status(203).send("Não existe user com esse id.");
  }

  // Operação no BD:
  try {
    await User.findByIdAndDelete(_id);
    return response.status(200).send("User deletado com sucesso.");
  } catch (e) {
    console.error(e);
    return response.status(203).send("Não foi possivel deletar o user.");
  }
}