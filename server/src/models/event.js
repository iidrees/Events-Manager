export default (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a description'
        }
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      isDate: true,
      unique: {
        args: true,
        msg: 'Date already booked, enter another date'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a date'
        },
        isDate: {
          args: true,
          msg: 'Please enter a valid date'
        }
      }
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a time'
        }
      }
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a center'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a location'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter an event type'
        },
        isIn: {
          args: [['public', 'private']],
          msg: 'Must be public or private'
        }
      }
    },
    attendance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter the number of expected attendance'
        }
      },
      defaultValue: 0
    }
  });
  /* Event Associations */
  Events.associate = (model) => {
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
