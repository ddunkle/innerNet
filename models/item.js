// Set up sequelize model for item user will add to database
module.exports = function(sequelize, DataTypes) {
    const item = sequelize.define("Item", {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
    return item;
}