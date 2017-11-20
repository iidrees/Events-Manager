export default (sequelize, DataTypes) => {
  const Centers = sequelize.define('Centers', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  /* Model Associations */
  Centers.associate = (model) => {
    Centers.hasMany(model.Events, {
      foreignkey: 'centerId',
      as: 'events',
    });
    Centers.belongsTo(model.Users, {
      foreignkey: 'userId',
      onDelete: 'CASCADE'
    });
    Centers.belongsTo(model.Events, {
      foreignkey: 'eventId',
    });
  };
  return Centers;
};
