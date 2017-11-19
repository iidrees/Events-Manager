export default (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    center: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attendance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
  /* Event Associations */
  Events.associate = (model) => {
    Events.hasMany(model.Centers, {
      foreignKey: 'eventId',
      as: 'centers'
    });
    Events.belongsTo(model.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Events.belongsTo(model.Centers, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE'
    });
  };
  return Events;
};
