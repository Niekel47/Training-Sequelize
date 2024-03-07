"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Product", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    AuthorId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    PublisherId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    CategoryId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
    name: { type: DataTypes.TEXT, allowNull: false, unique: true },
    image: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: {
      type: Sequelize.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Product");
}
