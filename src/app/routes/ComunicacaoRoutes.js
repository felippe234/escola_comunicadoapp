import express from "express";
import ComunicacaoController from "../controller/ComunicacaoController.js";

const router = express.Router();

router.get("/", ComunicacaoController.index);
router.get("/:id", ComunicacaoController.show);
router.post("/", ComunicacaoController.store);
router.put("/:id", ComunicacaoController.update);
router.delete("/:id", ComunicacaoController.delete);


export default router;
