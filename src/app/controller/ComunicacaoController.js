import ComunicacaoRepository from "../repositories/ComunicacaoRepository.js";

class ComunicacaoController {
  // 🔹 Listar todos os comunicados
  async index(req, res) {
    try {
      const comunicados = await ComunicacaoRepository.listarTodos();
      res.status(200).json(comunicados);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao buscar comunicados" });
    }
  }

  // 🔹 Buscar comunicado por ID
  async show(req, res) {
    const { id } = req.params;
    try {
      const comunicado = await ComunicacaoRepository.buscarPorId(id);
      if (!comunicado) return res.status(404).json({ msg: "Comunicado não encontrado" });
      res.status(200).json(comunicado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao buscar comunicado" });
    }
  }

  // 🔹 Criar novo comunicado
  async store(req, res) {
    const {
      titulo,
      mensagem,
      data_envio,
      tipo,
      remetente_id,
      publico_alvo,
      turma_id,
      aluno_id
    } = req.body;

    if (!titulo || !mensagem || !tipo || !remetente_id || !publico_alvo) {
      return res.status(400).json({
        erro: "Campos obrigatórios: titulo, mensagem, tipo, remetente_id, publico_alvo"
      });
    }

    try {
      const novoComunicado = await ComunicacaoRepository.criar({
        titulo,
        mensagem,
        data_envio: data_envio || new Date().toISOString(),
        tipo,
        remetente_id,
        publico_alvo,
        turma_id: turma_id ?? null,
        aluno_id: aluno_id ?? null
      });

      res.status(201).json(novoComunicado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao cadastrar comunicado" });
    }
  }

  // 🔹 Atualizar comunicado
  async update(req, res) {
    const { id } = req.params;
    const {
      titulo,
      mensagem,
      data_envio,
      tipo,
      remetente_id,
      publico_alvo,
      turma_id,
      aluno_id
    } = req.body;

    if (!titulo || !mensagem || !tipo || !remetente_id || !publico_alvo) {
      return res.status(400).json({
        erro: "Campos obrigatórios: titulo, mensagem, tipo, remetente_id, publico_alvo"
      });
    }

    try {
      const linhasAfetadas = await ComunicacaoRepository.atualizar(id, {
        titulo,
        mensagem,
        data_envio: data_envio || new Date().toISOString(),
        tipo,
        remetente_id,
        publico_alvo,
        turma_id: turma_id ?? null,
        aluno_id: aluno_id ?? null
      });

      if (linhasAfetadas === 0) return res.status(404).json({ msg: "Comunicado não encontrado" });

      res.status(200).json({ id, titulo, mensagem, data_envio, tipo, remetente_id, publico_alvo, turma_id, aluno_id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao atualizar comunicado" });
    }
  }

  // 🔹 Excluir comunicado
  async delete(req, res) {
    const { id } = req.params;
    try {
      const linhasAfetadas = await ComunicacaoRepository.deletar(id);
      if (linhasAfetadas === 0) return res.status(404).json({ msg: "Comunicado não encontrado" });
      res.status(200).json({ msg: `Comunicado ${id} excluído com sucesso!` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao excluir comunicado" });
    }
  }
}

export default new ComunicacaoController();
