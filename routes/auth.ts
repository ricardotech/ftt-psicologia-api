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
 *        example: Fulano de Ciclano
 *      - name: cpf
 *        description: CPF do usuário
 *        in: formData
 *        type: integer
 *        example: 12345678912
 *      - name: role
 *        description: Função que o usuário exerce
 *        in: formData
 *        type: string
 *        example: Estudante
 *      - name: matricula
 *        description: Número de matrícula do usuário
 *        in: formData
 *        type: integer
 *        example: 1234567
 *      - name: periodoCursado
 *        description: Período cursado pelo usuário
 *        in: formData
 *        type: integer
 *        example: 4
 *      - name: disciplina
 *        description: Disciplina cursada pelo usuário
 *        in: formData
 *        type: string
 *        example: Cidadania, ética e espiritualidade
 *      - name: idOrientador
 *        description: Identificação do orientador
 *        in: formData
 *        type: integer
 *        example: 1234567
 *      - name: disciplinaMinistrada
 *        description: Disciplina ministrada pelo orientador
 *        in: formData
 *        type: string
 *        example: Cidadania, ética e espiritualidade
 *      - name: idSecretaria
 *        description: Identificação da secretária
 *        in: formData
 *        type: integer
 *        example: 1234567
 *      - name: senha
 *        description: Senha do usuário
 *        in: formData
 *        type: string
 *      responses:
 *        200:
 *          description: Usuário criado com sucesso.
 *        203:
 *          description: Não foi possível criar usuário.
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
 *      type: integer
 *    - name: senha
 *      description: Senha do usuário
 *      in: formData
 *      type: string
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