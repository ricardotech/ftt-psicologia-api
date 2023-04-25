import express from "express";
const router = express.Router();
import { 
    createUser,
    loginUser
} from "../controllers/auth";

/**
 * @swagger
 * /auth/register:
 *   post:
 *      description: Cria um usuário
 *      parameters:
 *      - name: nome
 *        description: Nome do usuário
 *        in: formData
 *        type: string
 *      - name: cpf
 *        description: CPF do usuário
 *        in: formData
 *        type: integer
 *      - name: funcao
 *        description: Função que o usuário exerce
 *        in: formData
 *        type: string
 *      - name: matricula
 *        description: Número de matrícula do usuário
 *        in: formData
 *        type: integer
 *      - name: periodoCursado
 *        description: Período cursado pelo usuário
 *        in: formData
 *        type: integer
 *      - name: disciplina
 *        description: Disciplina cursada pelo usuário
 *        in: formData
 *        type: string
 *      - name: idOrientador
 *        description: Identificação do orientador
 *        in: formData
 *        type: integer
 *      - name: disciplinaMinistrada
 *        description: Disciplina ministrada pelo orientador
 *        in: formData
 *        type: string
 *      - name: idSecretaria
 *        description: Identificação da secretária
 *        in: formData
 *        type: integer
 *      - name: senha
 *        description: Senha do usuário
 *        in: formData
 *        type: integer
 *      responses:
 *        201:
 *          description: Usuário criado com sucesso.
 *        
 * 
 */
router.post("/register", createUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *    description: Método de login do usuário
 *    parameters:
 *    - name: cpf
 *      description: CPF do usuário
 *      in: formData
 *    - name: senha
 *      description: Senha do usuário
 *      in: formData
 *      type: integer
 *    responses:
 *      200:
 *        description: Login realizado com sucesso
 *      203:
 *        description: Erro
 * 
 */
router.post("/login", loginUser);

// obs. da erro se tentar utilizar export default
module.exports = router