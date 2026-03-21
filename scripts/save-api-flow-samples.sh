#!/usr/bin/env bash
# Ghi response mẫu vào docs/api-flow-samples/ (login.response.json bị .gitignore — không commit token)
set -euo pipefail

BASE="${BASE:-http://localhost:3009}"
DIR="$(cd "$(dirname "$0")/.." && pwd)/docs/api-flow-samples"
mkdir -p "$DIR"

USER="${API_USER:-admin}"
PASS="${API_PASS:-admin}"

echo "==> Login $BASE"
curl -sS -X POST "$BASE/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\",\"platform\":\"Web\"}" \
  | tee "$DIR/login.response.json" >/dev/null

TOKEN="$(jq -r '.data.accessToken // empty' "$DIR/login.response.json")"
if [[ -z "$TOKEN" || "$TOKEN" == "null" ]]; then
  echo "Lỗi: không lấy được accessToken. Xem $DIR/login.response.json"
  exit 1
fi

echo "==> POST /survey"
curl -sS -X POST "$BASE/survey" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"current_status":"student","english_level":"B1","daily_learning_minutes":10,"course_duration_weeks":4,"daily_reminder_enabled":true,"reminder_time":"19:15","custom_focus":"Business English"}' \
  | tee "$DIR/survey.response.json" >/dev/null

echo "==> POST /survey/generate-schedule-7days (có thể vài phút)..."
curl -sS -X POST "$BASE/survey/generate-schedule-7days" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  --max-time 600 \
  | tee "$DIR/generate-schedule-7days.response.json" >/dev/null

LESSON_ID="$(jq -r '.data.lessons[0]._id // empty' "$DIR/generate-schedule-7days.response.json")"
if [[ -z "$LESSON_ID" || "$LESSON_ID" == "null" ]]; then
  echo "Lỗi: không có lesson Day 1 trong generate-schedule-7days.response.json"
  exit 1
fi

echo "==> GET lesson-vocabulary/page (lesson Day 1: $LESSON_ID)"
curl -sS -G "$BASE/lesson-vocabulary/page" \
  -H "Authorization: Bearer $TOKEN" \
  --data-urlencode "condition={\"lesson_id\":\"$LESSON_ID\"}" \
  -d "page=1" -d "limit=20" \
  | tee "$DIR/lesson-vocabulary-page.response.json" >/dev/null

VID="$(jq -r '.data.result[0].vocab_id // empty' "$DIR/lesson-vocabulary-page.response.json")"
if [[ -z "$VID" || "$VID" == "null" ]]; then
  echo "Cảnh báo: không có vocab_id — bỏ qua vocabulary / example-sentences"
else
  echo "==> GET vocabulary/$VID"
  curl -sS "$BASE/vocabulary/$VID" \
    -H "Authorization: Bearer $TOKEN" \
    | tee "$DIR/vocabulary-by-id.response.json" >/dev/null

  echo "==> GET example-sentences/page"
  curl -sS -G "$BASE/example-sentences/page" \
    -H "Authorization: Bearer $TOKEN" \
    --data-urlencode "condition={\"vocab_id\":\"$VID\"}" \
    -d "page=1" -d "limit=10" \
    | tee "$DIR/example-sentences-page.response.json" >/dev/null
fi

echo "Xong. Thư mục: $DIR"
echo "(Không commit login.response.json — chứa JWT.)"
