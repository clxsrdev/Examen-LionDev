const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Sala = sequelize.define('Sala', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ubicacion: {
    type: DataTypes.STRING
  },
  capacidad: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'salas',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Sala;
