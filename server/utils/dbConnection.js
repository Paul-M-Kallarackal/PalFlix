
const {Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://paulm:@localhost:5432/moviedb',{logging: false});
 
// async function connectToDatabase() {
//     try {
//       await sequelize.authenticate();
//       console.log('Connection has been established successfully.');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     }
//   }

module.exports = {
    sequelize,
    // connectToDatabase
};