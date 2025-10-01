import express from "express";
import cors from "cors";
import ComunicacaoRoutes from "./app/routes/ComunicacaoRoutes.js";

const app = express();
const port = 4003;

// ✅ Middleware para permitir requisições do frontend
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://192.168.0.27:3000",
    "http://192.168.0.30:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// ✅ Middleware para interpretar JSON
app.use(express.json());




app.use("/comunicados", ComunicacaoRoutes);


app.listen(4003, () => console.log("Servidor rodando em 4003"));
export default app;
