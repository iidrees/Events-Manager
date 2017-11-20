export default (sequelize, DataTypes) => {
  const Centers = sequelize.define('Centers', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a CENTER NAME in the input field'
        }
      },
      unique: {
        args: true,
        msg: 'Please enter another Center Name'
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a Location i.e a state where the center is located'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a clear address'
        }
      }
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter enter the name of the owner'
        }
      }
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter the capacity of the Center'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a description of what the center looks like'
        }
      }
    }
  });

  /* Model Associations for centers */
  Centers.associate = (model) => {
    Centers.hasMany(model.Events, {
      foreignKey: 'centerId',
      as: 'events'
    });
    Centers.belongsTo(model.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Centers;
};
