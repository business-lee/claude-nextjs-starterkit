#!/bin/bash

# Slack Webhook을 통해 알림을 전송하는 스크립트
# 사용법: echo '{}' | bash slack-notify.sh permission
#         echo '{}' | bash slack-notify.sh complete

EVENT_TYPE="$1"

# 프로젝트 루트의 .env 파일 로드
if [ -f ".env" ]; then
    set -a
    source .env
    set +a
fi

WEBHOOK_URL="${SLACK_WEBHOOK_URL}"

# Webhook URL이 없으면 조용히 종료
if [ -z "$WEBHOOK_URL" ]; then
    exit 0
fi

# 프로젝트명 추출 (package.json에서)
if [ -f "package.json" ]; then
    PROJECT_NAME=$(grep '"name"' package.json | head -1 | sed 's/.*"name": "\(.*\)".*/\1/')
else
    PROJECT_NAME=$(basename "$(pwd)")
fi

# 현재 시간 (yyyy-MM-dd hh:mm:ss 형식)
CURRENT_TIME=$(date '+%Y-%m-%d %H:%M:%S')

# 알림 타입에 따른 메시지 작성
if [ "$EVENT_TYPE" = "permission" ]; then
    TITLE="🔔 Claude Code 권한 요청"
    STATUS="권한요청"
    FOOTER_TEXT="송인의 필요한 작업이 있습니다. 확인해 주세요."
    COLOR="#FFA500"
elif [ "$EVENT_TYPE" = "complete" ]; then
    TITLE="✅ Claude Code 작업 완료"
    STATUS="작업완료"
    FOOTER_TEXT="작업이 완료되었습니다."
    COLOR="#36a64f"
else
    TITLE="🤖 Claude Code 알림"
    STATUS="알림"
    FOOTER_TEXT="Claude Code 알림입니다."
    COLOR="#808080"
fi

# Slack Block Kit을 사용한 상세한 메시지
PAYLOAD=$(cat <<EOF
{
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "$TITLE",
        "emoji": true
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*프로젝트:* $PROJECT_NAME  |  *상태:* $STATUS  |  *시간:* $CURRENT_TIME"
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "$FOOTER_TEXT"
      }
    }
  ]
}
EOF
)

# Slack Incoming Webhook POST 요청
curl -s -X POST "$WEBHOOK_URL" \
    -H "Content-Type: application/json" \
    -d "$PAYLOAD" \
    > /dev/null 2>&1

exit 0
