import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('jurisflow', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
})

export default sequelize