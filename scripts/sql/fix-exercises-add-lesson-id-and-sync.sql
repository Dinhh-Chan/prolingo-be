-- Ensure exercises.lesson_id exists and is populated from lesson_exercises.
-- This fixes "MissingColumn" when app queries exercises by lesson.

ALTER TABLE public.exercises
    ADD COLUMN IF NOT EXISTS lesson_id VARCHAR(64);

-- Populate for existing rows.
-- lesson_exercises.exercise_id is VARCHAR(64) and points to exercises._id.
UPDATE public.exercises e
SET lesson_id = le.lesson_id
FROM public.lesson_exercises le
WHERE le.exercise_id = e._id
  AND (e.lesson_id IS NULL OR e.lesson_id = '');

