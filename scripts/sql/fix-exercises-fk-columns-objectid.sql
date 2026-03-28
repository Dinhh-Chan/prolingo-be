-- exercises.type_id / vocab_id / concept_id và mọi exercise_id tham chiếu exercises._id
-- phải là VARCHAR (ObjectId 24 ký tự), không phải UUID Postgres.
-- Lỗi: invalid input syntax for type uuid: "69c78fbbfafeaed720861032"

ALTER TABLE public.exercises
    ALTER COLUMN type_id TYPE VARCHAR(64) USING type_id::text;

ALTER TABLE public.exercises
    ALTER COLUMN vocab_id TYPE VARCHAR(64) USING vocab_id::text;

ALTER TABLE public.exercises
    ALTER COLUMN concept_id TYPE VARCHAR(64) USING concept_id::text;

ALTER TABLE public.lesson_exercises
    ALTER COLUMN exercise_id TYPE VARCHAR(64) USING exercise_id::text;

ALTER TABLE public.user_exercise_attempts
    ALTER COLUMN exercise_id TYPE VARCHAR(64) USING exercise_id::text;

-- Bảng liên kết (nếu tồn tại)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'exercise_industries'
    ) THEN
        ALTER TABLE public.exercise_industries
            ALTER COLUMN exercise_id TYPE VARCHAR(64) USING exercise_id::text;
    END IF;
END $$;
