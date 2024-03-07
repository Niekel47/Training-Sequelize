"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Product_Category", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    ProductId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    CategoryId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
  });
}
export async function down(queryInterface, Sequelize) {

  await queryInterface.dropTable("Product_Category");

}
