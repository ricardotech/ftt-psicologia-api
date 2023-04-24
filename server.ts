import "dotenv/config";

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();
const port = 3000;

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
app.use("/auth", authRoutes);

// Escutar servidor na porta 3000:
app.listen(port, () => {
    console.log(`App está rodando na porta ${port}`);
});