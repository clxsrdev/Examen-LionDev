require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = { sequelize };

const Sala = require('./sala');
const Reserva = require('./reserva');

Sala.hasMany(Reserva, {
  foreignKey: 'sala_id',
  onDelete: 'CASCADE'
});

Reserva.belongsTo(Sala, {
  foreignKey: 'sala_id'
});

module.exports = {
  sequelize,
  Sala,
  Reserva
};

