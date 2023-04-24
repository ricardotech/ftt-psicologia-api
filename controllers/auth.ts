import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export async function createUser(request: Request, response: Response) {
  const {
    nome,
    cpf,
    funcao,
    matricula,
    periodoCursado,
    disciplina,
    idOrientador,
    disciplinaMinistrada,
    idSecretaria,
    senha,
  } = request.body;

  if (!nome) {
    return response.status(203).send("Insira seu nome.");
  }

  if (!cpf) {
    return response.status(203).send("CPF inválido.");
  }

  if (!funcao) {
    return response.status(203).send("Insira sua função.");
  }

  if (!matricula) {
    return response.status(203).send("Insira sua matrícula.");
  }

  if (!periodoCursado) {
    return response.status(203).send("Insira o periodo sendo cursado.");
  }

  if (!disciplina) {
    return response.status(203).send("Insira a disciplina.");
  }

  if (!idOrientador) {
    return response.status(203).send("Insira o id do orientador.");
  }

  if (!disciplinaMinistrada) {
    return response.status(203).send("Insira a disciplina ministrada.");
  }

  if (!idSecretaria) {
    return response.status(203).send("Insira a id da secretária.");
  }

  if (!senha) {
    return response.status(203).send("Senha inválida.");
  }

  if (senha.lenght < 8) {
    return response
      .status(203)
      .send("Senha inválida. Deve possuir mais de 8 caracteres.");
  }

  // Verificando se a segunda parte do nome existe:
  if (!nome.split(" ")[1]) {
    return response.status(203).send("Insira seu nome completo.");
  }

  // Criptografia da senha:
  const senhaCriptografada = await bcrypt.hash(senha, 10);

  // Criação de um novo usuário:
  const user = await new User({
    nome,
    cpf,
    funcao,
    matricula,
    periodoCursado,
    disciplina,
    idOrientador,
    disciplinaMinistrada,
    idSecretaria,
    senha: senhaCriptografada,
  });

  // Se já existe um usuário no BD, o sistema para antes de tentar salvar.
  const userInDatabaseByCpf = await User.findOne({ cpf }).lean();
  if (userInDatabaseByCpf?.cpf) {
    return response.status(203).json({
      status: "error",
      message: "Já existe um usuário no BD com esse cpf.",
    });
  }

  // Salvamento do novo usuário no banco de dados:
  try {
    await user.save();
    return response.status(200).json({
      status: "success",
      message: "Usuário criado com sucesso.",
    });
  } catch (e) {
    console.error(e);
    return response.status(203).json({
      status: "error",
      message: "Não foi possivel criar usuário.",
    });
  }
}

export async function loginUser(request: Request, response: Response) {
  const { cpf, senha } = request.body;

  if (!cpf) {
    return response.status(203).send("CPF inválido.");
  }

  if (!senha) {
    return response.status(203).send("Senha inválida.");
  }

  // if (senha.lenght < 8){
  //     return response.status(203).send("Senha inválida. Deve possuir mais de 8 caracteres.");
  // }

  const userInDatabaseByCpf = await User.findOne({ cpf }).lean();

  if (!userInDatabaseByCpf) {
    return response.status(203).send("Não foi possivel encontrar um usuário com esse CPF.");
  }

  
  const databaseSenhaCriptografada = userInDatabaseByCpf.senha; 
  const booleanReqSenhaCriptografada = await bcrypt.compare(senha, String(databaseSenhaCriptografada)); // essa senha é a que vem com o req.

  // Se a comparação for 'false', retorna senha incorreta.
  if (!booleanReqSenhaCriptografada) {
    return response.status(203).send("Senha incorreta.");
  }

  return response
    .status(200)
    .send("Login feito com sucesso. Usuário pode acessar o sistema.");

  // // Se o CPF que o usuário inseriu, existir no BD, compara as senhas.
  // if (userInDatabaseByCpf){

  // }
}
