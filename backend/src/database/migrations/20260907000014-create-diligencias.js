'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diligencias', {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      caso_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'casos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      titulo: { type: Sequelize.STRING, allowNull: false },
      data_prevista: { type: Sequelize.DATEONLY, allowNull: true },
      status: { type: Sequelize.ENUM('pendente', 'em_andamento', 'concluida', 'cancelada'), allowNull: false, defaultValue: 'pendente' },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('diligencias');
  }
};
