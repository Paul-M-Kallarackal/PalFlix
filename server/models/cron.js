const {sequelize} =require("../utils/DBConnection");
const { DataTypes } = require('sequelize');
const CronTable = sequelize.define('CronTable',{
    cronId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        field: 'cron_id'   
        },
    cronName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'cron_name'
        },
    runAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'run_at'
        },
    ranAt:{
        type: DataTypes.DATE,
        allowNull: true,
        field: 'ran_at'
        },
    }
    ,{timestamps: false});

module.exports = CronTable;
