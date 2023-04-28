import "dotenv/config";

const express = require("express");
const mongoose = require("mongoose");

// Route files, from '/routes' folder:
const authRoutes = require("./routes/auth");
const pacienteRoutes = require("./routes/paciente");
const userRoutes = require("./routes/user");
const agendamentoRoutes = require("./routes/agendamento")

const app = express();
const port = 3000;

// Variáveis da documentação
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configurações da documentação:
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API-Psicologia-FTT',
            version: '1.0.0',
            description: 'API do sistema para o curso de Psicologia da UniEvangélica',
        },
    },
    apis: ['server.ts','./routes/*.ts'],
};

// Criando um endpoint para a visualização da documentação:
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Valores de acesso em .env:
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const clusterInfo = process.env.DB_CLUSTER_INFO
const server = `mongodb+srv://${user}:${password}@${clusterInfo}.mongodb.net/?retryWrites=true&w=majority`

// Conexão com o BD:
mongoose.connect(server).then(() => {
    console.log("Database connection successfull!");
}, (e: Error) => console.error(e));

// Rotas:
app.use(express.json());
app.use("/auth", authRoutes); // Rotas de autenticação.
app.use("/paciente", pacienteRoutes);
app.use("/user", userRoutes);
app.use("/agendamento", agendamentoRoutes);

// Escutar servidor na porta 3000:
app.listen(port, () => {
    console.log(`App está rodando na porta ${port}`);
});



