const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Reserva = sequelize.define('Reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sala_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'salas',
      key: 'id'
    },
    allowNull: false
  },
  horario_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  horario_fin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'activa'
  }
}, {
  tableName: 'reservas',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Reserva;
