'use strict';

// Campos extras do formulario Cadastrar Cliente
const colunas = (Sequelize) => ({
  email: { type: Sequelize.STRING, allowNull: true },
  telefone: { type: Sequelize.STRING, allowNull: true },
  endereco: { type: Sequelize.STRING, allowNull: true },
  rg: { type: Sequelize.STRING, allowNull: true },
  data_nascimento: { type: Sequelize.DATEONLY, allowNull: true },
  nome_pais: { type: Sequelize.STRING, allowNull: true },
  senha_gov: { type: Sequelize.TEXT, allowNull: true },
  rg_representante: { type: Sequelize.STRING, allowNull: true },
  cpf_representante: { type: Sequelize.STRING, allowNull: true },
  tipo_processo: { type: Sequelize.STRING, allowNull: true },
  observacoes: { type: Sequelize.TEXT, allowNull: true },
});

module.exports = {
  async up(queryInterface, Sequelize) {
    for (const [nome, definicao] of Object.entries(colunas(Sequelize))) {
      await queryInterface.addColumn('clientes', nome, definicao);
    }
  },

  async down(queryInterface, Sequelize) {
    for (const nome of Object.keys(colunas(Sequelize))) {
      await queryInterface.removeColumn('clientes', nome);
    }
  },
};
