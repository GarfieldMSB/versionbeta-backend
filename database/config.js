const {Sequelize} = require('sequelize')


const db = new Sequelize('versionbetadb', 'matias', 'Matroxse1', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false,
});

const dbConnection = async() => {
    try {
        await db.authenticate();
        console.log('DB Online');
      } catch (error) {
        console.error('No se puede conectar a la DB:', error);
      }
}

module.exports = {
    dbConnection,
    db
}