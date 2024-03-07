"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("User", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fullname: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(12),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("User");
}
