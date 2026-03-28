-- lesson_exercises.lesson_id phải khớp PK bảng lessons: chuỗi ObjectId (24 hex), KHÔNG phải UUID Postgres.
-- Nếu DB cũ tạo cột kiểu uuid, so sánh với lesson_id từ API sẽ lỗi:
--   invalid input syntax for type uuid: "69c5df1fc12635bdac02fc5a"
--
-- Chạy trên DB (psql hoặc client SQL).

-- Bước 1: gỡ FK cũ nếu có (tên constraint có thể khác — kiểm tra: \d lesson_exercises trong psql)
ALTER TABLE public.lesson_exercises
    DROP CONSTRAINT IF EXISTS lesson_exercises_lesson_id_fkey;

-- Bước 2: đổi kiểu cột (bỏ qua nếu đã là varchar)
ALTER TABLE public.lesson_exercises
    ALTER COLUMN lesson_id TYPE VARCHAR(64) USING lesson_id::text;

-- Bước 3: tạo lại FK — PK lessons có thể là lesson_id (theo Sequelize) hoặc _id (một số DB sync cũ)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'lessons' AND column_name = 'lesson_id'
    ) THEN
        ALTER TABLE public.lesson_exercises
            ADD CONSTRAINT lesson_exercises_lesson_id_fkey
            FOREIGN KEY (lesson_id) REFERENCES public.lessons (lesson_id)
            ON UPDATE CASCADE ON DELETE CASCADE;
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'lessons' AND column_name = '_id'
    ) THEN
        ALTER TABLE public.lesson_exercises
            ADD CONSTRAINT lesson_exercises_lesson_id_fkey
            FOREIGN KEY (lesson_id) REFERENCES public.lessons (_id)
            ON UPDATE CASCADE ON DELETE CASCADE;
    END IF;
END $$;
