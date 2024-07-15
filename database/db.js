const { Sequelize } = require('sequelize')

const devDB = {
    username: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    database: 'coingrove',
    host: 'localhost',
    dialect: 'postgres',
}

const sequelize = new Sequelize(
    devDB.database,
    devDB.username,
    devDB.password,
    devDB,
)

const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connected to database')
    } catch (error) {
        console.error('Unable to connect to the database', error)
    }
}

module.exports = { connectDB, sequelize }
