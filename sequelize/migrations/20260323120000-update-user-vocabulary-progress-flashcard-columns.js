"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Chuyển kiểu user_id/vocab_id sang string để phù hợp dữ liệu ObjectId (24 hex)
        await queryInterface.changeColumn("user_vocabulary_progress", "user_id", {
            type: Sequelize.STRING(64),
            allowNull: false,
        });

        await queryInterface.changeColumn("user_vocabulary_progress", "vocab_id", {
            type: Sequelize.STRING(64),
            allowNull: false,
        });

        // Thêm cột thiếu cho flashcard learning
        await queryInterface.addColumn("user_vocabulary_progress", "wrong_count", {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        });

        await queryInterface.addColumn("user_vocabulary_progress", "interval_days", {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        });

        await queryInterface.addColumn("user_vocabulary_progress", "is_weak", {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        });

        await queryInterface.addColumn("user_vocabulary_progress", "weak_correct_streak", {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        });
    },

    async down(queryInterface, Sequelize) {
        // Rollback: chỉ xóa cột thêm (không hoàn nguyên kiểu uuid vì phụ thuộc dữ liệu)
        await queryInterface.removeColumn("user_vocabulary_progress", "weak_correct_streak");
        await queryInterface.removeColumn("user_vocabulary_progress", "is_weak");
        await queryInterface.removeColumn("user_vocabulary_progress", "interval_days");
        await queryInterface.removeColumn("user_vocabulary_progress", "wrong_count");

        // user_id/vocab_id không revert kiểu để tránh lỗi dữ liệu
    },
};

