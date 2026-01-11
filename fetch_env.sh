#!/bin/bash

echo "📥 Loading environment variables from SSM Parameter Store..."

# prefix 설정
PREFIX="/notion-tree/prod"
export NODE_ENV=production
export AWS_DEFAULT_REGION=ap-northeast-2

# 리스트 목록
PARAMS=(
  "NOTION_CLIENT_ID"
  "NOTION_CLIENT_SECRET"
  "PORT"
  "REDIRECT_URI"
  "SSL_CERT"
  "SSL_KEY"
)

# AWS SSM 호출 루프
for p in "${PARAMS[@]}"
do
  value=$(aws ssm get-parameter \
    --name "$PREFIX/$p" \
    --with-decryption \
    --query "Parameter.Value" \
    --output text)

  export "$p=$value"
done

echo "✅ SSM Parameters Loaded"

# 마지막으로 Node 앱 실행
exec node app.js