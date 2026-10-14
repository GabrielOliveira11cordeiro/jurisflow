'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pastas', {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      numero: { type: Sequelize.STRING, allowNull: false },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'clientes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      area_direito: { type: Sequelize.STRING, allowNull: true },
      status: { type: Sequelize.ENUM('aberta', 'em_andamento', 'encerrada', 'arquivada'), allowNull: false, defaultValue: 'aberta' },
      prioridade: { type: Sequelize.ENUM('baixa', 'media', 'alta', 'urgente'), allowNull: false, defaultValue: 'media' },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('pastas');
  }
};
