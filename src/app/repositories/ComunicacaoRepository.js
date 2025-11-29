import conexao from "../database/conexao.js";

class ComunicacaoRepository {
  // 🔹 Listar todos os comunicados
  async listarTodos() {
    const [rows] = await conexao.execute("SELECT * FROM comunicacao");
    return rows;
  }

  // 🔹 Buscar comunicado por ID
  async buscarPorId(id) {
    const [rows] = await conexao.execute(
      "SELECT * FROM comunicacao WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  // 🔹 Criar novo comunicado
  async criar(comunicado) {
    const [result] = await conexao.execute(
      `INSERT INTO comunicacao (
        titulo, mensagem, data_envio, tipo, remetente, publico_alvo, turma_id, aluno_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        comunicado.titulo,
        comunicado.mensagem,
        comunicado.data_envio,
        comunicado.tipo,
        comunicado.remetente,
        comunicado.publico_alvo,
        comunicado.turma_id ?? null,
        comunicado.aluno_id ?? null
      ]
    );

    // Retorna o comunicado com o id gerado pelo banco
    return { id: result.insertId, ...comunicado };
  }

  // 🔹 Atualizar comunicado existente
  async atualizar(id, comunicado) {
    const [result] = await conexao.execute(
      `UPDATE comunicacao SET
        titulo = ?, mensagem = ?, data_envio = ?, tipo = ?, remetente = ?,
        publico_alvo = ?, turma_id = ?, aluno_id = ?
      WHERE id = ?`,
      [
        comunicado.titulo,
        comunicado.mensagem,
        comunicado.data_envio,
        comunicado.tipo,
        comunicado.remetente,
        comunicado.publico_alvo,
        comunicado.turma_id ?? null,
        comunicado.aluno_id ?? null,
        id
      ]
    );

    return result.affectedRows; // retorna quantas linhas foram alteradas
  }

  // 🔹 Excluir comunicado
  async deletar(id) {
    const [result] = await conexao.execute(
      "DELETE FROM comunicacao WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  }
}

export default new ComunicacaoRepository();
