import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";


export async function createUser(request: Request, response: Response){
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
        senha
    } = request.body;

    if (!nome){
        return response.status(203).send("Insira seu nome.");
    }

    if (!cpf){
        return response.status(203).send("CPF inválido.");
    }

    if (!funcao){
        return response.status(203).send("Insira sua função.");
    }

    if (!matricula){
        return response.status(203).send("Insira sua matrícula.");
    }

    if (!periodoCursado){
        return response.status(203).send("Insira o periodo sendo cursado.");
    }

    if (!disciplina){
        return response.status(203).send("Insira a disciplina.");
    }

    if (!idOrientador){
        return response.status(203).send("Insira o id do orientador.");
    }

    if (!disciplinaMinistrada){
        return response.status(203).send("Insira a disciplina ministrada.");
    }

    if (!idSecretaria){
        return response.status(203).send("Insira a id da secretária.");
    }

    if (!senha){
        return response.status(203).send("Senha inválida.");
    }
    if (senha.lenght < 8){
        return response.status(203).send("Senha inválida. Deve possuir mais de 8 caracteres.");
    }

    // Verificando se a segunda parte do nome existe:
    if (nome.split(" ")[1]){
        return response.status(203).send("Insira seu nome completo.");
    }

    // Criptografia da senha:
    const senhaEncriptada = await bcrypt.hash(senha, 10);

    // Criação de um novo usuário:
    const user = await new User({
        nome: nome
    })

    // Salvamento do novo usuário no banco de dados:
    // em andamento
};

export async function loginUser(request: Request, response: Response) {
    return response.status(203).send("... Em desenvolvimento ...");
};