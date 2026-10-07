'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('processos', {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      caso_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'casos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      numero_processo: { type: Sequelize.STRING, allowNull: false },
      comarca: { type: Sequelize.STRING, allowNull: true },
      vara: { type: Sequelize.STRING, allowNull: true },
      situacao: { type: Sequelize.TEXT, allowNull: true },
      responsavel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('processos');
  }
};
