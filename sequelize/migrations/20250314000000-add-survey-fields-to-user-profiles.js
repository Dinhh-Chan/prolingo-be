"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn(
            "user_profiles",
            "daily_learning_minutes",
            { type: Sequelize.INTEGER, allowNull: true },
        );
        await queryInterface.addColumn(
            "user_profiles",
            "custom_focus",
            { type: Sequelize.TEXT, allowNull: true },
        );
        await queryInterface.addColumn(
            "user_profiles",
            "course_duration_weeks",
            { type: Sequelize.INTEGER, allowNull: true },
        );
    },

    async down(queryInterface) {
        await queryInterface.removeColumn("user_profiles", "daily_learning_minutes");
        await queryInterface.removeColumn("user_profiles", "custom_focus");
        await queryInterface.removeColumn("user_profiles", "course_duration_weeks");
    },
};
