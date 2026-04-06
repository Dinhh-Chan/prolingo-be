-- Lỗi: invalid input syntax for type uuid: "69c5df1fc12635bdac02fc5a"
-- Nguyên nhân: lesson_id trong DB là uuid nhưng app lưu ObjectId 24 ký tự.
-- Model Sequelize: DataType.STRING(64) — cần cột Postgres khớp (VARCHAR).
--
-- Chạy trên DB production (backup trước). Điều chỉnh tên constraint nếu khác.

-- 1) Gỡ FK lesson_exercises -> lessons (nếu có)
ALTER TABLE lesson_exercises
    DROP CONSTRAINT IF EXISTS lesson_exercises_lesson_id_fkey;

-- 2) Đổi lessons.lesson_id (nếu đang là uuid)
ALTER TABLE lessons
    ALTER COLUMN lesson_id TYPE VARCHAR(64) USING lesson_id::text;

-- 3) Đổi lesson_exercises.lesson_id
ALTER TABLE lesson_exercises
    ALTER COLUMN lesson_id TYPE VARCHAR(64) USING lesson_id::text;

-- 4) Tạo lại FK
ALTER TABLE lesson_exercises
    ADD CONSTRAINT lesson_exercises_lesson_id_fkey
        FOREIGN KEY (lesson_id) REFERENCES lessons (lesson_id);
