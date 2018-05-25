export default (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please your events name cannot be empty'
        }
      }
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
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
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
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      isDate: true,
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
    center: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a center'
        }
      }
    },
    isCancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image is required'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    },
    centerId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      allowNull: true,
      references: {
        model: 'Centers',
        key: 'id',
        as: 'centerId'
      }
    }
  });
  /* Event Associations */
  Events.associate = model => {
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
