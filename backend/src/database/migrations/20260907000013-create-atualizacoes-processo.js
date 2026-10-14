'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('atualizacoes_processo', {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      processo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'processos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      descricao: { type: Sequelize.TEXT, allowNull: false },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      data_atualizacao: { type: Sequelize.DATE, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('atualizacoes_processo');
  }
};
