FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# 🔹 bash 설치 + 스크립트 실행 권한
RUN apk add --no-cache bash \
    && chmod +x /app/fetch_env.sh

EXPOSE 3000
CMD ["node", "app.js"]