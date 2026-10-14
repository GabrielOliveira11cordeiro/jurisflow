'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alertas', {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      tipo: { type: Sequelize.STRING, allowNull: false },
      entidade: { type: Sequelize.STRING, allowNull: false },
      entidade_id: { type: Sequelize.INTEGER, allowNull: false },
      resolvido: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('alertas');
  }
};
