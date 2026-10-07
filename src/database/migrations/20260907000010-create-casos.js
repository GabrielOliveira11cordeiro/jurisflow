'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('casos', {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      pasta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'pastas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      titulo: { type: Sequelize.STRING, allowNull: false },
      fase: { type: Sequelize.ENUM('inicial', 'instrucao', 'recursal', 'execucao', 'encerrado'), allowNull: false, defaultValue: 'inicial' },
      status: { type: Sequelize.ENUM('ativo', 'suspenso', 'encerrado'), allowNull: false, defaultValue: 'ativo' },
      responsavel_principal_id: {
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
    await queryInterface.dropTable('casos');
  }
};
