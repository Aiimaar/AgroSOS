import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Actuator = sequelize.define(
  "Actuator",
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Actuator;
